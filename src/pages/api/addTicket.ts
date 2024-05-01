import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/dbConnect";
import Ticket from "../../../models/ticket";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Incorrect Method" });

  try {
    await connectDB();
    const { firstName, lastName, email, reason, description } = req.body;

    const submission = new Ticket({
      firstName,
      lastName,
      email,
      reason,
      description,
    });
    await submission.save();
    return res.status(201).json({ message: "Form submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: err, });
  }
}
