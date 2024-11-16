import React from "react";
import { Button } from "../ui/button";

const FundBotSuccess = () => {
  return (
    <div className="bg-black rounded-xl w-full p-6 mb-5 ">
      <p className="text-white text-xl text-center mb-4">Fund Bot 3</p>
      <div className="text-center">
        <p className="text-white">transaction hash:</p>
        <p className="text-white/40">398439389483998839kjfjief</p>
      </div>
      <Button className="text-[#FF5900] bg-transparent hover:bg-transparent border-none mx-auto w-full">
        Copy to clipboard
      </Button>
    </div>
  );
};

export default FundBotSuccess;
