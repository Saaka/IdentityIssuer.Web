import {AuthHttpService, HttpService, Constants, UserTokenService, TenantService} from "Services";

export class AuthService {
    tokenService = new UserTokenService();
    tenantService = new TenantService();
    authHttpService = new AuthHttpService();
    httpService = new HttpService();

    isLoggedIn = () => this.tokenService.isTokenValid();
    logout = () => {
        this.tokenService.removeToken();
        this.tenantService.clearTenant();
    };

    loginWithCredentials = (email, password, tenantCode) => {
        return this.httpService
            .post(Constants.ApiRoutes.LOGIN, {
                password: password,
                email: email
            }, tenantCode)
            .then(this.onLogin);
    };

    onLogin = (resp) => {
        this.tokenService
            .setToken(resp.data.token);
        return {
            tenantCode: resp.data.tenantCode,
            ...resp.data.user
        };
    };

    getUser = (tenantCode) => {
        let token = this.tokenService
            .getToken();
        return this.authHttpService
            .get(Constants.ApiRoutes.GET_USER, tenantCode)
            .then(resp => {
                return {
                    ...resp.data,
                    token,
                    tenantCode
                };
            });
    };
}