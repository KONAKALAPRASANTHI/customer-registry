import "./Modal.css";

function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">

          <h2>{title}</h2>

          <button onClick={onClose}>✕</button>

        </div>

        <div className="modal-body">
          {children}
        </div>

      </div>

    </div>
  );
}

export default Modal;