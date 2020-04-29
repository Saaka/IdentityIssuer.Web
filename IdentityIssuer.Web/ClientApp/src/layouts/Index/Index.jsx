import React, {useState, useEffect} from 'react';
import {Route, Redirect} from "react-router-dom";
import {AuthService, ConfigService} from "Services";
import {App} from "layouts/exports";
import {RouteNames} from "routes/names";
import {Loader} from "components/common";
import {Login, Logout} from "views/exports";

function Index(props) {
    const authService = new AuthService();
    const config = new ConfigService();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({isLoggedIn: false});

    useEffect(() => {
        if (authService.isLoggedIn())
            loadUserData(config.AdminTenantCode);
        else {
            removeUser();
            hideLoader();
        }
    }, []);

    function loadUserData() {
        let userData = authService
            .getUser();
        updateUser(userData);

        hideLoader();
    }

    function updateUser(user) {
        setUser({
            ...user,
            isLoggedIn: true
        });
    }

    function removeUser() {
        setUser({
            isLoggedIn: false
        });
        return authService.logout()
    }

    function onError(err) {
        console.error(err);
        removeUser();
    }

    const onLogin = (user) => {
        hideLoader();
        updateUser(user);
    };

    const onLogout = () => {
        setUser({
            isLoggedIn: false
        });
    };

    const hideLoader = () => setIsLoading(false);

    function renderApp() {
        return (
            <React.Fragment>
                <Route exact
                       path={RouteNames.Root}
                       render={(props) => <Redirect to={RouteNames.App}
                                                    from={props.path}
                                                    {...props} user={user}/>}/>
                <Route path={RouteNames.Login}
                       render={(props) => <Login {...props}
                                                 onLogin={onLogin}
                                                 user={user}/>}/>
                <Route path={RouteNames.Logout}
                       render={(props) => <Logout {...props}
                                                  onLogout={onLogout}/>}/>
                <Route path={RouteNames.App}
                       render={(props) => <App {...props} user={user}/>}/>
            </React.Fragment>
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