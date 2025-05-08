interface PropertyImage {
    propertyImageId: number;
    image: string;
}

export interface RentalDetails {
    description: string;
    landlordId: number;
    landlordImage: string | null;
    landlordName: string;
    location: string;
    price: number;
    propertyCreateAt: string;
    propertyId: number;
    propertyImages: PropertyImage[];
    propertyMainImage: string;
    propertyTitle: string;
    rentId: number;
    rentStatus: 'accepted' | 'pending' | 'rejected';
    requestCreateAt: string;
    status: 'rented' | 'available' | 'pending';
    tenantName: string;
    title: string;
    views?: number;
    isSaved: boolean;
    isAskForRent?: boolean;
    mainImage: string; // for UI logic (same as propertyMainImage)
    createAt: string; // same as requestCreateAt, but named differently in some responses
    id: number; // same as propertyId, for component access
}