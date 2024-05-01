import { NextApiRequest, NextApiResponse } from "next";
import Ticket from "../../../models/ticket";
import connectDB from "../../../lib/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TicketDataProps | { message: string }>
) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Incorrect Method" });

  try {
    await connectDB();

    const [newTickets, inProgTickets, resolvedTickets] = await Promise.all([
      Ticket.find({ status: "New" }),
      Ticket.find({ status: "In Progress" }),
      Ticket.find({ status: "Resolved" }),
    ]);

    const ticketData: TicketDataProps = {
      new: newTickets,
      inProgress: inProgTickets,
      resolved: resolvedTickets,
    };
    
    res.status(200).json(ticketData);
  } catch (err) {
    console.error("Error fetching tickets", err);
    res.status(500).json({ message: "Error fetching tickets" });
  }
}
