import React from "react";
import { FilterIcon, RefreshIcon } from "../icons";
import { useGetBlockchainLogo } from "@/lib/useGetBlockchainLogo";
import { useGetTokenLogo } from "@/lib/useGetTokenLogo";

const WalletAssets = ({ walletBalance }: { walletBalance: any }) => {
  return (
    <div className="bg-black rounded-md px-3 py-6 w-full">
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
            className="flex items-center justify-between py-3 border-b border-[#3A3A3A]/60"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                {tokenLogo && (
                  <img src={tokenLogo} className="w-6 aspect-square" />
                )}
                {blockchainLogo && (
                  <img
                    src={blockchainLogo}
                    className="absolute bottom-0 right-0 w-3 aspect-square bg-white rounded-full p-1"
                  />
                )}
              </div>
              <div className="w-10 h-10 rounded-full bg-muted"></div>
              <p className="text-white">{asset.tokenSymbol}</p>
            </div>
            <div>
              <p>{parseFloat(asset.balanceUsd)?.toFixed(3)}</p>
              <p className="text-muted">
                {asset.balance} {asset.tokenSymbol}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WalletAssets;
