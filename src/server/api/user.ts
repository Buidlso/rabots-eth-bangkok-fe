import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAppDispatch } from "@/redux/hooks";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { userActions } from "@/redux/features/user-slice";

export const useFetchUser = (page: number, size: number, dependsOn = true) => {
  const dispatch = useAppDispatch();

  async function fetchUser() {
    const { data } = await axios.get(`/user`);
    return data;
  }

  function onSuccess(resp?: any) {
    dispatch(userActions.setUser(resp));
  }

  // on Error
  function onError(error: AxiosError<any>) {
    console.log({ error });
  }

  return useQuery({
    queryKey: ["FETCH_USER"],
    queryFn: fetchUser,
    // keepPreviousData: true,
    // onSuccess,
    // onError,
    retry: 0,
    enabled: dependsOn,
  });
};

export const useCreateUser = (dependsOn = true) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  async function createUser(payload: any) {
    const { data } = await axios.post<any>(`/user`, payload);
    return data;
  }

  function onSuccess(resp?: any) {
    queryClient.invalidateQueries({ queryKey: ["FETCH_USER"] });
    router.push("/rabots");
  }

  function onError(error?: any) {
    console.log({ error });
  }

  return useMutation({
    mutationKey: ["CREATE_USER"],
    mutationFn: createUser,
    onSuccess,
    retry: 0,
  });
};
