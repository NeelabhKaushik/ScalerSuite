import React from "react";
import Container from "./container";
import Link from "next/link";
import MainNav from "./main-nav";
import NavbarActions from "./navbar-actionst";

const Navbar = () => {
  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              SCALER SUITE
            </p>
          </Link>
          <MainNav />
          {/* <NavbarActions /> */}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
