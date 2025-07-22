"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Building2, HelpCircle, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigation } from "@/constant/constant";

type Props = {
  openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="w-[90%] mx-auto ">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Building2 className="sm:h-8 sm:w-8 w-6 h-6 text-blue-600" />
            <span className="sm:text-xl text-lg font-bold text-gray-900">
              BankReview
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 lg:space-x-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-1 px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors duration-200 whitespace-nowrap
                    ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                >
                  <Icon className="h-3 w-3 lg:h-4 lg:w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <Link
              href="/want-to-know"
              className="lg:flex hidden items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left"
            >
              <HelpCircle className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="text-xs lg:text-sm font-medium whitespace-nowrap">
                Want to Know
              </span>
            </Link>
            <Button size={"lg"} className="cursor-pointer">
              SignUp
            </Button>
            <MenuIcon
              onClick={openNav}
              className="w-7 h-7 cursor-pointer lg:hidden"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
