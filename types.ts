export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    isArchived: boolean;
    createdAt: string;
    bookings: Booking[]
    images: Image[];
}

export interface Image {
    id: string;
    url: string;
}

export interface Booking {
    id: string;
    bookedFrom: string;
    bookedTo: string;
    user: User;
}

export interface User {
    id: string;
    name: string;
    email: string;
    bookings: Booking[];
}