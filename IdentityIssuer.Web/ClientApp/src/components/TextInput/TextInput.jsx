import React from "react";

const TextInput = (props) => {
    
    return (
        <div className="field">
            <label className="label">{props.label}</label>
            <div className="control">
                <input id={props.id}
                       name={props.name}
                       required={props.required}
                       className="input"
                       type="text"
                       minLength={props.minLength}
                       maxLength={props.maxLength}
                       value={props.value}
                       onChange={props.onChange}/>
                <div className="control-error">{props.error}</div>
            </div>
        </div>  
    );
};

export {TextInput};