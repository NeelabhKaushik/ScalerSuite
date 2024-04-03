import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { dates, name, email, guests, roomNo, productId } = body;

    var nodemailer = require("nodemailer");

    var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kaushikaakash234@gmail.com",
        pass: "mvijkoujgclmchki",
      },
    });

    var mailOptions = {
      from: "ScalerSuites <kaushikaakash234@gmail.com>",
      to: email,
      subject: `Booking Confirmation for Dear ${name}`,
      text: `\n\nWe are delighted to confirm your booking with us at ScalerSuite. Your reservation details are as follows:\n\nBooking Reference: 10010\nName: ${name}\nEmail: ${email}\n From Date: ${dates.from} \n To Date: ${dates.to}\nNumber of Guests: ${guests}\nRoom Number: ${roomNo}\nProduct ID: ${productId}\n\nThank you for choosing to stay with us. We look forward to providing you with a comfortable and enjoyable experience during your visit. Should you have any further questions or requests, please do not hesitate to contact us at scalersuite@gmail.com.\n\nWarm regards,\n\nScalerSuite\n[scalersuite@gmail.com]`,
    };

    const newBooking = await prismadb.booking.create({
      data: {
        product: {
          connect: {
            id: productId,
          },
        },
        roomNumber: parseInt(roomNo),
        bookedFrom: dates.from,
        bookedTo: dates.to,
        guests: parseInt(guests),
        user: {
          create: {
            name: name,
            email: email,
          },
        },
      },
    });

    transport.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
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
