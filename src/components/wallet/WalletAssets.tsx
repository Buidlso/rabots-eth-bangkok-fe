import React from "react";
import { FilterIcon, RefreshIcon } from "../icons";
import { useGetBlockchainLogo } from "@/lib/useGetBlockchainLogo";
import { useGetTokenLogo } from "@/lib/useGetTokenLogo";

const WalletAssets = ({ walletBalance }: { walletBalance: any }) => {
  return (
    <div className="bg-black rounded-md px-6 py-6 w-full">
      <div className="flex items-center justify-between">
        <h4 className="text-white text-lg">Assets</h4>
        <div className="flex items-center gap-3">
          <RefreshIcon className="text-white/40 cursor-pointer" />
          <div className="bg-[#121212] rounded-full py-1 px-2 flex items-center gap-2 cursor-pointer">
            <p className="text-white">All</p>
            <FilterIcon className="text-muted" />
          </div>
        </div>
      </div>
      {walletBalance?.assets?.map((asset: any, index: number) => {
        const blockchainLogo = useGetBlockchainLogo({
          blockchain: asset?.blockchain,
        });
        const tokenLogo = useGetTokenLogo({
          token: asset?.tokenSymbol,
        });

        return (
          <div
            key={index}
            className={`flex items-center justify-between py-3 
              ${index < walletBalance?.assets.length -1 && "border-b"}
               border-[#3A3A3A]/60`}
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                {tokenLogo && (
                  <img src={tokenLogo.src} className="w-6 aspect-square" />
                )}
                {blockchainLogo && (
                  <img
                    src={blockchainLogo.src}
                    className="absolute bottom-0 right-0 w-3 aspect-square bg-white rounded-full p-1"
                  />
                )}
              </div>
              <p className="text-white">{asset.tokenSymbol}</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-white">
                ${parseFloat(asset.balanceUsd)?.toFixed(3)}
              </p>
              <p className="text-white text-sm">
                {parseFloat(asset.balance)?.toFixed(3)}
                {asset.tokenSymbol}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WalletAssets;
