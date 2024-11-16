import Image from "next/image";
import React from "react";
import loading from "../../../public/loading.svg";
import { RabotIcon } from "../icons";
import { Button } from "../ui/button";

const WithdrawLoading = () => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-6">
        <RabotIcon className="text-[#FF5900] absolute" />
        <Image src={loading} alt="loading" className="animate-spin relative" />
      </div>

      <p className="text-white text-4xl mb-3 font-medium">0.01945 eth</p>
      <div className="flex items-center gap-1 mb-6  justify-center">
        <p className="text-white">Wallet:</p>
        <p className="text-white/40">734923bkbk374234jdsfkdhfdsfj</p>
      </div>

      <Button
        disabled
        className="text-black bg-[#FF5900] rounded-full w-full text-lg h-11 hover:bg-[#FF5900]"
      >
        Loading
      </Button>
    </div>
  );
};

export default WithdrawLoading;
