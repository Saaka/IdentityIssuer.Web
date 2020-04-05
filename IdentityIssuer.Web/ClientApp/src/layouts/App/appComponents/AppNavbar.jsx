import React from "react";
import "./AppNavbar.scss";
import {RouteNames} from "routes/names";

function AppNavbar(props) {

    function logout() {
        props.history.replace(RouteNames.Logout)
    }

    return (
        <nav className="navbar is-transparent is-primary" role="navigation" aria-label="main site navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item">IdentityIssuer</a>

                    <a className="navbar-burger burger" data-target="app-navbar-menu" role="button" aria-label="dropdown menu" aria-expanded="false">
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                    </a>
                </div>
                <div className="navbar-menu" id="app-navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <a className="button" onClick={logout}>Log out</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export {AppNavbar};