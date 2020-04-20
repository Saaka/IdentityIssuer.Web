import React from "react";

const NumberInput = (props) => {

    return (
        <div className="field">
            <label className="label">{props.label}</label>
            <div className="control">
                <input id={props.id}
                       name={props.name}
                       required={props.required}
                       className="input"
                       type="number"
                       step={props.step}
                       min={props.min}
                       max={props.max}
                       value={props.value}
                       onChange={props.onChange}/>
                <div className="control-error">{props.error}</div>
            </div>
        </div>
    );
};

export {NumberInput};