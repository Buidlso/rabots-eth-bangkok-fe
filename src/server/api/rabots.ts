import { useQuery } from "@tanstack/react-query";

import { useAppDispatch } from "@/redux/hooks";
import { AxiosError } from "axios";
import { rabotsActions } from "@/redux/actions";
import axios from "@/lib/axios";
import {
  TGetBotResDto,
  TGetUserBotResDto,
  TListBotsResDto,
} from "../dtos/rabot.dto";

export const useFetchRabots = (dependsOn = true) => {
  const dispatch = useAppDispatch();

  async function fetchRabots() {
    const { data } = await axios.get<TListBotsResDto>(`/bots`);
    return data;
  }

  function onSuccess(resp?: any) {
    dispatch(rabotsActions.setRabots(resp));
  }

  // on Error
  function onError(error: AxiosError<any>) {
    console.log({ error });
  }

  return useQuery({
    queryKey: ["RABOTS"],
    queryFn: fetchRabots,
    // onSuccess,
    // onError,
    retry: 0,
    enabled: dependsOn,
  });
};

export const useFetchRabotById = (rabotsId: string, dependsOn = true) => {
  const dispatch = useAppDispatch();

  async function fetchRabots() {
    const { data: rabotData } = await axios.get<TGetBotResDto>(
      `/bots/${rabotsId}`
    );
    const { data: userBotData } = await axios.get<TGetUserBotResDto>(
      `/user-bots/${rabotsId}`
    );
    return {
      id: rabotData.id,
      name: rabotData.name,
      description: rabotData.description,
      type: rabotData.type,
      userBotSmartWalletAddress: userBotData?.smartWalletAddress,
    };
  }

  function onSuccess(resp?: any) {
    dispatch(rabotsActions.setRabots(resp));
  }

  // on Error
  function onError(error: AxiosError<any>) {
    console.log({ error });
  }

  return useQuery({
    queryKey: ["RABOTS_BY_ID"],
    queryFn: fetchRabots,
    // keepPreviousData: true,
    // onSuccess,
    // onError,
    retry: 0,
    enabled: dependsOn,
  });
};

export const useFetchUserBotById = (userBotId: string, dependsOn = true) => {
  const dispatch = useAppDispatch();

  async function fetchUserBot() {
    const { data } = await axios.get<TGetBotResDto>(`/user-bot/${userBotId}`);
    return data;
  }

  function onSuccess(resp?: any) {
    // dispatch(rabotsActions.setRabots(resp));
  }

  // on Error
  function onError(error: AxiosError<any>) {
    console.log({ error });
  }

  return useQuery({
    queryKey: ["USER_BOT_BY_ID"],
    queryFn: fetchUserBot,
    // keepPreviousData: true,
    // onSuccess,
    // onError,
    retry: 0,
    enabled: dependsOn,
  });
};
