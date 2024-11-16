"use client";

import Sidebar from "@/components/Sidebar";
import React from "react";
import Wallet from "@/components/wallet/Wallet";
import Transactions from "./Transactions";

const page = () => {
  return (
    <div className="flex items-stretch justify-center p-10 h-screen gap-10 ">
      <Sidebar />
      <Transactions />
      {/* <Wallet /> */}
    </div>
  );
};

export default page;
