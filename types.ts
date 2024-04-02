export interface Product {
  id: string;
  name: string;
  price: number;
  isArchived: boolean;
  roomNumber: number[];
  type: string;
  createdAt: Date;
  bookings?: Booking[];
  images: string[];
}

export interface Image {
  id: string;
  url: string;
  createdAt: Date;
}

export interface Booking {
  id: string;
  bookedFrom: string;
  bookedTo: string;
  roomNumber: number;
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bookings: Booking[];
}
