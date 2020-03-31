import {ConfigService} from "Services";
import Axios from "axios";

class HttpService {

    constructor(baseAddress, baseTenant) {
        this.configService = new ConfigService();
        this.baseAddress = baseAddress || this.configService.ApiUrl;
        this.baseTenant = baseTenant;
    };

    get = (address, tenant) => {
        return Axios({
            method: "get",
            url: `${this.baseAddress}/` + address,
            headers: this.getHeaders(tenant)
        }).catch(err => {
            if (err.response)
                throw err.response.data;
            else
                throw err.message;
        });
    };

    post = (address, data, tenant) => {
        return Axios({
            method: "post",
            url: `${this.baseAddress}` + address,
            data: data,
            headers: this.getHeaders(tenant)
        }).catch(err => {
            if (err.response)
                throw err.response.data;
            else
                throw err.message;
        });
    };
    
    getHeaders(tenant) {
        return {
            "X-Tenant-Code": tenant || this.baseTenant
        };
    }
}

export {HttpService}
