import React, {useEffect, useState} from "react";
import {Loader} from "components/common";
import "./TenantApplication.scss";

function TenantApplication(props) {
    const [isSubmitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [application, setApplication] = useState({
        tenantName: "",
        tenantCode: "",
        allowedOrigin: "*",
        tokenSecret: "",
        tokenExpirationInMinutes: "10080",
        enableCredentialsLogin: true,
        enableGoogleLogin: false,
        enableFacebookLogin: false,
        ownerEmail: ""
    });
    const [error, setError] = useState({
        isError: false,
        message: ""
    });

    function handleInputChange(ev) {
        const {name, value} = ev.target;
        setApplication(state => ({
            ...state,
            [name]: value
        }));
    }

    function handleCheckboxChanged(ev) {
        const {name, checked} = ev.target;
        setApplication(state => ({
            ...state,
            [name]: checked
        }));
    }

    function hasLoginMethodSelected() {
        return application.enableCredentialsLogin ||
            application.enableGoogleLogin ||
            application.enableFacebookLogin;
    }

    function submitForm(ev) {
        ev.preventDefault();
        setError({isError: false, message: ""});
        setSubmitted(true);
        let formIsValid = ev.target.checkValidity() && hasLoginMethodSelected();
        if (formIsValid) {
            alert("OK");
        }
    }

    const getFormClass = () => isSubmitted ? "is-validated" : "";
    return (
        <section className="section">
            <div className="container tenant-application-container">
                <h1 className="is-size-4 form-title">Apply for tenant</h1>
                <div className="notification">
                    <form name="tenantApplicationForm"
                          onSubmit={(ev) => submitForm(ev)}
                          noValidate
                          className={getFormClass()}>
                        <div className="field">
                            <label className="label">Owner email</label>
                            <div className="control">
                                <input id="ownerEmail"
                                       name="ownerEmail"
                                       required
                                       className="input"
                                       type="email"
                                       maxLength="128"
                                       value={application.ownerEmail}
                                       onChange={handleInputChange}/>
                                <div className="control-error">Owner email is required</div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Tenant Name</label>
                            <div className="control">
                                <input id="tenantName"
                                       name="tenantName"
                                       required
                                       className="input"
                                       type="text"
                                       maxLength="32"
                                       value={application.tenantName}
                                       onChange={handleInputChange}/>
                                <div className="control-error">Name is required</div>
                            </div>
                        </div>
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
                                       value={application.tenantCode}
                                       onChange={handleInputChange}/>
                                <div className="control-error">Three letter tenant code is required.</div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Allowed origin</label>
                            <div className="control">
                                <input id="allowedOrigin"
                                       name="allowedOrigin"
                                       required
                                       className="input"
                                       type="text"
                                       maxLength="128"
                                       value={application.allowedOrigin}
                                       onChange={handleInputChange}/>
                                <div className="control-error">Set valid origin that will use your tokens.</div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Token secret</label>
                            <div className="control">
                                <input id="tokenSecret"
                                       name="tokenSecret"
                                       required
                                       className="input"
                                       type="text"
                                       maxLength="256"
                                       value={application.tokenSecret}
                                       onChange={handleInputChange}/>
                                <div className="control-error">
                                    Valid token secret is required (max length is 256 characters)
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Token expiration in minutes</label>
                            <div className="control">
                                <input id="tokenExpirationInMinutes"
                                       name="tokenExpirationInMinutes"
                                       required
                                       className="input"
                                       type="number"
                                       step="1"
                                       min="1"
                                       max="44640"
                                       checked={application.tokenExpirationInMinutes}
                                       onClick={handleInputChange}/>
                                <div className="control-error">
                                    Expiration date for your tokens. Max value is 44640 (one month)
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Login methods</label>
                            <div className="control">
                                <label className="checkbox">
                                    <input id="enableCredentialsLogin"
                                           name="enableCredentialsLogin"
                                           type="checkbox"
                                           step="1"
                                           min="1"
                                           max="44640"
                                           checked={application.enableCredentialsLogin}
                                           onClick={handleCheckboxChanged}/>
                                    Enable login with credentials
                                </label>
                            </div>
                            <div className="control">
                                <label className="checkbox">
                                    <input id="enableGoogleLogin"
                                           name="enableGoogleLogin"
                                           type="checkbox"
                                           step="1"
                                           min="1"
                                           max="44640"
                                           checked={application.enableGoogleLogin}
                                           onClick={handleCheckboxChanged}/>
                                    Enable login with Google
                                </label>
                            </div>
                            <div className="control">
                                <label className="checkbox">
                                    <input id="enableFacebookLogin"
                                           name="enableFacebookLogin"
                                           type="checkbox"
                                           step="1"
                                           min="1"
                                           max="44640"
                                           checked={application.enableFacebookLogin}
                                           onClick={handleCheckboxChanged}/>
                                    Enable login with Facebook
                                </label>
                            </div>
                            {isSubmitted && !hasLoginMethodSelected() ?
                                <div className="checkbox-control-error">At least one login method is required</div>
                                : ""}
                        </div>
                        <div className="field button-group">
                            <div className="control">
                                <button type="submit" className="button is-primary">Submit</button>
                            </div>
                            <div>
                                {error.isError ? <p className="help is-danger">Error: {error.message}</p> : ""}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export {TenantApplication};