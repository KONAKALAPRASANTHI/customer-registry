import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DataTable from "../../components/DataTable/DataTable";
import EmptyState from "../../components/EmptyState/EmptyState";
import TicketModal from "../../components/TicketModal/TicketModal";

import { getTickets, deleteTicket } from "../../api/ticketApi";

import "./Tickets.css";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await getTickets();
      setTickets(response.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  const handleTicketSaved = (ticket) => {
    if (isEdit) {
      setTickets((prev) =>
        prev.map((t) => (t._id === ticket._id ? ticket : t))
      );
    } else {
      setTickets((prev) => [ticket, ...prev]);
    }
  };

  const handleEdit = (ticket) => {
    setSelectedTicket(ticket);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = async (ticket) => {
    if (!window.confirm("Delete this ticket?")) return;

    try {
      await deleteTicket(ticket._id);

      setTickets((prev) => prev.filter((t) => t._id !== ticket._id));

      toast.success("Ticket deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const columns = [
    { key: "customer", title: "Customer" },
    { key: "subject", title: "Subject" },
    { key: "status", title: "Status" },
    { key: "priority", title: "Priority" },
    { key: "actions", title: "Actions" },
  ];

  const tableData = tickets.map((ticket) => ({
    ...ticket,
    customer: ticket.customer?.fullName || "-",
  }));

  return (
    <div className="tickets-page">

      {/* HEADER */}
      <div className="tickets-header">
        <div>
          <h1>Tickets</h1>
          <p>Manage customer support tickets efficiently</p>
        </div>

        <button
          className="add-ticket-btn"
          onClick={() => {
            setSelectedTicket(null);
            setIsEdit(false);
            setShowModal(true);
          }}
        >
          + Create Ticket
        </button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <h2 className="tickets-loading">Loading...</h2>
      ) : tableData.length === 0 ? (
        <EmptyState
          title="No Tickets Found"
          description="Create your first support ticket to get started."
        />
      ) : (
        <DataTable
          columns={columns}
          data={tableData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* MODAL */}
      <TicketModal
        open={showModal}
        onClose={() => setShowModal(false)}
        ticket={selectedTicket}
        isEdit={isEdit}
        onTicketSaved={handleTicketSaved}
      />
    </div>
  );
}

export default Tickets;