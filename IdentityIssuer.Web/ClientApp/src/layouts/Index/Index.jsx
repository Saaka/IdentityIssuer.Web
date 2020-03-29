import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {App} from "layouts/exports";
import {RouteNames} from "routes/names";

function Index(props) {

    function renderApp() {
        return (
            <span>
              <Route exact path={RouteNames.Root} 
                     render={(props) => <Redirect to={RouteNames.App} from={props.path} {...props}/>} />
              <Route path={RouteNames.App} 
                     render={(props) => <App {...props} />} />
            </span>
        );
    }


    return (
        <div>
            <h1>Welcome!</h1>
        </div>
    );
}

export {Index};