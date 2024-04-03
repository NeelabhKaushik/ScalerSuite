import Container from "@/components/navbar/container";
import Gallery from "@/components/gallery/gallery";
import { db } from "@/lib/db";
import React from "react";
import Info from "@/components/gallery/info";
// import { useRouter } from "next/router";
// import { useRouter } from "next/router";

interface ProductPageProps {
  params: {
    product: string;
  };
}

interface ImageType {
  url: string;
  alt: string;
}
const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await db.product.findFirst({
    where: {
      id: params.product,
    },
  });

  const imageObjects: ImageType[] = product
    ? product?.images.map((imageUrl) => ({
        url: imageUrl,
        alt: "Image Alt Text", // Provide appropriate alt text here
      }))
    : [];
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Gallery  */}
            {product && (
              <Gallery images={imageObjects} price={product?.price} />
            )}

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              {/* Info */}
              {product && <Info data={product} />}
            </div>
          </div>
          <hr className="my-10" />
          {/* <Productlist
            title="Similar Rooms"
            items={suggestedProducts}
          ></Productlist> */}
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
