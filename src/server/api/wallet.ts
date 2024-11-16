import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAppDispatch } from "@/redux/hooks";
import { AxiosError } from "axios";
import { walletActions } from "@/redux/actions";
import axios from "@/lib/axios";

export const useGetWalletBalances = (
  walletAddress: string,
  dependsOn = true
) => {
  const dispatch = useAppDispatch();

  async function fetchWallet() {
    const { data } = await axios.get(
      `http://localhost:8000/wallet/balance/${walletAddress}`
    );
    return data;
  }

  function onSuccess(resp?: any) {
    dispatch(walletActions.setWallet(resp));
  }

  // on Error
  function onError(error: AxiosError<any>) {
    console.log({ error });
  }

  return useQuery({
    queryKey: ["WALLET_BALANCE"],
    queryFn: fetchWallet,
    // keepPreviousData: true,
    // onSuccess,
    // onError,
    retry: 0,
    enabled: dependsOn,
  });
};

export const useCreateTransaction = (
  txHash: any,
  from: any,
  to: any,
  fromAddress: any,
  toAddress: any,
  amount: any,
  gas: any,
  currency: any,
  network: any,
  dependsOn = true
) => {
  const dispatch = useAppDispatch();

  const payload = {
    txHash: txHash,
    from: from,
    to: to,
    fromAddress: fromAddress,
    toAddress: toAddress,
    amount: amount,
    gas: gas,
    currency: currency,
    network: network,
  };

  async function fetchWallet() {
    const { data } = await axios.post(
      `http://localhost:8000/transactions`,
      payload
    );
    return data;
  }

  function onSuccess(resp?: any) {
    dispatch(walletActions.setTransactionHash(resp));
  }

  // on Error
  function onError(error: AxiosError<any>) {
    console.log({ error });
  }

  return useQuery({
    queryKey: ["WALLET_BALANCE"],
    queryFn: fetchWallet,
    // keepPreviousData: true,
    // onSuccess,
    // onError,
    // retry: 0,
    enabled: dependsOn,
  });
};
