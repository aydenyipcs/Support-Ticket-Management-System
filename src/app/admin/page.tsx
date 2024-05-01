"use client";
import { useState, useEffect, useRef, useMemo, FC } from "react";
import TicketTable from "../components/ticketTable";

const AdminPanel = () => {
  const [ticketData, setTicketData] = useState<TicketDataProps>({
    new: null,
    inProgress: null,
    resolved: null,
  });

  const [currStatus, setCurrStatus] = useState<
    "new" | "inProgress" | "resolved"
  >("new");
  const [isTicketUpdated, setIsTicketUpdated] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchUpdatedData = async () => {
        try {
          const response = await fetch("/api/fetchTickets");
          const data: TicketDataProps = await response.json();
          setTicketData(data);
          setIsTicketUpdated(false);
        } catch (err) {
          console.error("Failed to fetch updated ticket data:", err);
          setIsTicketUpdated(false);
        }
    };
    fetchUpdatedData();
  }, [isTicketUpdated]);

  const tickets = useMemo(() => ticketData[currStatus] || [], [ticketData, currStatus]);

  return (
    <main className="flex grow flex-col">
      <div className="flex flex-row space-x-2">
        <button
          className={`rounded-lg px-2 text-blue-800 bg-blue-300 hover:bg-opacity-50 ${
            currStatus === "new" && "italic font-semibold"
          }`}
          onClick={() => setCurrStatus("new")}
        >{`New (${ticketData?.new?.length})`}</button>
        <button
          className={`rounded-lg px-2 text-yellow-800 bg-yellow-300 hover:bg-opacity-50 ${
            currStatus === "inProgress" && "italic font-semibold"
          }`}
          onClick={() => setCurrStatus("inProgress")}
        >{`In Progress (${ticketData?.inProgress?.length})`}</button>
        <button
          className={`rounded-lg px-2 text-green-800 bg-green-300 hover:bg-opacity-50 ${
            currStatus === "resolved" && "italic font-semibold"
          }`}
          onClick={() => setCurrStatus("resolved")}
        >{`Resolved (${ticketData?.resolved?.length})`}</button>
      </div>
      <TicketTable tickets={tickets} setIsTicketUpdated={setIsTicketUpdated}/>
    </main>
  );
};
export default AdminPanel;
