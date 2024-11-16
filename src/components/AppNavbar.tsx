"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logooo.svg";
import { Button, buttonVariants } from "./ui/button";

export const AppNavbar = () => {
  const [wallet, setWallet] = React.useState<any>(null);
  const [isCopied, setIsCopied] = React.useState(false);

  useEffect(() => {
    const ethWalletAddress = localStorage.getItem("ethWalletAddress");
    const ethPrivateKey = localStorage.getItem("ethPrivateKey");
    setWallet({
      ethWalletAddress,
      ethPrivateKey,
    });
  }, []);

  const shortenWalletAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleCopyWalletAddress = () => {
    if (!wallet?.ethWalletAddress) return;
    navigator.clipboard.writeText(wallet?.ethWalletAddress);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div className="px-6 py-4 my-4 border border-[#3A3A3A] rounded-[10px] bg-[#1d1d1d86] flex items-center justify-between mx-10">
      {/* logo */}
      <Link className="logo flex items-center gap-2" href={"/"}>
        <Image src={logo} alt="logo" className="w-8" />
        <div className="text-white text-lg font-semibold">rabots</div>
      </Link>

      {!!wallet?.ethWalletAddress && (
        <Button onClick={handleCopyWalletAddress}>
          {isCopied ? "Copied" : shortenWalletAddress(wallet?.ethWalletAddress)}
        </Button>
      )}
    </div>
  );
};
