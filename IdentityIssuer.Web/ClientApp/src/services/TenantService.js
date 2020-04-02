export class TenantService {
    key = "tenant_code_id_iss";

    setTenant = (tenantCode) => localStorage.setItem(this.key, tenantCode);

    getTenant = () => localStorage.getItem(this.key);

    clearTenant = () => localStorage.removeItem(this.key);
}