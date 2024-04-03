"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "../ui/cell-actions";

export type ProductColumn = {
  id: string;
  name: string;
  isArchived: boolean;
  roomNumber: number[];
  type: string;
  price: string;
  bookings?: Booking[]; // Using the Booking interface here
  createdAt?: Date;
  images: string[];
};

export interface Image {
  id: string;
  url: string;
  createdAt: Date;
}

interface Booking {
  id: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  bookedFrom: Date;
  guests: number;
  roomNumber: number;
  bookedTo: Date;
  userId: string;
  user?: User;
}

interface User {
  userId: string;
  name: string;
  email: string;
  bookings?: Booking[]; // Assuming Booking interface or type is also defined
}
export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "booking",
    header: "Bookings",
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "roomNumber",
    header: "Room Numbers",
  },

  {
    accessorKey: "isArchived",
    header: "On Maintainence",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
