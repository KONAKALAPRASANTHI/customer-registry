import "./DeleteModal.css";

function DeleteModal({
  open,
  customer,
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="delete-overlay">

      <div className="delete-modal">

        <div className="delete-icon">
          ⚠
        </div>

        <h2>Delete Customer</h2>

        <p>
          Are you sure you want to delete
          <strong> {customer?.fullName}</strong>?
        </p>

        <span>
          This action cannot be undone.
        </span>

        <div className="delete-buttons">

          <button
            className="cancel-delete"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="confirm-delete"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;