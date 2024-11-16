import React, { useEffect, useState } from "react";
import ethIcon from "@/components/Icons/ethIcon.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import { ethers } from "ethers";
import { TGetBotResDto } from "@/server/dtos/rabot.dto";
import axios from "@/lib/axios";
import { useUserStore } from "@/redux/hooks";
import { set } from "zod";
import WithdrawLoading from "./WithdrawLoading";
import WithdrawSuccess from "./WithdrawSuccess";

const WithdrawInput = ({ rabotData }: { rabotData: TGetBotResDto }) => {
  const withdrawAmountSelectOptions = ["10%", "25%", "50%", "75%", "100%"];
  const [withdrawPercentage, setWithdrawPercentage] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [estimatedGas, setEstimatedGas] = useState<string | null>(null);
  const { user } = useUserStore();
  const [transactionHash, setTransactionHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    const ethWalletAddress = localStorage.getItem("ethWalletAddress");
    const ethPrivateKey = localStorage.getItem("ethPrivateKey");
    setWallet({
      ethWalletAddress,
      ethPrivateKey,
    });
  }, []);

  const walletAddress = wallet?.ethWalletAddress;
  const privateKey = wallet?.ethPrivateKey;
  const userBotDepositedAmount = rabotData.userBotDepositedAmount;

  const calculateValues = (value: number, field: "percentage" | "eth") => {
    if (field === "percentage") {
      const ethValue =
        (parseFloat(userBotDepositedAmount ?? "0") * value) / 100;
      setWithdrawPercentage(value);
      setWithdrawAmount(Number(ethValue.toFixed(6))); // Rounds ETH value to 6 decimal places
    } else {
      // Calculate percentage based on the ETH amount
      const percentageValue =
        (value / parseFloat(userBotDepositedAmount ?? "0")) * 100;
      setWithdrawAmount(value);
      setWithdrawPercentage(Number(percentageValue.toFixed(2))); // Rounds percentage to 2 decimal places
    }
  };

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setWithdrawPercentage(value);
    calculateValues(value, "percentage");
  };

  const handleEthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    calculateValues(value, "eth");
  };

  const handleSelectWithdrawlInput = (amount: number) => {
    calculateValues(amount, "percentage");
  };

  console.log("🤸‍♂️🤸‍♂️🤸‍♂️🤸‍♂️🤸‍♂️🤸‍♂️", { withdrawPercentage });

  const handleWithdrawClick = async () => {
    setIsLoading(true);
    const userId = user?.id;

    const payload = {
      network: rabotData?.network,
      currency: "eth",
      amountInPercentage: withdrawPercentage,
    };
    const res = await axios.post(
      `/user-bots/bot/${rabotData?.id}/user/${userId}/withdraw`,
      payload
    );

    const txHash = res?.data?.txHash;

    if (txHash) {
      setTransactionHash(txHash);
      console.log("Transaction Hash:", txHash);
      setIsLoading(false);
    } else {
      console.error("Transaction hash not found in response");
    }

    console.log("🤸‍♂️🤸‍♂️🤸‍♂️🤸‍♂️🤸‍♂️🤸‍♂️", { res });
  };

  return (
    <>
      {transactionHash ? (
        <WithdrawSuccess transactionHash={transactionHash} />
      ) : isLoading ? (
        <WithdrawLoading />
      ) : (
        <div>
          <div className="bg-black rounded-xl p-4 mb-3">
            <h2 className="text-[#FF5900] text-xl">
              Total Earned: {userBotDepositedAmount} eth
            </h2>

            <div className="">
              <p className="text-white text-sm mb-2">
                Enter value eth or percentage
              </p>
              <div className="flex items-stretch h-11 mb-2">
                <div className="flex items-center gap-2 bg-[#121212] py-2 px-3">
                  <Image src={ethIcon} alt="eth-icon" className="w-4 h-4" />
                  <p className="text-white">Eth</p>
                </div>
                <div className="h-full w-[2px] flex-shrink-0 bg-white/70" />
                <div>
                  <input
                    type="text"
                    className="text-end border-none bg-[#121212] rounded-r-xl rounded-br-xl py-2 px-3 text-white h-full focus:outline-none max-w-56"
                    value={withdrawAmount}
                  />
                </div>
                <div className="mx-2 my-auto w-[2px] bg-white/70 h-[60%] flex-shrink-0" />
                <div className="flex items-center text-white relative">
                  <input
                    type="text"
                    onChange={handlePercentageChange}
                    value={withdrawPercentage}
                    className="text-start border-none bg-[#121212] rounded-r-xl rounded-br-xl py-2 px-3 text-white h-full focus:outline-none max-w-16  rounded-xl"
                  />
                  <p className="absolute right-1">%</p>
                </div>
              </div>

              <div className="bg-[#121212] rounded-xl p-3 w-full">
                <div className="flex items-center justify-between">
                  <p className="text-white/40 text-sm">Total Earned</p>
                  <p className="text-white ">$100</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-white text-sm">Withdraw Amount</p>
                  <p className="text-white ">$50</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-white text-sm">Gas</p>
                  <p className="text-white ">$0.5 | 0.00005 eth</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-white mb-3">Quick Select</p>
            <div className="flex items-center gap-2">
              {withdrawAmountSelectOptions.map((option, idx) => {
                return (
                  <button
                    className="bg-black rounded-full text-white px-3 py-1"
                    onClick={() => handleSelectWithdrawlInput(parseInt(option))}
                    key={idx}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-1 mb-6  justify-center">
            <p className="text-white">Wallet:</p>
            <p className="text-white/40">{walletAddress}</p>
          </div>
          <Button
            onClick={handleWithdrawClick}
            className="text-black bg-[#FF5900] rounded-full w-full text-lg h-11 hover:bg-[#FF5900]"
          >
            Withdraw
          </Button>
        </div>
      )}
    </>
  );
};

export default WithdrawInput;
