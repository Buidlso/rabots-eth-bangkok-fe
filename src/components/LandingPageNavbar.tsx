import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logooo.svg";
import { buttonVariants } from "./ui/button";

export const LandingPageNavbar = () => {
  return (
    <div className="px-6 py-4 my-10 mx-auto border border-[#3A3A3A] rounded-[10px] bg-[#1d1d1d86] flex items-center justify-between w-3/4">
      {/* logo */}
      <Link className="logo flex items-center gap-2" href={"/"}>
        <Image
          src={logo}
          alt="logo"
          className="w-8"
        />
        <div className="text-white text-lg font-semibold">rabots</div>
      </Link>

      {/* cta */}
      <Link
        href="/main"
        className={cn(buttonVariants({size: 'sm'}), "bg-white text-accent")}
      >
        Launch App
      </Link>
    </div>
  );
};
