import "./DataTable.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
}) {
  return (
    <div className="table-wrapper">
      <table className="crm-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="empty-row"
              >
                No records found
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row._id}>

                {columns.map((column) => {

                  if (column.key === "status") {
                    return (
                      <td key={column.key}>
                        <span
                          className={`status ${row.status.toLowerCase()}`}
                        >
                          {row.status}
                        </span>
                      </td>
                    );
                  }

                  if (column.key === "priority") {
                    return (
                      <td key={column.key}>
                        <span
                          className={`priority ${row.priority.toLowerCase()}`}
                        >
                          {row.priority}
                        </span>
                      </td>
                    );
                  }

                  if (column.key === "actions") {
                    return (
                      <td key={column.key}>
                        <div className="table-actions">

                          <button
                            className="edit-btn"
                            onClick={() => onEdit(row)}
                          >
                            <FiEdit2 />
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() => onDelete(row)}
                          >
                            <FiTrash2 />
                          </button>

                        </div>
                      </td>
                    );
                  }

                  return (
                    <td key={column.key}>
                      {row[column.key]}
                    </td>
                  );

                })}

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;