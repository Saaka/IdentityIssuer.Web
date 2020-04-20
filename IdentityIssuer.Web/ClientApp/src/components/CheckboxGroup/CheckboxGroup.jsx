import React, {Component} from "react";
import {Checkbox} from "../forms";

function CheckboxGroup(props) {

    function hasNoItemSelectedError() {
        return props.oneRequired && !props.children.some(child => child.props.checked);
    }

    const renderError = () =>
        props.isSubmitted && (hasNoItemSelectedError())
            ? (<div className="checkbox-control-error">{props.error}</div>)
            : ("");

    return (
        <div className="field">
            <label className="label">{props.label}</label>
            {props.children}
            {renderError()}
        </div>
    );
}

export {CheckboxGroup};