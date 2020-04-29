export class ConfigService {
    constructor(){
        this.ApiUrl = process.env.REACT_APP_API_URL;
        this.AdminTenantCode = process.env.REACT_APP_ADMIN_TENANT_CODE;
    }
}