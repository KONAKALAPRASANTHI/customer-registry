import "./Badge.css";

function Badge({ type = "active", text }) {

    return (

        <span className={`badge ${type}`}>

            {text}

        </span>

    );

}

export default Badge;