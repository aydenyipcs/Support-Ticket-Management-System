interface LinkProps {
  href: string;
  name: string;
}
interface FormProps {
  firstName: string;
  lastName: string;
  email: string;
  reason: "Inquiry" | "Support" | "Feedback" | "Other" | "";
  description: string;
}
interface AlertProps {
  open: Boolean;
  type: "success" | "error";
  message: String
}
interface ErrorProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  reason?: string;
  description?: string;
}
interface TicketDataProps {
  new: TicketProps[] | null
  inProgress: TicketProps[] | null
  resolved: TicketProps[] | null
}

interface TicketProps {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  reason: "Inquiry" | "Support" | "Feedback" | "Other";
  description: string;
  createdAt: Date
  status: "New" | "In Progress" | "Resolved"
}
interface TicketTableProps {
  tickets: TicketProps[] | null;
  setIsTicketUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}
