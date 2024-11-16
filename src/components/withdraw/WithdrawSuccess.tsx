import React from "react";
import { CheckIcon, TopRightArrowIcon } from "../icons";
import dummyBotImage from "@/components/icons/dummyRabotIcon.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const WithdrawSuccess = ({ transactionHash }: { transactionHash: string }) => {
  const shortenTransactionHash = (transactionHash: string) => {
    const firstPart = transactionHash.slice(0, 6);
    const lastPart = transactionHash.slice(-4);
    return `${firstPart}...${lastPart}`;
  };

  return (
    <div className="text-center">
      <div className="text-[#FF5900] flex items-center justify-center gap-3 mb-9">
        <CheckIcon />
        <h1 className="text-lg">Funds Withdraw</h1>
      </div>
      <div className="flex items-center justify-center gap-3 mb-6">
        <Image src={dummyBotImage} alt="bot-image" className="w-10 h-10" />
        <p className="text-lg text-white font-light">Renzo-bot</p>
      </div>
      <p className="text-4xl text-white mb-7">0.01935 eth</p>
      <div className="flex items-center gap-1 mb-6  justify-center font-light">
        <p className="text-white">transaction hash:</p>
        <p className="text-white/40">
          {shortenTransactionHash(transactionHash)}
        </p>
      </div>
      <hr className="w-full border-white/40 mb-3" />
      <div className=" flex items-center justify-center gap-6 mb-9 ">
        <div className="explorer-link">
          <p className="text-white">View transaction</p>
          <div className="text-[#FF5900] flex items-center gap-2">
            <Link
              href={`https://base.blockscout.com/tx/${transactionHash}`}
              target="_blank"
              rel="noreferrer"
            >
              explorer link
            </Link>
            <TopRightArrowIcon />
          </div>
        </div>
      </div>
      <Button className="text-black bg-[#FF5900] rounded-full w-full text-lg h-11 hover:bg-[#FF5900]">
        Close
      </Button>
    </div>
  );
};

export default WithdrawSuccess;
