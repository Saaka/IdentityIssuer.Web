import React, {useState, useEffect} from 'react';
import {Route, Redirect} from "react-router-dom";
import {App} from "layouts/exports";
import {RouteNames} from "routes/names";
import {Loader} from "components/exports";
import {Login} from "views/exports";

function Index(props) {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    function renderApp() {
        return (
            <span>
                <Route exact
                       path={RouteNames.Root}
                       render={(props) => <Redirect to={RouteNames.App} from={props.path} {...props}/>}/>
                <Route path={RouteNames.Login}
                       render={(props) => <Login {...props} />}/>
                <Route path={RouteNames.App}
                       render={(props) => <App {...props} />}/>
            </span>
        );
    }

    function renderLoader() {
        return (
            <div className="hero has-background-gradient is-fullheight">
                <div className="hero-body center">
                    <Loader/>
                </div>
            </div>
        );
    }


    return isLoading ? renderLoader() : renderApp();
}

export {Index};