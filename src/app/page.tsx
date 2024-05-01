"use client";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { MenuItem, Alert } from "@mui/material";

const ClientTicket = () => {
  const [formData, setFormData] = useState<FormProps>({
    firstName: "",
    lastName: "",
    email: "",
    reason: "",
    description: "",
  });
  const [err, setErr] = useState<ErrorProps>({});
  const [alertInfo, setAlertInfo] = useState<AlertProps>({
    open: false,
    type: "success",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors: ErrorProps = {};
    errors.firstName = !formData.firstName
      ? "Please enter your first name"
      : !/^[a-zA-Z]*$/.test(formData.firstName)
      ? "First name can only contain letters"
      : undefined;
    errors.lastName = !formData.lastName
      ? "Please enter your last name"
      : !/^[a-zA-Z]*$/.test(formData.lastName)
      ? "Last name can only contain letters"
      : undefined;
    errors.email = !/\S+@\S+\.\S+/.test(formData.email)
      ? "Email address is invalid"
      : undefined;
    errors.reason = !formData.reason ? "Please select a reason" : undefined;
    errors.description =
      formData.description.length < 20
        ? "Description must be at least 20 characters long"
        : undefined;

    setErr(errors);
    return Object.values(errors).every((value) => value === undefined);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;
    try {
      const response = await fetch("/api/addTicket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data= await response.json()
      if (!response.ok) {
        setAlertInfo({
          open: true,
          type: "error",
          message: "Submission Failed",
        });
        return;
      }
      setAlertInfo({
        open: true,
        type: "success",
        message: "Form Submitted Successfully!",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        reason: "",
        description: "",
      });
    } catch (err) {
      console.error("Submission failed:", err);
      setAlertInfo({
        open: true,
        type: "error",
        message: "Submission Failed",
      });
    }
  };

  const closeAlert = () => {
    setAlertInfo((prev) => ({
      ...prev,
      open: false,
    }));
  };
  useEffect(() => {
    const timer = setTimeout(closeAlert, 3000);
    return () => clearTimeout(timer);
  }, [alertInfo.open]);

  return (
    <main className="flex grow justify-center">
      <div className="flex flex-col items-center w-2/3 rounded-2xl">
        <h1 className="font-semibold text-blue-800 text-4xl mt-5">
          Contact Us
        </h1>
        <h2 className="italic text-sm text-tmuted my-1">
          Submit the form below and we will get back to you within 1-3 business
          days
        </h2>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className="w-full"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-10 p-10">
            <TextField
              required
              value={formData.firstName}
              id="first-name"
              name="firstName"
              label="First Name"
              variant="standard"
              onChange={handleChange}
              error={Boolean(err.firstName)}
              helperText={err.firstName || ""}
            />
            <TextField
              required
              value={formData.lastName}
              id="last-name"
              name="lastName"
              label="Last Name"
              variant="standard"
              onChange={handleChange}
              error={Boolean(err.lastName)}
              helperText={err.lastName || ""}
            />
            <TextField
              required
              value={formData.email}
              id="email"
              name="email"
              label="Email Address"
              variant="standard"
              onChange={handleChange}
              error={Boolean(err.email)}
              helperText={err.email || ""}
            />
            <TextField
              required
              id="reason"
              name="reason"
              select
              value={formData.reason || ""}
              label="Reason"
              variant="standard"
              onChange={handleChange}
              error={Boolean(err.reason)}
              helperText={err.reason || ""}
            >
              <MenuItem value="Inquiry">Inquiry</MenuItem>
              <MenuItem value="Support">Support</MenuItem>
              <MenuItem value="Feedback">Feedback</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <TextField
              required
              value={formData.description}
              id="description"
              name="description"
              label="Description"
              variant="outlined"
              onChange={handleChange}
              error={Boolean(err.description)}
              helperText={err.description || " "}
              multiline
              rows={4}
              className="col-span-2 mx-auto my-4 w-full"
            />
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              className="col-span-2"
            >
              Submit
            </Button>
            {alertInfo.open && (
              <Alert
                icon={
                  alertInfo.type === "success" ? (
                    <CheckIcon />
                  ) : (
                    <ErrorOutlineIcon />
                  )
                }
                severity={alertInfo.type}
                onClose={() => setAlertInfo({ ...alertInfo, open: false })}
                className="col-span-2 my-0"
              >
                {alertInfo.message}
              </Alert>
            )}
          </div>
        </Box>
      </div>
    </main>
  );
};

export default ClientTicket;
