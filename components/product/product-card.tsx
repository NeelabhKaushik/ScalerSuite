"use client";

import { Product } from "@/types";
import Image from "next/image";
import React from "react";
import IconButton from "../ui/icon-button";
import { Expand, HotelIcon } from "lucide-react";
import Currency from "../ui/currency";
import { useRouter } from "next/navigation";

interface ProductCard {
  data: Product;
}
const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const router = useRouter();

  const handelClick = () => {
    router.push(`/product/${data?.id}`);
  };
  return (
    <div
      onClick={handelClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data?.images?.[0]}
          alt="Image"
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={() => {
                handelClick();
              }}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={() => {}}
              icon={<HotelIcon size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p>{data.name}</p>
        <p className="text-sm text-gray-500">
          <span className="text-semibold"> Type: </span>
          {data.type}
        </p>
      </div>
      {/* price  */}

      <div className="flex items-center justify-between">
        <Currency value={data.price} />
      </div>
    </div>
  );
};

export default ProductCard;
