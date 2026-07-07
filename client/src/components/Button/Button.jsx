import "./Button.css";

function Button({
    children,
    type = "button",
    variant = "primary",
    onClick,
    disabled = false
}) {

    return (

        <button
            className={`btn ${variant}`}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >

            {children}

        </button>

    );

}

export default Button;