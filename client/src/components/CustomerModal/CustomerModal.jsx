import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./CustomerModal.css";

import {
  addCustomer,
  updateCustomer,
} from "../../api/customerApi";

function CustomerModal({
  open,
  onClose,
  customer,
  isEdit,
  onCustomerAdded,
}) {
  const initialForm = {
    fullName: "",
    email: "",
    phone: "",
    company: "",
    designation: "",
    address: "",
    priority: "Medium",
    status: "Active",
    notes: "",
    followUpDate: "",
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (isEdit && customer) {
        setForm({
          fullName: customer.fullName || "",
          email: customer.email || "",
          phone: customer.phone || "",
          company: customer.company || "",
          designation: customer.designation || "",
          address: customer.address || "",
          priority: customer.priority || "Medium",
          status: customer.status || "Active",
          notes: customer.notes || "",
          followUpDate: customer.followUpDate
            ? new Date(customer.followUpDate)
                .toISOString()
                .split("T")[0]
            : "",
        });
      } else {
        setForm(initialForm);
      }
    }
  }, [open, customer, isEdit]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullName.trim()) {
      toast.error("Full Name is required");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      let response;

      if (isEdit) {
        response = await updateCustomer(customer._id, form);
        toast.success("Customer updated successfully");
      } else {
        response = await addCustomer(form);
        toast.success("Customer added successfully");
      }

      if (response.success) {
        onCustomerAdded(response.data);
      }

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
          {isEdit ? "Edit Customer" : "Add Customer"}
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="grid">

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
            />

            <input
              type="text"
              name="company"
              placeholder="Company"
              value={form.company}
              onChange={handleChange}
            />

            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={form.designation}
              onChange={handleChange}
            />

            <input
              type="date"
              name="followUpDate"
              value={form.followUpDate}
              onChange={handleChange}
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

          </div>

          <textarea
            name="address"
            placeholder="Address"
            rows="2"
            value={form.address}
            onChange={handleChange}
          />

          <textarea
            name="notes"
            placeholder="Notes"
            rows="4"
            value={form.notes}
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
                ? "Update Customer"
                : "Save Customer"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default CustomerModal;