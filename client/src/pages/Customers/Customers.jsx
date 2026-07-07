import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

import DataTable from "../../components/DataTable/DataTable";
import CustomerFilters from "../../components/Filters/CustomerFilters";
import Pagination from "../../components/Pagination/Pagination";
import EmptyState from "../../components/EmptyState/EmptyState";
import CustomerModal from "../../components/CustomerModal/CustomerModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

import { toast } from "react-toastify";

import "./Customers.css";

import { getCustomers, deleteCustomer } from "../../api/customerApi";
import { attachToken } from "../../api/axios";

function Customers() {
  const { getToken } = useAuth();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        attachToken(getToken);

        const response = await getCustomers();

        setCustomers(response.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load customers");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getToken]);

  const filtered = customers.filter(
    (customer) =>
      customer.fullName.toLowerCase().includes(search.toLowerCase()) &&
      (!status || customer.status === status) &&
      (!priority || customer.priority === priority)
  );

  const columns = [
    { key: "fullName", title: "Customer" },
    { key: "email", title: "Email" },
    { key: "company", title: "Company" },
    { key: "status", title: "Status" },
    { key: "priority", title: "Priority" },
    { key: "actions", title: "Actions" },
  ];

  const handleCustomerAdded = (customer) => {
    if (isEdit) {
      setCustomers((prev) =>
        prev.map((c) => (c._id === customer._id ? customer : c))
      );
    } else {
      setCustomers((prev) => [customer, ...prev]);
    }
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setIsEdit(true);
    setShowModal(true);
  };

 
  const handleDelete = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCustomer(customerToDelete._id);

      setCustomers((prev) =>
        prev.filter((c) => c._id !== customerToDelete._id)
      );

      toast.success("Customer deleted");

      setShowDeleteModal(false);
      setCustomerToDelete(null);
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
          color: "#aaa",
        }}
      >
        Loading customers...
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="customers-header">
        <div>
          <h1>Customers</h1>
          <p>Manage your customer registry.</p>
        </div>

        <button
          className="add-customer-btn"
          onClick={() => {
            setSelectedCustomer(null);
            setIsEdit(false);
            setShowModal(true);
          }}
        >
          + Add Customer
        </button>
      </div>

      <CustomerFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No Customers Found"
          subtitle="Add your first customer to get started."
        />
      ) : (
        <>
          <DataTable
            columns={columns}
            data={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Pagination
            currentPage={1}
            totalPages={1}
            onPageChange={() => {}}
          />
        </>
      )}

      <CustomerModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedCustomer(null);
          setIsEdit(false);
        }}
        customer={selectedCustomer}
        isEdit={isEdit}
        onCustomerAdded={handleCustomerAdded}
      />

      <DeleteModal
        open={showDeleteModal}
        customer={customerToDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setCustomerToDelete(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default Customers;