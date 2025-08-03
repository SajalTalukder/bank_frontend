import { navigation } from "@/constant/constant";
import { X } from "lucide-react";

import Link from "next/link";
import React from "react";

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNav = ({ closeNav, showNav }: Props) => {
  const navOpen = showNav ? "translate-x-0" : "translate-x-[-200%]";

  return (
    <div>
      {/* Overlay */}
      <div
        className={`fixed ${navOpen} top-0 inset-0 transform transition-all  duration-500 z-[100002] bg-black opacity-70 w-full h-screen`}
      ></div>
      {/* navlinks */}
      <div
        className={`text-white top-0 ${navOpen} fixed justify-center flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-gray-900 space-y-6 z-[1000050] `}
      >
        {navigation.map((link) => {
          return (
            <Link key={link.name} href={link.href} onClick={closeNav}>
              <p className="text-white w-fit text-2xl ml-12 border-b-[1.5px] pb-2 border-white sm:text-[30px]">
                {link.name}
              </p>
            </Link>
          );
        })}

        <Link
          href="/want-to-know"
          className="  text-white w-fit text-2xl ml-12 border-b-[1.5px] pb-2 border-white sm:text-[30px]"
        >
          <span className="text-xl font-medium whitespace-nowrap">
            Want to Know
          </span>
        </Link>

        {/* Close icon */}
        <X
          onClick={closeNav}
          className="absolute top-[0.7rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6"
        />
      </div>
    </div>
  );
};

export default MobileNav;
