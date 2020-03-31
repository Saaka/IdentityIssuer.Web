export class TenantService {
    key = "tenant_code_id_iss";

    setTenant = (tenant) => localStorage.setItem(this.key, tenant);

    getTenant = () => localStorage.getItem(this.key);

    clearTenant = () => localStorage.removeItem(this.key);
}