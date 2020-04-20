import React from "react";

const Checkbox = (props) => {

    return (
        <div className="control">
            <label className="checkbox">
                <input id={props.id}
                       name={props.name}
                       type="checkbox"
                       checked={props.checked}
                       onChange={props.onChange}/>
                {props.label}
            </label>
        </div>
    );
};

export {Checkbox};