import {AuthHttpService, HttpService, Constants, UserTokenService} from 'Services';

export class AuthService {
    tokenService = new UserTokenService();
    authHttpService = new AuthHttpService();
    httpService = new HttpService();

    isLoggedIn = () => this.tokenService.isTokenValid();
    logout = () => this.tokenService.removeToken();

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
        ...resp.data.user  
      };
    };

    getUser = () => {
        let token = this.tokenService
            .getToken();
        return this.authHttpService
            .get(Constants.ApiRoutes.GET_USER)
            .then(resp => {
                return {
                    ...resp.data,
                    token
                };
            });
    };
}