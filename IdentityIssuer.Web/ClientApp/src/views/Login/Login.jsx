import React, {useEffect, useState} from "react";
import queryString from "query-string";
import {TenantService, AuthService} from "Services";
import {Loader} from "components/common";
import "./Login.scss";

function Login(props) {
    const tenantService = new TenantService();
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
        let tenantCode = tenantService.getTenant();
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
        tenantService.setTenant(user.tenantCode);
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

    const getFormClass = () => isSubmitted ? "was-validated" : "";

    const renderLoader = () => (<Loader/>);

    function renderForm() {
        return (
            <div className="container login-container center-h">
                <div className="col-md-4 offset-md-4">
                    <div className="row justify-content-center">
                        <h1 className="login-title">Identity Issuer</h1>
                    </div>
                    <div className="row card">
                        <div className="container">
                            <div className="row justify-content-center">
                                <h2>Login</h2>
                            </div>
                            <form name="loginForm"
                                  onSubmit={(ev) => submitLogin(ev)}
                                  noValidate
                                  className={getFormClass()}>
                                <div className="form-group">
                                    <label htmlFor="tenantCode">Tenant Code</label>
                                    <input id="tenantCode"
                                           name="tenantCode"
                                           required
                                           className="form-control"
                                           type="text"
                                           minLength="3"
                                           maxLength="3"
                                           value={credentials.tenantCode}
                                           onChange={handleCredentialsChange}/>
                                    <div className="invalid-feedback">Three letter tenant code is required.</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">User email</label>
                                    <input id="email"
                                           name="email"
                                           required
                                           className="form-control"
                                           type="email"
                                           maxLength="128"
                                           value={credentials.email}
                                           onChange={handleCredentialsChange}/>
                                    <div className="invalid-feedback">Email is required</div>
                                </div>
                                <div className="form-group">
                                    <label className="label">User password</label>
                                    <input id="password"
                                           name="password"
                                           required
                                           className="form-control"
                                           type="password"
                                           maxLength="128"
                                           minLength="6"
                                           value={credentials.password}
                                           onChange={handleCredentialsChange}/>
                                    <div className="invalid-feedback">Password is required (min. 6 characters)</div>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    <div>
                                        {error.isError ?
                                            <p className="text-danger">Login error: {error.message}</p> : ""}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="h-100 d-flex justify-content-center has-background-gradient">
            {loading ? renderLoader() : renderForm()}
        </section>
    );
}

export {Login};