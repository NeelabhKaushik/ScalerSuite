"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "../ui/cell-actions";

interface Booking {
  id: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  bookedFrom: Date;
  guests: number;
  bookedTo: Date;
  roomNumber: number;
  userId: string;
  user?: User;
}

export interface ProductColumn {
  id: string;
  name: string;
  isArchived: boolean;
  roomNumber: number[];
  type: string;
  price: string;
  bookings?: Booking[]; // Using the Booking interface here
  createdAt?: Date;
  images: string[];
}
interface Image {
  id: string;
  url: string;
  createdAt: Date;
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
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "booking",
    header: "Bookings",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "roomNumber",
    header: "Room Numbers",
  },
  {
    accessorKey: "type",
    header: "Type",
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
  