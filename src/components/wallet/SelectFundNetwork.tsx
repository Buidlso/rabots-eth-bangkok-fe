"use client";

import React, { useState } from "react";
import { CrossIcon, FilterIcon, RefreshIcon } from "../icons";
import { net } from "web3";
import { Button } from "../ui/button";

interface Network {
  id: string;
  name: string;
  balance: string;
  ethBalance: string;
}

const SelectFundNetwork = () => {
  const networks: Network[] = [
    { id: "eth", name: "Eth", balance: "71.8", ethBalance: "0.0910" },
    { id: "btc", name: "Bitcoin", balance: "71.8", ethBalance: "0.0910" },
    { id: "bnb", name: "Binance", balance: "71.8", ethBalance: "0.0910" },
    { id: "sol", name: "Solana", balance: "71.8", ethBalance: "0.0910" },
  ];

  const [activeNetwork, setActiveNetwork] = useState<string>("");

  const handleNetworkSelect = (networkId: string) => {
    setActiveNetwork(networkId);
  };

  return (
    <div>
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

      <div className="bg-black rounded-xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[#FF5900] text-base">Select crypto currencry</h2>
          {/* <CrossIcon className="" /> */}
        </div>
        <div className="space-y-3">
          {networks.map((network, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-between w-full border-b border-white/10 py-2"
            >
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => handleNetworkSelect(network.id)}
              >
                <div
                  className={`w-4 h-4 bg-transparent rounded-full border  ${
                    activeNetwork === network.id
                      ? "border-[#FF5900]"
                      : "border-white"
                  } flex items-center justify-center`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activeNetwork === network.id
                        ? "bg-[#FF5900]"
                        : "bg-transparent"
                    }`}
                  ></div>
                </div>
                {/* LOGO */}
                <div className="w-10 h-10 bg-slate-600 rounded-full"></div>
                <div className="text-white">
                  <p>{network.name}</p>
                  <p>{network.ethBalance}</p>
                </div>
              </div>
              <p className="text-white">${network.balance}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectFundNetwork;
