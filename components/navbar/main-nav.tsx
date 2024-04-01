"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MainNav = () => {
  const pathname = usePathname();
  const isAppleActive = pathname === "/admin";
  const isOrderActive = pathname === "/orders";
  return (
    <nav className="ml-auto flex items-center space-x-4">
      {" "}
      <Link
        href="/admin"
        className={cn(
          "text-sm font-medium transition-colors hover:text-black",
          isAppleActive ? "text-black" : "text-neutral-500"
        )}
      >
        Admin
      </Link>
      <Link
        href="/orders"
        className={cn(
          "text-sm font-medium transition-colors hover:text-black",
          isOrderActive ? "text-black" : "text-neutral-500"
        )}
      >
        Orders
      </Link>
    </nav>
  );
};

export default MainNav;
