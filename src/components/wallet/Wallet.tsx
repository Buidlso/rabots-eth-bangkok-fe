"use client";

import React, { useEffect } from "react";
import { CopyIcon } from "../icons";
import WalletBalance from "./WalletBalance";
import WalletAssets from "./WalletAssets";
import { useUserStore, useWalletStore } from "@/redux/hooks";
import FundBot from "./FundBot";

const Wallet = () => {
  const { walletScreen } = useWalletStore();

  const [wallet, setWallet] = React.useState<any>(null);

  useEffect(() => {
    const ethWalletAddress = localStorage.getItem("ethWalletAddress");
    const ethPrivateKey = localStorage.getItem("ethPrivateKey");
    setWallet({
      ethWalletAddress,
      ethPrivateKey,
    });
  }, []);

  const shortenWalletAddress = (walletAddress: string) => {
    const firstFour = walletAddress.slice(0, 4);
    const lastFour = walletAddress.slice(-4);
    return `${firstFour}...${lastFour}`;
  };

  if (!wallet) return <p>loading...</p>;

  return (
    <div className="bg-[#121212] rounded-md py-6 px-3 min-w-96">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl text-white">Wallet</h1>
        <div className="flex items-center gap-1 ">
          <p className="text-white/40 text-sm">
            {shortenWalletAddress(wallet?.ethWalletAddress)}...
          </p>
          <CopyIcon className="text-white/40 cursor-pointer" />
        </div>
      </div>
      {walletScreen === "BALANCE" ? (
        <WalletBalance walletAddress={wallet?.ethWalletAddress} />
      ) : (
        <FundBot />
      )}
    </div>
  );
};

export default Wallet;
