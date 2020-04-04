import React from 'react';
import {Switch, Route, Redirect} from "react-router";
import {AuthRoute} from "components/navigation";
import appRoutes from "routes/appRoutes";
import "./App.scss";

function App(props) {

    function RenderSwitch() {
        return (
            <Switch>
                {appRoutes.map((prop, key) => {
                    if (prop.redirect)
                        return (<Redirect from={prop.path} to={prop.to} key={key}/>);
                    else if (prop.useAuth)
                        if (prop.requireAdmin)
                            return (<AuthRoute path={prop.path} component={prop.component} name={prop.name} key={key}
                                               user={props.user}/>);
                        else
                            return (<AuthRoute path={prop.path} component={prop.component} name={prop.name} key={key}
                                               user={props.user}/>);
                    else
                        return <Route path={prop.path} component={prop.component} name={prop.name} key={key}/>;
                })}
            </Switch>
        );
    }

    return (
        <div>
            {RenderSwitch()}
        </div>
    );
}

export {App};
