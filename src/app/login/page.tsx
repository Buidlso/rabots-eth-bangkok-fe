'use client'

import { GoogleIcon } from "@/components/icons";
import Image from "next/image";
import loginBg from "../../../public/login-bg.png";
import { Button } from "@/components/ui/button";
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  IProvider,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
// IMP START - Quick Start
import { decodeToken, Web3Auth } from "@web3auth/single-factor-auth";
// IMP END - Quick Start
// IMP START - Auth Provider Login
// Firebase libraries for custom authentication
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { useEffect, useState } from "react";

// IMP END - Auth Provider Login
// IMP START - Blockchain Calls
import RPC from "../../lib/ethersRPC";
import { useCreateUserMutation, useFetchUser } from "@/server/api/user";
import { useAppDispatch } from "@/redux/hooks";
import { userActions } from "@/redux/actions";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // get from https://dashboard.web3auth.io

const verifier = "w3a-firebase-demo";

// IMP START - Chain Config
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId, // Get your Client ID from Web3Auth Dashboard
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
});

const firebaseConfig = {
  apiKey: "AIzaSyB0nd9YsPLu-tpdCrsXn8wgsWVAiYEpQ_E",
  authDomain: "web3auth-oauth-logins.firebaseapp.com",
  projectId: "web3auth-oauth-logins",
  storageBucket: "web3auth-oauth-logins.appspot.com",
  messagingSenderId: "461819774167",
  appId: "1:461819774167:web:e74addfb6cc88f3b5b9c92",
};

const page = () => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const { mutateAsync: createUser } = useCreateUserMutation();
  const [googleAuthRes, setGoogleAuthRes] = useState<any>();

  // Firebase Initialisation
  const app = initializeApp(firebaseConfig);

  useEffect(() => {
    const init = async () => {
      try {
        // IMP START - SDK Initialization
        await web3auth.init();
        // IMP END - SDK Initialization
        setProvider(web3auth.provider);

        if (web3auth.status === ADAPTER_EVENTS.CONNECTED) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  // IMP START - Auth Provider Login
  const signInWithGoogle = async (): Promise<UserCredential> => {
    try {
      const auth = getAuth(app);
      const googleProvider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, googleProvider);
      setGoogleAuthRes(res);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  // IMP END - Auth Provider Login

  const handleLoginClick = async () => {
    if (!web3auth) {
      console.log("web3auth initialised yet");
      return;
    }
    const loginRes = await signInWithGoogle();
    const idToken = await loginRes.user.getIdToken(true);
    const { payload } = decodeToken(idToken);

    const web3authProvider = await web3auth.connect({
      verifier,
      verifierId: (payload as any).sub,
      idToken,
    });
    // IMP END - Login

    if (web3authProvider) {
      setLoggedIn(true);
      setProvider(web3authProvider);
    }
  };

  const getUserInfo = async () => {
    // IMP START - Get User Information
    const user = await web3auth.getUserInfo();
    // IMP END - Get User Information
    console.log({ user });
  };

  const router = useRouter();

  const dispatch = useAppDispatch();

  let userWalletData;
  const [ethPrivateKey, setEthPrivateKey] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const createUserAccount = async (
    ethPrivateKey: string,
    walletAddress: string
  ) => {
    console.log({ walletAddress });

    const payload = {
      name: googleAuthRes.user.providerData?.[0]?.displayName,
      email: googleAuthRes.user.email || "",
      uid: googleAuthRes.user.providerData?.[0]?.uid,
      walletAddress: walletAddress,
    };
    localStorage.setItem("ethPrivateKey", ethPrivateKey);
    localStorage.setItem("ethWalletAddress", walletAddress);

    const { data } = await axios.post<any>(`/users`, payload);
    console.log({ data });
    if (!!data) {
      dispatch(
        userActions.setUser({
          walletAddress: walletAddress,
          privateKey: ethPrivateKey,
        })
      );
      router.push("/rabots");
    }

    console.log("createUserAccount");
  };

  const getUserAccount = async () => {
    // useFetchUser();
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }

    getUserInfo();
    const address = await RPC.getAccounts(provider);

    const ethPrivateKey = await provider?.request({
      method: "eth_private_key",
    });
    setEthPrivateKey(ethPrivateKey as string);
    setWalletAddress(address);
    console.log(ethPrivateKey);
    // uiConsole(address, ethPrivateKey);
    return {
      address,
      ethPrivateKey,
    };
  };

  useEffect(() => {
    const userWalletInfo = async () => {
      const user = await getAccounts();
      console.log("userWalletData", user);

      createUserAccount((user as any).ethPrivateKey, (user as any).address);
    };
    userWalletInfo();
  }, []);

  console.log("🦁🦁🦁🦁🦁", { googleAuthRes });

  return (
    <div className="flex items-center justify-around gap-10 h-full">
      <div className="flex flex-col  justify-center  p-6 h-[550px]">
        <p className="text-[#FF5900] mb-8 text-lg">Login</p>
        <h1 className="text-6xl text-white font-medium mb-6">
          Welcome to <br /> Rabots
        </h1>
        <p className="text-white mb-8">Quick Login With Google</p>
        <Button
          onClick={handleLoginClick}
          className="flex items-center gap-3 bg-black rounded-lg py-2 px-4 text-white w-fit border border-white"
        >
          <GoogleIcon />
          Login with Google
        </Button>
      </div>
      <div className="max-w-4xl">
        <Image src={loginBg} alt="login-bg" />
      </div>
    </div>
  );
};

export default page;
