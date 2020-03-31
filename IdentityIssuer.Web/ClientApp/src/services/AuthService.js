import {Constants,UserTokenService} from "Services";

export class AuthService {
    tokenService = new UserTokenService();
    
    isLoggedIn = () => this.tokenService.isTokenValid();
    logout = () => this.tokenService.removeToken();
}