"use client";
import { useState, useEffect, FC } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Modal, Box, TextField, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const TicketModal: FC<{
  data: TicketProps;
  setIsTicketUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ data, setIsTicketUpdated }) => {
  const {
    _id,
    firstName,
    lastName,
    email,
    reason,
    description,
    createdAt,
    status,
  } = data;
  const [currStatus, setCurrStatus] = useState<
    "New" | "In Progress" | "Resolved"
  >(status);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");
  const [alertInfo, setAlertInfo] = useState<AlertProps>({
    open: false,
    type: "success",
    message: "",
  });

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResponse(e.target.value);
  };
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

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

  const handleSubmit = async () => {
    if (!response.length && currStatus === status) {
      setAlertInfo({
        open: true,
        type: "error",
        message: "Please enter response or update status",
      });
      return;
    }
    if (response.length) {
      console.log("This is the email that will be sent:", response);
      setAlertInfo({
        open: true,
        type: "success",
        message: "Email sent Successfully",
      });
    }

    if (currStatus !== status) {
      try {
        const response = await fetch("/api/updateStatus", {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ _id, status: currStatus }),
        });
        if (!response.ok) {
          setAlertInfo({
            open: true,
            type: "error",
            message: "Update Failed, Please Try Again.",
          });
          return;
        }
        setAlertInfo({
          open: true,
          type: "success",
          message: "Ticket Updated Successfully!",
        });
        setIsTicketUpdated(true);
      } catch (err) {
        console.error("Submission failed:", err);
        setAlertInfo({
          open: true,
          type: "error",
          message: "Update Failed, Please Try Again.",
        });
      }
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>Update</Button>
      <Modal open={isOpen} onClose={handleClose}>
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-2/3 max-h-2/3 rounded-2xl p-10 overflow-y-auto">
          <div className="flex flex-row w-full justify-between border-b-2 border-gray-300 px-5">
            <h1 className="italic font-semibold">{`${firstName} ${lastName}`}</h1>
            <h1 className="italic font-semibold">{email}</h1>
            <h1 className="italic font-semibold">{reason}</h1>
            <h1 className="italic font-semibold">
              {new Date(createdAt).toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              })}
            </h1>
          </div>
          <div className="flex justify-center space-x-2 my-2">
            <button
              className={`rounded-lg px-2 text-blue-800 bg-blue-300 hover:bg-opacity-50 ${
                currStatus === "New" && "italic font-semibold"
              }`}
              onClick={() => setCurrStatus("New")}
            >
              New
            </button>
            <button
              className={`rounded-lg px-2 text-yellow-800 bg-yellow-300 hover:bg-opacity-50 ${
                currStatus === "In Progress" && "italic font-semibold"
              }`}
              onClick={() => setCurrStatus("In Progress")}
            >
              In Progress
            </button>
            <button
              className={`rounded-lg px-2 text-green-800 bg-green-300 hover:bg-opacity-50 ${
                currStatus === "Resolved" && "italic font-semibold"
              }`}
              onClick={() => setCurrStatus("Resolved")}
            >
              Resolved
            </button>
          </div>
          <div className="flex flex-col flex-grow mt-2 space-y-2">
            <TextField
              fullWidth
              multiline
              variant="outlined"
              value={description}
              InputProps={{
                readOnly: true,
              }}
              className="border-none mt-2 flex-grow"
              rows={8}
              sx={{
                "& fieldset": { border: "none" },
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "grey.200",
                },
              }}
            />
            <TextField
              fullWidth
              multiline
              variant="outlined"
              value={response}
              onChange={handleTyping}
              rows={8}
              placeholder="Type Response Here..."
              className="flex-grow"
              sx={{
                "& fieldset": { border: "none" },
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "grey.200",
                },
              }}
            />
            <Button
              type="button"
              variant="contained"
              className="w-full mt-2"
              onClick={handleSubmit}
              endIcon={<SendIcon />}
            >
              Update
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
                className="w-full grow"
              >
                {alertInfo.message}
              </Alert>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default TicketModal;
