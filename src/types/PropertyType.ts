export interface Property {
    id: number;
    createAt: string;
    title:string;
    description: string;
    landlordId: number;
    landlordImage: string | null;
    landlordName: string;
    location: string;
    mainImage: string;
    price: number;
    status: string;
    views:number;
    propertyApproval: 'pending' | 'accepted' | 'rejected';
    propertyImages: {
        image: string;
    }[];
}