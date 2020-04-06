import React from "react";

const About = (props) => {
    
    return (
        <div className="columns">
            <div className="column is-half is-offset-3">
                <div className="tile is-parent">
                    <article className="tile is-child notification is-primary">
                        <p className="title">Identity Issuer WebUI</p>
                        <p className="subtitle">Admin page to manage tenants and users.</p>
                        <div className="content">
                            Please visit my <a href="https://github.com/Saaka/IdentityIssuer.Web" className="is-italic">GitHub page</a> to see the source code for this project.
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
};

export {About};