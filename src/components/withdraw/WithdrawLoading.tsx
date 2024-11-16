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
