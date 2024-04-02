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

  interface ProductColumn {
    id: string;
    name: string;
    isArchived: boolean;
    price: string;
    createdAt: Date;
    roomNumber: number[];
    type: string;
    images: string[]; // Adjusted type for images
  }

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    isArchived: product.isArchived,
    price: formatter.format(parseFloat(product.price.toString())),
    createdAt: product.createdAt,
    roomNumber: product.roomNumber,
    type: product.type,
    images: [] || product.images.map((image: string) => ({ url: image })), // Adjusted images property
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default page;
