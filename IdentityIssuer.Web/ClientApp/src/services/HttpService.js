import {ConfigService} from "Services";
import Axios from "axios";

class HttpService {

    constructor(baseAddress, baseTenant) {
        this.configService = new ConfigService();
        this.baseAddress = baseAddress || this.configService.ApiUrl;
        this.baseTenant = baseTenant;
    };

    get = (address, tenantCode) => {
        let baseAddress = this.getAddress();
        
        return Axios({
            method: "get",
            url: `${baseAddress}` + address,
            headers: this.getHeaders(tenantCode)
        }).catch(err => {
            if (err.response)
                throw err.response.data;
            else
                throw err.message;
        });
    };

    post = (address, data, tenantCode) => {
        let baseAddress = this.getAddress();
        
        return Axios({
            method: "post",
            url: `${baseAddress}` + address,
            data: data,
            headers: this.getHeaders(tenantCode)
        }).catch(err => {
            if (err.response)
                throw err.response.data;
            else
                throw err.message;
        });
    };
    
    getAddress = () => {
        if(this.baseAddress.endsWith("/"))
            return this.baseAddress;
        
        return this.baseAddress + "/";
    };

    getHeaders(tenantCode) {
        return {
            "X-Tenant-Code": tenantCode || this.baseTenant
        };
    }
}

export {HttpService}
