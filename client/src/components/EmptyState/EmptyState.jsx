import { FiInbox } from "react-icons/fi";

import "./EmptyState.css";

function EmptyState({

    title,

    subtitle

}) {

    return (

        <div className="empty-state">

            <FiInbox className="empty-icon"/>

            <h2>

                {title}

            </h2>

            <p>

                {subtitle}

            </p>

        </div>

    );

}

export default EmptyState;