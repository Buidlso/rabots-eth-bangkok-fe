"use client";

import { LeftArrowIcon } from "@/components/icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import dummyrabotIcon from "../../../components/icons/dummyrabotIcon.png";
import { useAppDispatch, useUserStore } from "@/redux/hooks";
import { walletActions } from "@/redux/actions";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import WithdrawModal from "@/components/withdraw/WithdrawModal";
import { useFetchRabotById, useFetchUserBotById } from "@/server/api/rabots";
import { TGetBotResDto, TGetUserBotResDto } from "@/server/dtos/rabot.dto";
import axios from "@/lib/axios";

const rabotDatasDetails = () => {
  const params = useParams<{ id: string }>();
  const { user } = useUserStore();
  const dispatch = useAppDispatch();

  const { data: rabotData } = useFetchRabotById(params.id, user?.id);

  const createUserBot = async () => {
    const payload = {
      userId: user?.id,
      botId: rabotData?.id,
    };
    const res = await axios.post(`/user-bots`, payload);

    const smartWalletAddress = res.data.smartWalletAddress;
    return smartWalletAddress;
  };

  // const { rabotData } = userabotDatasStore();

  async function handleFundBotClick() {
    let newSmartWalletAddress = rabotData?.userBotSmartWalletAddress ?? "";
    if (!rabotData?.userBotSmartWalletAddress) {
      console.log("Creating user bot...");

      newSmartWalletAddress = await createUserBot();
      console.log("newSmartWalletAddress", newSmartWalletAddress);
    }

    dispatch(walletActions.setWalletScreen("FUND"));
    dispatch(
      walletActions.setSelectedRabot({
        id: rabotData?.id,
        name: rabotData?.name,
        description: rabotData?.description,
        type: rabotData?.type,
        userBotSmartWalletAddress: newSmartWalletAddress,
      })
    );
  }

  function handleBackClick() {
    dispatch(walletActions.setWalletScreen("BALANCE"));
  }

  return (
    <div className="rounded-xl bg-[#121212] p-6 h-full">
      <Link
        href={"/rabots"}
        className="text-[#FF5900] flex items-center gap-2 cursor-pointer mb-3"
        onClick={handleBackClick}
      >
        <LeftArrowIcon />
        Back
      </Link>

      <div className="bg-black rounded-xl p-6 h-[97%] flex flex-col justify-between">
        <div>
          <div className="mb-3 flex items-center gap-6">
            <Image
              src={dummyrabotIcon}
              alt="dummy-rabotData-icon"
              width={50}
              height={50}
            />
            <div>
              <h1 className="mb-3 text-[#FF5900] text-xl">{rabotData?.name}</h1>
              <p className="text-white font-light">Earn 3-4% APR with ezETH</p>
            </div>
          </div>
          <p className="text-white/40 font-light">{rabotData?.description}</p>
        </div>
        <div className=" flex w-full gap-3">
          {/* <Button className='bg-[#FF5900]/10 border-2 border-[#FF5900] flex-1 rounded-xl'>
            Withdraw
          </Button> */}
          <WithdrawModal />
          <Button
            onClick={handleFundBotClick}
            className="bg-[#FF5900]/10 border-2 border-[#FF5900] flex-1 rounded-xl"
          >
            Fund
          </Button>
        </div>
      </div>
    </div>
  );
};

export default rabotDatasDetails;
