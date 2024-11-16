import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { TopRightArrowIcon } from "../icons";
import { useAppDispatch } from "@/redux/hooks";
import { walletActions } from "@/redux/actions";
import { Router } from "lucide-react";
import { useRouter } from "next/router";

const FundBotSuccess = ({ txHash }: { txHash: string }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleCopyTransactionHash = () => {
    navigator.clipboard.writeText(txHash);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  const handleGoBack = () => {
    dispatch(walletActions.setWalletScreen("BALANCE"));
    router.push("/rabots");
  };

  return (
    <div className="bg-black rounded-xl w-full p-6 mb-5 ">
      <p className="text-white text-xl text-center mb-4">Fund Bot 3</p>
      <div className="text-center">
        <p className="text-white">transaction hash:</p>
        <Link
          href={`https://base.blockscout.com/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
          className="text-white"
        >
          explorer link
        </Link>
        <TopRightArrowIcon />
      </div>

      <Button
        onClick={handleCopyTransactionHash}
        className="text-[#FF5900] bg-transparent hover:bg-transparent border-none mx-auto w-full"
      >
        {isCopied ? "Copied" : "Copy to clipboard"}
      </Button>
      <Button
        onClick={handleGoBack}
        className="text-[#FF5900] bg-transparent hover:bg-transparent border-none mx-auto w-full"
      >
        Go Back
      </Button>
    </div>
  );
};

export default FundBotSuccess;
