import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CrossIcon } from "../icons";

import dummyBotImage from "@/components/icons/dummyRabotIcon.png";
import Image from "next/image";
import WithdrawInput from "./WithdrawInput";

const WithdrawModal = ({ rabotData }: { rabotData: any }) => {
  const amountDeposited = rabotData?.userBotDepositedAmount;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          // disabled={parseFloat(amountDeposited ?? "0") <= 0}
          className="bg-[#FF5900]/10 border-2 border-[#FF5900] flex-1 rounded-xl"
        >
          Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[460px] bg-[#121212] border-none flex flex-col">
        <div className="mb-3 flex items-center justify-between w-full ">
          <h1 className="text-xl text-[#FF5900] font-medium">Withdraw Funds</h1>
          <CrossIcon className="cursor-pointer" />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <Image src={dummyBotImage} alt="rabot-img" className="w-12 h-12" />
          <p className="text-white text-xl">{rabotData?.name}</p>
        </div>

        <WithdrawInput rabotData={rabotData} />
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawModal;
