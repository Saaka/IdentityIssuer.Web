import React, {useEffect, useState} from "react";
import queryString from "query-string";
import {TenantService, AuthService} from "Services";
import {Loader} from "components/common";
import "./Login.scss";

function Login(props) {
    const tenantService = new TenantService();
    const authService = new AuthService();
    const [credentials, setCredentials] = useState({
        password:"",
        email: "",
        tenantCode: ""
    });
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (props.user.isLoggedIn)
            redirectToMainPage();

        initCredentials();
    }, []);

    function initCredentials() {
        let tenant = tenantService.getTenant();
        if (!!tenant)
            setCredentials(state => ({
                ...state,
                tenantCode: tenant
            }));
    }

    function handleCredentialsChange(ev) {
        const {name, value} = ev.target;
        setCredentials(state => ({
            ...state,
            [name]: value
        }));
    }

    function submitLogin(ev) {
        ev.preventDefault();
        setSubmitted(true);
        let formIsValid = ev.target.checkValidity();
        if(formIsValid) {

            setLoading(true);
            tenantService.setTenant(credentials.tenantCode);
            setTimeout(() => {
                initCredentials();
                setLoading(false);
            }, 250);
        }
    }

    function redirectToMainPage() {
        props.history.replace("/");
    }
    const getFormClass = () => isSubmitted ? "is-validated" : "";

    const renderLoader = () => (<Loader/>);

    function renderForm() {
        return (
            <React.Fragment>

                <h1 className="is-size-4 login-title">Login to Identity Issuer</h1>
                <div className="notification">
                    <form name="loginForm"
                          onSubmit={(ev) => submitLogin(ev)}
                          noValidate
                          className={getFormClass()}>
                        <div className="field">
                            <label className="label">Tenant Code</label>
                            <div className="control">
                                <input id="tenantCode"
                                       name="tenantCode"
                                       required
                                       className="input"
                                       type="text"
                                       minLength="3"
                                       maxLength="3"
                                       value={credentials.tenantCode}
                                       onChange={handleCredentialsChange}/>
                                <div className="control-error">Three letter tenant code is required.</div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">User email</label>
                            <div className="control">
                                <input id="email"
                                       name="email"
                                       required
                                       className="input"
                                       type="email"
                                       maxLength="128"
                                       value={credentials.email}
                                       onChange={handleCredentialsChange}/>
                                <div className="control-error">Email is required</div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">User password</label>
                            <div className="control">
                                <input id="password"
                                       name="password"
                                       required
                                       className="input"
                                       type="password"
                                       maxLength="128"
                                       minLength="6"
                                       value={credentials.password}
                                       onChange={handleCredentialsChange}/>
                                <div className="control-error">Password is required (min. 6 characters)</div>
                            </div>
                        </div>
                        <div className="field is-grouped is-grouped-right">
                            <div className="control">
                                <button type="submit" className="button is-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }

    return (
        <section className="hero has-background-gradient is-fullheight">
            <div className="hero-body">
                <div className="container center login-container">
                    {loading ? renderLoader() : renderForm()}
                </div>
            </div>
        </section>
    );
}

export {Login};