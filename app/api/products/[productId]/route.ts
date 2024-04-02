import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

function extractRoomNumbers(roomNumbersString: string) {
  // Split the string by commas and trim each substring
  const roomNumbersArray = roomNumbersString
    .split(",")
    .map((roomNumber) => roomNumber.trim());

  // Parse each substring into an integer
  const roomNumbersInt = roomNumbersArray.map((roomNumber) =>
    parseInt(roomNumber, 10)
  );

  return roomNumbersInt;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, isArchived, roomNumber, type, images } = body;
    // if(!name){
    //     return new NextResponse({status: 400, body: {message: "Name is required"}});
    // }

    const roomNumbers = extractRoomNumbers(roomNumber);
    const typeExist = await prismadb.product.findMany({
      where: {
        type: type,
      },
    });

    console.log(roomNumbers);
    const newProduct = await prismadb.product.create({
      data: {
        name: name,
        price: price,
        isArchived: isArchived,
        roomNumber: roomNumbers,
        type: type,
        images: images,
      },
    });

    console.log(newProduct);
  } catch (error) {
    console.log(error);
  }
}
