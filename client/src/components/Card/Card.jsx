import "./Card.css";

function Card({ title, value, icon, children }) {
    return (
        <div className="stat-card">

            <div className="stat-header">

                <div>

                    <p className="stat-title">
                        {title}
                    </p>

                    <h2 className="stat-value">
                        {value}
                    </h2>

                </div>

                <div className="stat-icon">
                    {icon}
                </div>

            </div>

            {children}

        </div>
    );
}

export default Card;