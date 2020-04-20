import React, {useEffect, useState} from "react";

function CheckboxGroup(props) {
    const validationInputRef = React.createRef();
    const [hasError, setError] = useState(false);

    const hasAnyError =
        () => hasNoItemSelectedError();

    const hasNoItemSelectedError =
        () => props.oneRequired && !props.children.some(child => child.props.checked);

    useEffect(() => {
        if (!validationInputRef)
            return;

        if (hasAnyError()) {
            setError(true);
            setValidity(true);
        } else {
            setError(false);
            setValidity(false);
        }
    }, [props.children]);

    const setValidity = (hasErr) => hasErr
        ? validationInputRef.current.setCustomValidity(`${props.id}_error`)
        : validationInputRef.current.setCustomValidity("");

    const renderError = () =>
        props.isSubmitted && hasError
            ? (<div className="checkbox-control-error">{props.error}</div>)
            : ("");

    return (
        <div className="field">
            <label className="label">{props.label}</label>
            {props.children}
            <input name={props.id} hidden={true} ref={validationInputRef}/>
            {renderError()}
        </div>
    );
}

export {CheckboxGroup};