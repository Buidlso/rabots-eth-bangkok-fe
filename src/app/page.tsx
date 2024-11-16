"use client";

import { LandingPageNavbar } from "@/components/LandingPageNavbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col  w-full bg-[url('../../public/bg.png')] bg-cover bg-center bg-no-repeat">
      <LandingPageNavbar />
      <div className="flex flex-col justify-center items-center w-full h-[calc(100vh-12rem)] gap-6">
        <h1 className="text-center text-[5rem] leading-none text-white font-bold tracking-tighter">
          The tools for unleashing <br /> power of crypto
        </h1>
        <p className="text-base text-white text-center max-w-[50rem]">
          Rabots are quickest way to expand how you use crypto
        </p>
        <Link
          href="/login"
          className={cn(
            buttonVariants({ size: "lg", variant: "outline" }),
            "bg-accent border-accent text-black mt-6 hover:opacity-80"
          )}
        >
          Discover Rabots
        </Link>
      </div>
    </div>
  );
}
