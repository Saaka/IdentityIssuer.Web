import React, {useEffect} from "react";
import queryString from "query-string";
import "./Login.scss";

function Login(props) {

    useEffect(() => {
        if (props.user.isLoggedIn)
            redirectToMainPage();
    }, []);

    function submitLogin(ev) {

    }

    function redirectToMainPage() {
        props.history.replace("/");
    }

    return (
        <section className="hero has-background-gradient is-fullheight">
            <div className="hero-body">
                <div className="container center login-container">
                    <h1 className="is-size-4 login-title">Login to Identity Issuer</h1>
                    <div className="notification">
                        <form name="loginForm"
                              onSubmit={(ev) => submitLogin(ev)}
                              noValidate>
                            <div className="field">
                                <label className="label">Tenant Code</label>
                                <div className="control">
                                    <input id="tenantCode" name="code"
                                           className="input" type="text" maxLength="3"/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">User email</label>
                                <div className="control">
                                    <input id="userEmail" name="email"
                                           className="input" type="text" maxLength="128"/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">User password</label>
                                <div className="control">
                                    <input id="userPassword" name="pass"
                                           className="input" type="password" maxLength="128"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export {Login};