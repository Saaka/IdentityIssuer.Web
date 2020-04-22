import React, {useEffect, useState} from "react";

function Form(props) {
     const [isSubmitted, setSubmitted] = useState(false);

    function renderComponents() {
        const children = React.Children.map(props.children, child => {
                if(typeof child.type === "string")
                    return child;
                return React.cloneElement(child, {isSubmitted: isSubmitted});
            }
        );

        return (
            <>{children}</>
        )
    }
    
    function onFormSubmit(ev) {
        ev.preventDefault();
        setSubmitted(true);

        props.onSubmit(ev);
    }

    const getFormClass = () => isSubmitted ? "is-validated" : "";
    return (
        <form name={props.name}
              noValidate
              className={getFormClass()}
              onSubmit={onFormSubmit}>
            {renderComponents()}
        </form>
    );
}

export {Form};