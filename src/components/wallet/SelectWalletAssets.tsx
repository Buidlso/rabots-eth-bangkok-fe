import React from "react";
import { FilterIcon, RefreshIcon } from "../icons";
import { useGetBlockchainLogo } from "@/lib/useGetBlockchainLogo";
import { useGetTokenLogo } from "@/lib/useGetTokenLogo";
import Image from "next/image";

const SelectWalletAssets = ({
  walletBalance,
  setSelectedToken,
  selectedToken,
}: {
  walletBalance: any;
  setSelectedToken: (asset: any) => void;
  selectedToken: {
    token?: string;
    network?: string;
  };
}) => {
  const handleSelectToken = (asset: any) => {
    setSelectedToken({
      token: asset?.tokenSymbol,
      network: asset?.blockchain,
    });
  };

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

        const isSelectedToken =
          selectedToken.token === asset?.tokenSymbol &&
          selectedToken.network === asset?.blockchain;

        return (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-[#3A3A3A]/60"
          >
            <div
              className="flex items-center gap-2"
              onClick={() => handleSelectToken(asset)}
            >
              <div
                className={`w-3 h-3 border-[1px] rounded-full border-white ${
                  isSelectedToken && "bg-white"
                }`}
              ></div>

              <div className="relative">
                {tokenLogo && (
                  <Image
                    alt="logo"
                    src={tokenLogo}
                    className="w-6 aspect-square"
                  />
                )}
                {blockchainLogo && (
                  <Image
                    alt="logo"
                    src={blockchainLogo}
                    className="absolute bottom-0 right-0 w-3 aspect-square bg-white rounded-full p-1"
                  />
                )}
              </div>
              <p className="text-white">{asset.tokenSymbol}</p>
            </div>
            <div>
              <p className="text-white">
                {parseFloat(asset.balanceUsd)?.toFixed(3)}
              </p>
              <p className="text-white">
                {asset.balance} {asset.tokenSymbol}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectWalletAssets;
