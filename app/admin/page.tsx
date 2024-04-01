import { ProductsClient } from "@/components/product/productClient";
import { ProductColumn } from "@/components/product/productColums";
import prismadb from "@/lib/prismadb";
import { formatDateTime, formatter } from "@/lib/utils";
import React from "react";

const page = async () => {
  const products = await prismadb.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const productt = [
    {
      id: "1",
      name: "Deluxe Room",
      price: 100,
      isArchived: false,
      createdAt: "2024-04-01T08:00:00.000Z",
      bookings: [],
      images: [
        {
          id: "1",
          url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1117210179713518752/original/c4f81f01-c543-4660-9bdd-953d29d1b116.jpeg?im_w=1200",
          createdAt: "2024-04-01T08:00:00.000Z",
        },
        {
          id: "2",
          url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1117210179713518752/original/18fe28a4-77d0-4ad1-acc7-0928e5b311e5.jpeg?im_w=720",
          createdAt: "2024-04-01T08:00:00.000Z",
        },
      ],
    },
  ];

  const formattedProducts: ProductColumn[] = productt.map((product) => ({
    id: product.id,
    name: product.name,
    isArchived: product.isArchived,
    price: formatter.format(product.price),
    bookings:
      product.bookings.length > 0
        ? product.bookings.length.toString()
        : "No bookings",
    createdAt: formatDateTime(product.createdAt),
  }));
  console.log(formattedProducts);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default page;
