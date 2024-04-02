import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

function extractRoomNumbers(roomNumbersString: string | undefined): number[] {
  if (!roomNumbersString) return []; // If input is undefined, return an empty array

  // Split the string by commas and spaces, and trim any extra spaces
  const roomNumbersArray = roomNumbersString
    .split(",")
    .flatMap((roomNumber) =>
      roomNumber.split(" ").map((num) => parseInt(num.trim(), 10))
    );

  // Filter out any NaN values and return the result
  return roomNumbersArray.filter((roomNumber) => !isNaN(roomNumber));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, isArchived, roomNumber, type, images } = body;
    if (!name) {
      return new NextResponse(JSON.stringify({ message: "name is required" }), {
        status: 400,
      });
    }

    const imageURLs = images.map((image: { url: string }) => image.url);
    const roomNumbersArray = extractRoomNumbers(roomNumber);
    // Check if a product of this type already exists
    const existingProduct = await prismadb.product.findFirst({
      where: {
        type: type,
      },
    });

    if (existingProduct) {
      return new NextResponse(
        JSON.stringify({ message: "Product type already exists" }),
        {
          status: 400,
        }
      );
    }

    const newProduct = await prismadb.product.create({
      data: {
        name: name,
        price: price,
        isArchived: isArchived,
        roomNumber: roomNumbersArray,
        type: type,
        images: imageURLs,
      },
    });


    // Return success response
    return NextResponse.json(newProduct);
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
