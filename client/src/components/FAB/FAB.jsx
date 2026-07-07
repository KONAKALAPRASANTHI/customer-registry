import "./FAB.css";

import { FiPlus } from "react-icons/fi";

function FAB({ onClick }) {
  return (
    <button className="fab" onClick={onClick}>

      <FiPlus size={22} />

    </button>
  );
}

export default FAB;