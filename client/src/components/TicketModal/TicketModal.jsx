import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./TicketModal.css";

import {
  addTicket,
  updateTicket,
} from "../../api/ticketApi";

import { getCustomers } from "../../api/customerApi";

function TicketModal({
  open,
  onClose,
  ticket,
  isEdit,
  onTicketSaved,
}) {
  const [customers, setCustomers] = useState([]);

  const initialForm = {
    customer: "",
    subject: "",
    description: "",
    priority: "Medium",
    status: "Open",
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      loadCustomers();
    }
  }, [open]);

  useEffect(() => {
    if (isEdit && ticket) {
      setForm({
        customer: ticket.customer?._id || "",
        subject: ticket.subject || "",
        description: ticket.description || "",
        priority: ticket.priority || "Medium",
        status: ticket.status || "Open",
      });
    } else {
      setForm(initialForm);
    }
  }, [ticket, isEdit]);

  const loadCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.customer)
      return toast.error("Select Customer");

    if (!form.subject.trim())
      return toast.error("Subject required");

    try {
      setLoading(true);

      let response;

      if (isEdit) {
        response = await updateTicket(ticket._id, form);
        toast.success("Ticket Updated");
      } else {
        response = await addTicket(form);
        toast.success("Ticket Created");
      }

      onTicketSaved(response.data);

      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="customer-modal">

        <h2>
          {isEdit ? "Edit Ticket" : "Create Ticket"}
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="grid">

            <select
              name="customer"
              value={form.customer}
              onChange={handleChange}
            >
              <option value="">
                Select Customer
              </option>

              {customers.map((customer) => (
                <option
                  key={customer._id}
                  value={customer._id}
                >
                  {customer.fullName}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
            />

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>

          </div>

          <textarea
            name="description"
            rows="5"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <div className="modal-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : isEdit
                ? "Update Ticket"
                : "Create Ticket"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default TicketModal;