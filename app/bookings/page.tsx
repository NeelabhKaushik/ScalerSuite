import { BookingClient } from "@/components/booking/booking-client";
import { db } from "@/lib/db";
import React from "react";

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
  username: string;
  email: string;
  guests: number;
  type: string;
  bookingPrice: number;
  isCancelled: boolean;
  deletedAt?: Date;
}

const page = async () => {
  const bookings = await db.booking.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      product: true,
    },
  });
  function calculateHourGap(
    fromDate: Date | undefined,
    toDate: Date | undefined
  ): number {
    // Calculate the difference in milliseconds between the two dates

    if (!fromDate || !toDate) {
      return 0;
    }
    const timeDifferenceMs: number = toDate.getTime() - fromDate.getTime();

    // Convert milliseconds to hours
    const hourGap: number = timeDifferenceMs / (1000 * 60 * 60);

    return hourGap;
  }

  const formattedBookings: BookingColumn[] = bookings.map((booking) => ({
    id: booking.id,
    productId: booking.productId,
    productName: booking.product?.name,
    roomNumber: booking.roomNumber,
    bookedFrom: new Date(booking.bookedFrom).toLocaleString("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }),
    bookedTo: new Date(booking.bookedTo).toLocaleString("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }),
    createdAt: new Date(booking.createdAt).toLocaleDateString(),
    guests: booking.guests,
    userId: booking.userId,
    username: booking.user?.name || "",
    email: booking.user?.email || "",
    type: booking.product?.type || "",
    isCancelled: booking.isCancelled,
    bookingPrice:
      booking.product?.price *
      Math.floor(calculateHourGap(booking.bookedFrom, booking.bookedTo))
      ,
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BookingClient data={formattedBookings} />
      </div>
    </div>
  );
};

export default page;
