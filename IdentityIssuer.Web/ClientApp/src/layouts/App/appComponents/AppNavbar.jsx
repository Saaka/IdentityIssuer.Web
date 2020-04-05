import React from "react";
import "./AppNavbar.scss";
import {RouteNames} from "routes/names";

function AppNavbar(props) {
    
    function logout() {
        props.history.replace(RouteNames.Logout)
    }
    
    return (
        <nav className="navbar" role="navigation" aria-label="main site navigation">
            <div className="navbar-brand">
                <a className="navbar-item">IdentityIssuer</a>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                <a className="button" onClick={logout}>Log out</a>
            </div></div>
        </nav>
    );
}

export {AppNavbar};