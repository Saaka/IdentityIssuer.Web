import React, {useEffect, useState} from "react";
import queryString from "query-string";
import {ConfigService, AuthService} from "Services";
import {Loader} from "components/common";
import "./Login.scss";

function Login(props) {
    const config = new ConfigService();
    const authService = new AuthService();
    const [credentials, setCredentials] = useState({
        password: "",
        email: "",
        tenantCode: ""
    });
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setSubmitted] = useState(false);
    const [error, setLoginError] = useState({
        isError: false,
        message: ""
    });

    useEffect(() => {
        if (props.user.isLoggedIn)
            redirectToMainPage();

        initCredentials();
    }, []);

    function initCredentials() {
        let tenantCode = config.AdminTenantCode;
        if (!!tenantCode)
            setCredentials(state => ({
                ...state,
                tenantCode: tenantCode
            }));
    }

    function handleCredentialsChange(ev) {
        const {name, value} = ev.target;
        setCredentials(state => ({
            ...state,
            [name]: value
        }));
    }

    function onLoginSuccess(user) {
        props.onLogin(user);
        let parsedQuery = queryString.parse(props.location.search);
        if (!!parsedQuery && parsedQuery.redirect)
            redirectToPath(parsedQuery.redirect);
        else
            redirectToMainPage();
    }

    function onError(err) {
        setLoading(false);
        setLoginError({isError: true, message: err});
        console.error(err);
    }

    function submitLogin(ev) {
        ev.preventDefault();
        setLoginError({isError: false, message: ""});
        setSubmitted(true);
        let formIsValid = ev.target.checkValidity();
        if (formIsValid) {
            setLoading(true);
            authService
                .loginWithCredentials(credentials.email, credentials.password, credentials.tenantCode)
                .then(onLoginSuccess)
                .catch(onError);
        }
    }

    function redirectToMainPage() {
        props.history.replace("/");
    }

    function redirectToPath(path) {
        props.history.push(path);
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
                        <div className="field button-group">
                            <div className="control">
                                <button type="submit" className="button is-primary">Submit</button>
                            </div>
                            <div>
                                {error.isError ? <p className="help is-danger">Login error: {error.message}</p> : ""}
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }

    return (
        <section className="hero has-background-gradient is-fullheight">
            <div className="hero-body login-body">
                <div className="container center login-container">
                    {loading ? renderLoader() : renderForm()}
                </div>
            </div>
        </section>
    );
}

export {Login};