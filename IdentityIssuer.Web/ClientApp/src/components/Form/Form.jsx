import React, {useEffect, useState} from "react";

function Form(props) {
    // const [isSubmitted, setSubmitted] = useState(false);

    function renderComponents() {
        const children = React.Children.map(props.children, child => {
                if(typeof child.type === "string")
                    return child;
                return React.cloneElement(child, {isSubmitted: props.isSubmitted});
            }
        );

        return (
            <>{children}</>
        )
    }

    const getFormClass = () => props.isSubmitted ? "is-validated" : "";
    return (
        <form name={props.name}
              noValidate
              className={getFormClass()}
              onSubmit={props.onSubmit}>
            {renderComponents()}
        </form>
    );
}

export {Form};