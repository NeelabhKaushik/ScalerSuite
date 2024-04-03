import prismadb from "@/lib/prismadb";
import { id } from "date-fns/locale";

export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url);
    const body = await req.json();
    // Extract parts of the pathname using split() method
    const parts = url.pathname.split("/");
    // Get the second-to-last part
    const secondToLastPart = parts[parts.length - 2];

    // console.log(secondToLastPart); // Output: bookings

    // Assuming prismadb is your database connection
    const booking = await prismadb.booking.findUnique({
      where: {
        id: secondToLastPart,
      },
    });

    if (booking) {
      const userId = booking.userId;

      const updatedUser = await prismadb.user.update({
        where: {
          userId: userId,
        },
        data: {
          email: body.email,
        },
      });

      if (updatedUser) {
        return new Response(
          JSON.stringify({ success: 1, message: "User Updated" }),
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({ success: 0, error: "Failed to update user" }),
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: 0, error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
