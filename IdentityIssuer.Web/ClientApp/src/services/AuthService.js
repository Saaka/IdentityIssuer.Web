import {AuthHttpService, HttpService, Constants, UserTokenService} from "Services";

export class AuthService {
    tokenService = new UserTokenService();
    authHttpService = new AuthHttpService();
    httpService = new HttpService();

    isLoggedIn = () => this.tokenService.isTokenValid();
    logout = () => {
        this.tokenService.removeToken();
    };

    loginWithCredentials = (email, password, tenantCode) => {
        return this.httpService
            .post(Constants.ApiRoutes.LOGIN, {
                password: password,
                email: email
            }, tenantCode)
            .then(this.onLogin)
            .catch(this.onLoginError);
    };

    onLoginError = (err) => {
        throw err.error || err;
    };

    onLogin = (resp) => {
        this.tokenService
            .setToken(resp.data.token);
        let authData = this.tokenService
            .getTokenData();

        return this.getUserFromTokenData(authData);
    };

    getUser = () => {
        let authData = this.tokenService
            .getTokenData();
        
        return this.getUserFromTokenData(authData);
    };

    getUserFromTokenData = (authData) => {
        return {
            tenantCode: authData.tenant,
            userGuid: authData.sub,
            name: authData.name,
            email: authData.email,
            avatar: authData.avatar,
            roles: authData.role
        }
    };
}