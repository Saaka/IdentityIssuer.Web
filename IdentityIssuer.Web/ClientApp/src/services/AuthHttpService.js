import { HttpService, UserTokenService } from "Services";

class AuthHttpService extends HttpService {
    getHeaders = (tenantCode) => {
        let tokenService = new UserTokenService();
        let token = tokenService.getToken();

        return {
            "Authorization": `Bearer ${token}`,
            "X-Tenant-Code": tenantCode
        };
    };
}

export { AuthHttpService };