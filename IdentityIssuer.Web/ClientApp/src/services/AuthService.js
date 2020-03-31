import {AuthHttpService, HttpService, Constants, UserTokenService, TenantService} from "Services";

export class AuthService {
    tokenService = new UserTokenService();
    tenantService = new TenantService();
    authHttpService = new AuthHttpService("a");
    httpService = new HttpService();

    isLoggedIn = () => this.tokenService.isTokenValid();
    logout = () => {
        this.tokenService.removeToken();
        this.tenantService.clearTenant();
    };

    loginWithCredentials = (email, password, tenant) => {
        return this.httpService
            .post(Constants.ApiRoutes.LOGIN, {
                password: password,
                email: email
            }, tenant)
            .then(this.onLogin);
    };

    onLogin = (resp) => {
        this.tokenService
            .setToken(resp.data.token);
        return {
            tenant: resp.data.tenantCode,
            ...resp.data.user
        };
    };

    getUser = (tenant) => {
        let token = this.tokenService
            .getToken();
        return this.authHttpService
            .get(Constants.ApiRoutes.GET_USER, tenant)
            .then(resp => {
                return {
                    ...resp.data,
                    token,
                    tenant
                };
            });
    };
}