import React from "react";
import { CopyIcon } from "../icons";
import WalletBalance from "./WalletBalance";
import WalletAssets from "./WalletAssets";
import FundBot from "./FundBot";

const Wallet = () => {
  return (
    <div className="bg-[#121212] rounded-md py-6 px-3 min-w-96">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl text-white">Wallet</h1>
        <div className="flex items-center gap-1 ">
          <p className="text-white/40 text-sm">1Lbcfr7sAHTD9Cgd...</p>
          <CopyIcon className="text-white/40 cursor-pointer" />
        </div>
      </div>

      <FundBot />
    </div>
  );
};

export default Wallet;
