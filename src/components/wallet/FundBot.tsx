import React, { useState } from "react";
import ethIcon from "../../components/Icons/ethIcon.svg";
import Image from "next/image";
import SelectFundNetwork from "./SelectFundNetwork";
import FundBotError from "./FundBotError";
import FundBotLoading from "./FundBotLoading";
import { getInfuraRpcNetwork } from "@/lib/utils";
import { ethers } from "ethers";
import { Button } from "../ui/button";
import FundBotSuccess from "./FundBotSuccess";
import { useGetWalletBalances } from "@/server/api/wallet";
import { useWalletStore } from "@/redux/hooks";
import SelectWalletAssets from "./SelectWalletAssets";
import { useGetBlockchainLogo } from "@/lib/useGetBlockchainLogo";
import rabotDatasDetails from "@/app/rabots/[id]/page";
import rabotDetails from "@/app/rabots/[id]/page";

const FundBot = ({
  walletAddress,
  privateKey,
}: {
  walletAddress: string;
  privateKey: string;
}) => {
  const [inputTokenAmount, setInputTokenAmount] = useState<number>(0);
  const [isFundError, setIsFundError] = useState(false);
  const [isFundSuccess, setIsFundSuccess] = useState(false);
  const [isFundLoading, setIsFundLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [errorTransaction, setErrorTransaction] = useState("");
  const [selectedToken, setSelectedToken] = React.useState<{
    token?: string;
    network?: string;
  }>({
    token: undefined,
    network: undefined,
  });

  const { selectedRabot } = useWalletStore();
  console.log({ selectedRabot });

  const sendTransaction = async () => {
    const rpcUrl = getInfuraRpcNetwork(selectedToken?.network!);
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const signer = new ethers.Wallet(privateKey, provider);

    try {
      setIsFundLoading(true);
      const tx = await signer.sendTransaction({
        to: selectedRabot.userBotSmartWalletAddress,
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
    if(!selectedToken.token){
      setErrorTransaction("Please select a token");
      return;
    }
    try {
      await sendTransaction();
    } catch (error) {
      setErrorTransaction((error as any).shortMessage);
    }
  }

  const { data: walletBalance } = useGetWalletBalances(walletAddress);

  const blockchainLogo = useGetBlockchainLogo({
    blockchain: selectedToken.network,
  });

  return (
    <div className="max-w-md">
      {isFundError ? (
        <FundBotError setIsFundError={setIsFundError} />
      ) : transactionHash ? (
        <FundBotSuccess txHash={transactionHash} />
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
                  {selectedToken.token && (
                    <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center">
                      <Image
                        src={blockchainLogo}
                        alt="eth-icon"
                        className="w-6 h-6"
                      />
                    </div>
                  )}
                  <p className="text-white">
                    {selectedToken.token ?? "Select a token"}
                  </p>
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
          </div>
          <SelectWalletAssets
            walletBalance={walletBalance}
            setSelectedToken={setSelectedToken}
            selectedToken={selectedToken}
          />
        </div>
      )}

      {/* <SelectFundNetwork /> */}
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
