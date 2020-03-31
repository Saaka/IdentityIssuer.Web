import { HttpService, UserTokenService } from "Services";

class AuthHttpService extends HttpService {
    constructor(baseAddress, baseTenant) {
        super(baseAddress, baseTenant);
    }

    getHeaders = (tenant) => {
        let tokenService = new UserTokenService();
        let token = tokenService.getToken();

        return {
            "Authorization": `Bearer ${token}`,
            "X-Tenant-Code": tenant
        };
    };
}

export { AuthHttpService };