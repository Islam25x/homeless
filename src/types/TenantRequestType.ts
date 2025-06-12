export interface TenantRequest {
    id: number;
    tenantName: string;
    image?: string;
    createAt: string;
    rentId: number;
    requirmentDocument: string[]
    tenantImage:string
}