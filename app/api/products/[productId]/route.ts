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
