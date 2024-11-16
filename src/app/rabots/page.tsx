"use client";

import axios from "@/lib/axios";
import AllRabots from "./AllRabots";
import { useEffect, useState } from "react";
import { useFetchUser } from "@/server/api/user";
import { set } from "zod";
import { useAppDispatch } from "@/redux/hooks";
import { userActions } from "@/redux/actions";

export default function page() {
  const [user, setUser] = useState<any>(null);

  const [wallet, setWallet] = useState<any>(null);
  const dispatch = useAppDispatch(); 

  useEffect(() => {
    const ethWalletAddress = localStorage.getItem("ethWalletAddress");
    const ethPrivateKey = localStorage.getItem("ethPrivateKey");
    setWallet({
      ethWalletAddress,
      ethPrivateKey,
    });
  }, []);

  const getUser = async () => {
    if (!!user) {
      return;
    }
    const res = await axios.get(`/users/${wallet?.ethWalletAddress}`);
    setUser(res?.data);
    dispatch(userActions.setUser(res?.data));
    
  };

  if (!!wallet?.ethWalletAddress) {
    getUser();
  }

  return (
    <div className="">
      <AllRabots />
    </div>
  );
}
