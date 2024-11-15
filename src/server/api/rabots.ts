import { useQuery } from "@tanstack/react-query";

import { useAppDispatch } from "@/redux/hooks";
import axios, { AxiosError } from "axios";
import { rabotsActions } from "@/redux/actions";

export const useFetchRabots = (
  page: number,
  size: number,
  dependsOn = true
) => {
  const dispatch = useAppDispatch();

  async function fetchRabots() {
    const { data } = await axios.get(`/rabots`);
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
    // keepPreviousData: true,
    // onSuccess,
    // onError,
    retry: 0,
    enabled: dependsOn,
  });
};

export const useFetchRabotById = (rabotsId: string, dependsOn = true) => {
  const dispatch = useAppDispatch();

  async function fetchRabots() {
    const { data } = await axios.get(`/rabots/${rabotsId}`);
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
    queryKey: ["RABOTS_BY_ID"],
    queryFn: fetchRabots,
    // keepPreviousData: true,
    // onSuccess,
    // onError,
    retry: 0,
    enabled: dependsOn,
  });
};
