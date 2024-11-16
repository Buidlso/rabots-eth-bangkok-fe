import React, { useState } from "react";
import ethIcon from "../../components/Icons/ethIcon.svg";
import Image from "next/image";
import SelectFundNetwork from "./SelectFundNetwork";
import FundBotError from "./FundBotError";
import FundBotSuccess from "./FundBotSuccess";
import FundBotLoading from "./FundBotLoading";
import { getInfuraRpcNetwork } from "@/lib/utils";
import { ethers } from "ethers";
import { Button } from "../ui/button";

const FundBot = () => {
  const [inputTokenAmount, setInputTokenAmount] = useState<number>(0);
  const [isFundError, setIsFundError] = useState(false);
  const [isFundSuccess, setIsFundSuccess] = useState(false);
  const [isFundLoading, setIsFundLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [errorTransaction, setErrorTransaction] = useState("");
  const [selectedToken, setSelectedToken] = useState<{
    token?: string;
    network?: string;
  }>({
    token: undefined,
    network: undefined,
  });
  const privateKey = "0x1234567890"; // Replace with actual private key

  const sendTransaction = async () => {
    const rpcUrl = getInfuraRpcNetwork(selectedToken?.network!);
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const signer = new ethers.Wallet(privateKey, provider);

    try {
      setIsFundLoading(true);
      const tx = await signer.sendTransaction({
        // to: fundBotSelectedBot.userBotSmartWalletAddress,
        to: "0x1234567890", // Replace with actual wallet address
        value: ethers.parseUnits(`${inputTokenAmount}`, "ether"),
      });
      setTransactionHash(tx.hash);
      setIsFundLoading(false);
      // await createTransactionOnDb();
    } catch (error) {
      setErrorTransaction((error as any).message);
      setIsFundLoading(false);
    }
  };

  async function handleSendTransaction() {
    if (inputTokenAmount <= 0) {
      setErrorTransaction("Please enter a valid amount");
      return;
    }
    try {
      await sendTransaction();
    } catch (error) {
      setErrorTransaction((error as any).shortMessage);
    }
  }

  return (
    <div className="max-w-md">
      {isFundError ? (
        <FundBotError setIsFundError={setIsFundError} />
      ) : isFundSuccess ? (
        <FundBotSuccess />
      ) : isFundLoading ? (
        <FundBotLoading />
      ) : (
        <div className="bg-black rounded-xl w-full p-6 mb-5">
          <h1 className="text-center text-white text-xl mb-6">Fund Bot 3</h1>
          <div className="mb-6">
            <div className="mb-2">
              <p className="text-white text-sm mb-2">
                Enter value eth or percentage
              </p>
              <div className="flex items-stretch h-[44px]">
                <div className="bg-[#121212] rounded-l-xl rounded-bl-xl py-2 px-3 flex items-center gap-2">
                  <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center">
                    <Image src={ethIcon} alt="eth-icon" className="w-6 h-6" />
                  </div>
                  <p className="text-white">Eth</p>
                </div>
                <div className="h-full w-[2px] bg-white/70 flex-shrink-0" />
                <div>
                  <input
                    type="number"
                    className="text-end border-none bg-[#121212] rounded-r-xl rounded-br-xl py-2 px-3 text-white h-full focus:outline-none"
                    value={inputTokenAmount}
                    onChange={(e) =>
                      setInputTokenAmount(parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between bg-[#121212] rounded-xl py-2 px-3 text-white">
              <p className="text-xs">Gas</p>
              <p className="text-sm">$0.5 | 0.00005 eth</p>
            </div>
          </div>
          <p className="text-white text-center">Your eth balance - 99.00</p>
        </div>
      )}

      <SelectFundNetwork />
      <Button
        onClick={handleSendTransaction}
        className="bg-[#FF5900] text-black rounded-full w-full mt-5 hover:bg-[#FF5900]"
      >
        Continue
      </Button>
    </div>
  );
};
export default FundBot;
