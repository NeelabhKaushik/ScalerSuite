import Container from "@/components/navbar/container";
import Gallery from "@/components/gallery/gallery";
import Productlist from "@/components/product/productlist";
import { db } from "@/lib/db";
import React from "react";
import Info from "@/components/gallery/info";

interface ProductPageProps {
  params: {
    productId: string;
  };
}
const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await db.product.findFirst({
    where: {
      id: params.productId,
    },
  });

    const suggestedProducts = await db.product.findMany({
      where: {
        type: product?.type,
      },
    });
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Gallery  */}
            {product && (
              <Gallery images={product.images} />
            )}

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              {/* Info */}
              {product && (
                <Info data={product} />
              )}
            </div>
          </div>
          <hr className="my-10" />
          <Productlist
            title="Similar Rooms"
            items={suggestedProducts}
          ></Productlist>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
