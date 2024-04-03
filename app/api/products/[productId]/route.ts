import prismadb from "@/lib/prismadb";

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const pathnameParts = url.pathname.split("/");
    const productId = pathnameParts[pathnameParts.length - 1];

    // Assuming prismadb is your database connection
    const roomDelete = await prismadb.product.delete({
      where: {
        id: productId,
      },
    });
    if (roomDelete) {
      return new Response(
        JSON.stringify({ success: 1, message: "Product deleted successfully" }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ success: 0, error: "Failed to delete product" }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: 0, error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url);
    const pathnameParts = url.pathname.split("/");
    const productId = pathnameParts[pathnameParts.length - 1];
    const body = await req.json();
    const { name, price, isArchived, roomNumber, type, images } = body;
    const imageURLs = images.map((image: { url: string }) => image.url);
    const roomNumbersArray = extractRoomNumbers(roomNumber);
    // Assuming prismadb is your database connection

    const updated = await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        price,
        isArchived,
        roomNumber: roomNumbersArray,
        type,
        images: imageURLs,
      },
    });
    if (updated) {
      return new Response(
        JSON.stringify({ success: 1, message: "Room updated successfully" }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ success: 0, error: "Failed to update room" }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: 0, error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

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
