import React from "react"
import "./Dashboard.scss";

function Dashboard(props) {

    return (
        <section className="hero has-background-gradient is-fullheight">
            <div className="hero-body">
                <div className="container center">
                    <figure className="image is-128x128 has-border">
                        <img src="https://picsum.photos/128/128/" alt="Logo" style={{maxWidth: "256px"}} />
                    </figure>
                </div>
            </div>
        </section>
    );
}

export {Dashboard};