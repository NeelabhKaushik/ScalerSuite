import { db } from "@/lib/db";

export async function GET() {
  const results = await db.product.findMany({
    where: {
      isArchived: false,
    },
  });

  return new Response(JSON.stringify(results));
}
