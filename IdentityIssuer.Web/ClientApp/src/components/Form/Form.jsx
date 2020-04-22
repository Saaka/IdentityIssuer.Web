import React, {useEffect, useState} from "react";

function Form(props) {
    const [isSubmitted, setSubmitted] = useState(false);

    const getFormClass = () => isSubmitted ? "is-validated" : "";
    return (
        <form name={props.name}
              noValidate
              className={getFormClass()}
              onSubmit={props.onSubmit}>
            {props.children.map(child => {
                React.cloneElement(child, {isSubmitted: isSubmitted})
            })}
        </form>
    );
}

export {Form};