import prismadb from "@/lib/prismadb";
import { id } from "date-fns/locale";

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);;

    // Extract parts of the pathname using split() method
    const parts =url.pathname.split("/");
    // Get the second-to-last part
    const secondToLastPart = parts[parts.length - 2];

    console.log(secondToLastPart); // Output: bookings

    // Assuming prismadb is your database connection

    const roomDelete = await prismadb.booking.update({
      where: {
        id: secondToLastPart,
      },
      data: {
        isCancelled: true,
        deletedAt: new Date(),
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
