import React from "react";

const Unauthorized = (props) => {
    return (
        <div className="columns">
            <div className="column is-half is-offset-3">
                <div className="tile is-parent">
                    <article className="tile is-child notification is-primary">
                        <p className="title">Unauthorized</p>
                        <p className="subtitle">You don't have access to requested resource.</p>
                        <div className="content">
                            Please contact your administrator for more information about why you see this page.
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
};

export {Unauthorized};