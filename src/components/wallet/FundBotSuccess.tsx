import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { TopRightArrowIcon } from "../icons";

const FundBotSuccess = ({txHash}: {txHash: string}) => {
  return (
    <div className="bg-black rounded-xl w-full p-6 mb-5 ">
      <p className="text-white text-xl text-center mb-4">Fund Bot 3</p>
      <div className="text-center">
        <p className="text-white">transaction hash:</p>
        <Link
            href={`https://base.blockscout.com/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          explorer link
        </Link>
        <TopRightArrowIcon />
      </div>

      <Button className="text-[#FF5900] bg-transparent hover:bg-transparent border-none mx-auto w-full">
        Copy to clipboard
      </Button>
    </div>
  );
};

export default FundBotSuccess;
