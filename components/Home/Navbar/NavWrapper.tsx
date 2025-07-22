"use client";
import React, { useState } from "react";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const NavWrapper = () => {
  const [showNav, setShowNav] = useState(false);
  const closeNav = () => setShowNav(false);
  const openNav = () => setShowNav(true);
  return (
    <div>
      <Nav openNav={openNav} />
      <MobileNav showNav={showNav} closeNav={closeNav} />
    </div>
  );
};

export default NavWrapper;
