"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "../ui/cell-actions";

export type ProductColumn = {
  id: string;
  name: string;
  isArchived: boolean;
  price: string;
  bookings?: string; // Using the Booking interface here
  createdAt?: string;
};

interface Booking {
  id: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  bookedFrom: Date;
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
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
