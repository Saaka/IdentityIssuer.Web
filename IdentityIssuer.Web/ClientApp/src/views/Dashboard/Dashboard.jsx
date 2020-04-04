import React from "react"
import "./Dashboard.scss";

function Dashboard(props) {

    return (
        <section className="container-fluid dashboard-container center has-background-gradient h-100">
            <div>
                <h1>Identity Issuer</h1>
            </div>
            <div>
                <figure className="image is-128x128 has-border">
                    <img src="https://picsum.photos/128/128/" alt="Logo" style={{maxWidth: "256px"}}/>
                </figure>
            </div>
        </section>
    );
}

export {Dashboard};