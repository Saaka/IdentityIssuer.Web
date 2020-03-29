import React from 'react';
import "./App.scss";

function App(props) {
    return (
        <section className="hero has-background-black is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <figure className="image center">
                        <img src="https://picsum.photos/256/128/" alt="Logo" style={{maxWidth: "256px"}}/>
                    </figure>
                </div>
            </div>
        </section>
    );
}

export {App};
