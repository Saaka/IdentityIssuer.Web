import React, {useState, useEffect} from 'react';
import {Route, Redirect} from "react-router-dom";
import {AuthService, TenantService} from "Services";
import {App} from "layouts/exports";
import {RouteNames} from "routes/names";
import {Loader} from "components/common";
import {Login} from "views/exports";

function Index(props) {
    const authService = new AuthService();
    const tenantService = new TenantService();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({isLoggedIn: false});

    useEffect(() => {
        let tenant = tenantService.getTenant();
        if (authService.isLoggedIn() && !!tenant)
            loadUserData(tenant);
        else {
            removeUser();
            hideLoader();
        }
    }, []);

    function loadUserData(tenant) {
        authService
            .getUser(tenant)
            .then(updateUser)
            .catch(onError)
            .finally(hideLoader);
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
    const onLogout = () => removeUser();

    const hideLoader = () => setIsLoading(false);

    function renderApp() {
        return (
            <span>
                <Route exact
                       path={RouteNames.Root}
                       render={(props) => <Redirect to={RouteNames.App}
                                                    from={props.path}
                                                    {...props} user={user}/>}/>
                <Route path={RouteNames.Login}
                       render={(props) => <Login {...props}
                                                 onLogin={onLogin}
                                                 onLogout={onLogout}
                                                 toggleLoader={setIsLoading}
                                                 user={user}/>}/>
                <Route path={RouteNames.App}
                       render={(props) => <App {...props} user={user}/>}/>
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