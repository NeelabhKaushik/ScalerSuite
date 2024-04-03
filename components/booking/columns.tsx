"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "../ui/cell-actions";
import { User } from "lucide-react";
import { ProductColumn } from "../product/productColums";
import { BookingCellAction } from "./booking-cell-actions";

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
interface User {
  name: string;
  email: string;
}

export interface BookingColumn {
  id: string;
  productId: string;
  productName: string;
  roomNumber: number;
  bookedFrom: string;
  bookedTo: string;
  createdAt: string;
  guests: number;
  isCancelled: boolean;
  type: string;
  username: string;
  email: string;
  bookingPrice: number;
  deletedAt?: Date;
}

export const columns: ColumnDef<BookingColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "productName",
    header: "Room Name",
  },
  {
    accessorKey: "roomNumber",
    header: "Room Number",
  },
  {
    accessorKey: "username",
    header: "Guest Name",
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "guests",
    header: "Guests",
  },
  {
    accessorKey: "bookingPrice",
    header: "Amount Paid (in Rs.)",
  },
  {
    accessorKey: "bookedFrom",
    header: "Booked From",
  },
  {
    accessorKey: "bookedTo",
    header: "Booked Till",
  },

  {
    accessorKey: "createdAt",
    header: "Booked On",
  },
  {
    accessorKey: "isCancelled",
    header: "Cancelled",
  },
  {
    id: "actions",
    cell: ({ row }) => <BookingCellAction data={row.original} />,
  },
];
