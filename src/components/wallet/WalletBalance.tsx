import React from "react";
import WalletAssets from "./WalletAssets";
import { useGetWalletBalances } from "@/server/api/wallet";

const WalletBalance = ({ walletAddress }: { walletAddress: string }) => {
  const { data: walletBalance } = useGetWalletBalances(walletAddress);

  return (
    <div className="flex flex-col items-center w-full gap-3">
      <div className="bg-black rounded-xl py-6 text-center flex flex-col items-center justify-center w-full">
        <h1 className="text-5xl text-white">
          ${parseFloat(walletBalance?.totalBalanceUsd)?.toFixed(3)}
        </h1>
        <p className="text-white/40 text-sm">Total balance</p>
      </div>
      <WalletAssets walletBalance={walletBalance} />
    </div>
  );
};

export default WalletBalance;
