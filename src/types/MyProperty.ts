export type MyProperty = {
    rentId: number;
    rentStatus: 'pending' | 'accepted' | 'rejected'; 
    status: 'available' | 'rented' | 'unavailable'; 
    requestCreateAt: string; 
    propertyId: number;
    propertyTitle: string;
    propertyMainImage: string; 
    propertyImages: { url: string }[]; 
    propertyCreateAt: string;
    description: string;
    location: string;
    price: number;
    title: string;
    landlordId: number;
    landlordName: string;
    landlordImage: string | null;
    tenantName: string;
};
