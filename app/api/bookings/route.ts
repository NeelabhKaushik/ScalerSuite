import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { dates, name, email, guests, roomNo, fromTime, toTime, productId } =
      body;

    const fromDate = new Date(dates.from);
    const toDate = new Date(dates.to);

    const FromTime = fromTime;
    const ToTime = toTime;

    // Combine dates and times
    const combinedFromDate = new Date(
      fromDate.getFullYear(),
      fromDate.getMonth(),
      fromDate.getDate(),
      FromTime.hour,
      FromTime.minute,
      FromTime.second,
      FromTime.millisecond
    );

    const combinedToDate = new Date(
      toDate.getFullYear(),
      toDate.getMonth(),
      toDate.getDate(),
      ToTime.hour,
      ToTime.minute,
      ToTime.second,
      ToTime.millisecond
    );

    const newBooking = await prismadb.booking.create({
      data: {
        product: {
          connect: {
            id: productId,
          },
        },
        roomNumber: parseInt(roomNo),
        bookedFrom: combinedFromDate,
        bookedTo: combinedToDate,
        guests: parseInt(guests),
        user: {
          create: {
            name: name,
            email: email,
          },
        },
      },
    });

    // Return success response
    return NextResponse.json(newBooking);
  } catch (error: any) {
    // Handle errors
    console.error(error, error.message);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}
