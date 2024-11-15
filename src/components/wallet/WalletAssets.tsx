import React from "react";
import { FilterIcon, RefreshIcon } from "../icons";

type TDummyAssets = {
  network: string;
  name: string;
  networkBalance: number;
  dollorBalance: number;
};

const dummyAssets = [
  {
    network: "Ethereum",
    name: "ETH",
    networkBalance: 0.0012,
    dollorBalance: 1.12,
  },
  {
    network: "Polygon",
    name: "MATIC",
    networkBalance: 0.0012,
    dollorBalance: 1.12,
  },
  {
    network: "Solana",
    name: "SOL",
    networkBalance: 0.0012,
    dollorBalance: 1.12,
  },
];

const WalletAssets = () => {
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

      {dummyAssets.map((asset: TDummyAssets, index: number) => (
        <div
          key={index}
          className="flex items-center justify-between py-3 border-b border-[#3A3A3A]/60"
        >
          <div className="flex items-center gap-2">
            {/* IMAGE HERE OF BLOCKCHAIN */}
            <div className="w-10 h-10 rounded-full bg-muted"></div>
            <p className="text-white">{asset.name}</p>
          </div>
          <div>
            <p>${asset.dollorBalance}</p>
            <p className="text-muted">{asset.networkBalance}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WalletAssets;
