import React, {useEffect, useState} from "react";
import {Loader} from "components/common";
import {TextInput, NumberInput, CheckboxGroup, Checkbox, Form} from "components/forms";
import "./TenantApplication.scss";

function TenantApplication(props) {
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

    function submitForm(ev) {
        setError({isError: false, message: ""});
        let formIsValid = ev.target.checkValidity();
        if (formIsValid) {
            alert("OK");
        }
    }

    return (
        <section className="section">
            <div className="container tenant-application-container">
                <h1 className="is-size-4 form-title">Apply for tenant</h1>
                <div className="notification">
                    <Form name="tenantApplicationForm"
                          onSubmit={(ev) => submitForm(ev)}>
                        <TextInput label="Owner email"
                                   id="ownerEmail"
                                   name="ownerEmail"
                                   required
                                   maxLength="128"
                                   value={application.ownerEmail}
                                   onChange={handleInputChange}
                                   error="Owner email is required"/>
                        <TextInput label="Tenant name"
                                   id="tenantName"
                                   name="tenantName"
                                   required
                                   maxLength="32"
                                   value={application.tenantName}
                                   onChange={handleInputChange}
                                   error="Name is required"/>
                        <TextInput label="Tenant code"
                                   id="tenantCode"
                                   name="tenantCode"
                                   required
                                   minLength="3"
                                   maxLength="3"
                                   value={application.tenantCode}
                                   onChange={handleInputChange}
                                   error="Three letter tenant code is required"/>
                        <TextInput label="Allowed origin"
                                   id="allowedOrigin"
                                   name="allowedOrigin"
                                   required
                                   maxLength="128"
                                   value={application.allowedOrigin}
                                   onChange={handleInputChange}
                                   error="Set valid origin that will use your tokens"/>
                        <TextInput label="Token secret"
                                   id="tokenSecret"
                                   name="tokenSecret"
                                   required
                                   maxLength="256"
                                   value={application.tokenSecret}
                                   onChange={handleInputChange}
                                   error="Valid token secret is required (max length is 256 characters)"/>
                        <NumberInput label="Token expiration in minutes"
                                     id="tokenExpirationInMinutes1"
                                     name="tokenExpirationInMinutes"
                                     required
                                     maxLength="256"
                                     value={application.tokenExpirationInMinutes}
                                     onChange={handleInputChange}
                                     error="Expiration date for your tokens. Max value is 44640 (one month)"/>
                        <CheckboxGroup label="Login methods"
                                       id="loginMethods"
                                       oneRequired
                                       error="At least one login method is required">
                            <Checkbox id="enableCredentialsLogin2"
                                      name="enableCredentialsLogin"
                                      checked={application.enableCredentialsLogin}
                                      onChange={handleCheckboxChanged}
                                      label="Enable login with credentials"/>
                            <Checkbox id="enableGoogleLogin2"
                                      name="enableGoogleLogin"
                                      checked={application.enableGoogleLogin}
                                      onChange={handleCheckboxChanged}
                                      label="Enable login with Google"/>
                            <Checkbox id="enableFacebookLogin2"
                                      name="enableFacebookLogin"
                                      checked={application.enableFacebookLogin}
                                      onChange={handleCheckboxChanged}
                                      label="Enable login with Facebook"/>
                        </CheckboxGroup>
                        <div className="field button-group">
                            <div className="control">
                                <button type="submit" className="button is-primary">Submit</button>
                            </div>
                            <div>
                                {error.isError ? <p className="help is-danger">Error: {error.message}</p> : ""}
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    );
}

export {TenantApplication};