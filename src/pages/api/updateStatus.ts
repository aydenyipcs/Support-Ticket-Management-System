import { NextApiRequest, NextApiResponse } from "next";
import Ticket from "../../../models/ticket";
import connectDB from "../../../lib/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TicketDataProps | { message: string }>
) {
  if (req.method !== "PUT")
    return res.status(405).json({ message: "Incorrect Method" });
  const { _id, status } = req.body;
  if (!_id || !status)
    return res.status(400).json({ message: "Missing fields" });

  try {
    await connectDB();
    const result = await Ticket.findByIdAndUpdate(
      _id,
      { status: status },
      { new: true }
    );
    if (!result) return res.status(404).json({ message: "Ticket not found" });
    return res.status(200).json(result);
  } catch (err) {
    console.error("Error updating ticket", err);
    res.status(500).json({ message: "Error updating ticket" });
  }
}
