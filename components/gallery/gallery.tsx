"use client";

import Image from "next/image";
import { Tab } from "@headlessui/react";
import React from "react";
import GalleryTab from "./gallery-tab";

interface ImageType {
  url: string;
  alt: string;
}
interface GalleryProps {
  images: ImageType[];
  price: number;
}
const Gallery: React.FC<GalleryProps> = ({ images, price }) => {
  return (
    <div className="md-grid">
      <Tab.Group as="div" className="flex flex-col-reverse mb-4">
        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
          <Tab.List className="grid grid-cols-4 gap-6">
            {images.map((image) => (
              <GalleryTab key={image.url} images={image} />
            ))}
          </Tab.List>
        </div>
        <Tab.Panels className={"aspect-square w-full"}>
          {images.map((image) => (
            <Tab.Panel key={image.url}>
              <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
                <Image
                  fill
                  src={image.url}
                  alt="Image"
                  className="object-cover object-center"
                />
              </div>
            </Tab.Panel>
          ))}{" "}
        </Tab.Panels>
      </Tab.Group>
      <div className="text-blueGray-500 bg-transparent border border-solid border-blueGray-500 text-lg px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
        <span>
          <span>Home away from home at just </span>
          <span className="font-bold  text-lg "> Rs.{price}/- </span>
          <span> per hour.</span>
        </span>
      </div>
    </div>
  );
};

export default Gallery;
