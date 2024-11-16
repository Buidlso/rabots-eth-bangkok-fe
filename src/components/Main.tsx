/* eslint-disable react-hooks/exhaustive-deps */
"use client";

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
import RPC from "../lib/ethersRPC";
import { useCreateUserMutation, useFetchUser } from "@/server/api/user";
import { useAppDispatch } from "@/redux/hooks";
import { userActions } from "@/redux/actions";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
// import RPC from "./viemRPC";
// import RPC from "./web3RPC";
// IMP END - Blockchain Calls

// IMP START - Dashboard Registration
const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // get from https://dashboard.web3auth.io
// IMP END - Dashboard Registration

// IMP START - Verifier Creation
const verifier = "w3a-firebase-demo";
// IMP END - Verifier Creation

// IMP START - Chain Config
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};
// IMP END - Chain Config

// IMP START - SDK Initialization
const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId, // Get your Client ID from Web3Auth Dashboard
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
});

// IMP END - SDK Initialization

// IMP START - Auth Provider Login
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0nd9YsPLu-tpdCrsXn8wgsWVAiYEpQ_E",
  authDomain: "web3auth-oauth-logins.firebaseapp.com",
  projectId: "web3auth-oauth-logins",
  storageBucket: "web3auth-oauth-logins.appspot.com",
  messagingSenderId: "461819774167",
  appId: "1:461819774167:web:e74addfb6cc88f3b5b9c92",
};
// IMP END - Auth Provider Login

function Main() {
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

  const login = async () => {
    if (!web3auth) {
      uiConsole("web3auth initialised yet");
      return;
    }
    // IMP START - Auth Provider Login
    // login with firebase
    const loginRes = await signInWithGoogle();
    // get the id token from firebase
    const idToken = await loginRes.user.getIdToken(true);
    const { payload } = decodeToken(idToken);
    // IMP END - Auth Provider Login

    // IMP START - Login
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
    uiConsole(user);
  };

  const logout = async () => {
    // IMP START - Logout
    await web3auth.logout();
    // IMP END - Logout
    setProvider(null);
    setLoggedIn(false);
    uiConsole("logged out");
  };

  // IMP START - Blockchain Calls
  // Check the RPC file for the implementation

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const balance = await RPC.getBalance(provider);
    uiConsole(balance);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const signedMessage = await RPC.signMessage(provider);
    uiConsole(signedMessage);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    uiConsole("Sending Transaction...");
    const transactionReceipt = await RPC.sendTransaction(provider);
    uiConsole(transactionReceipt);
  };
  // IMP END - Blockchain Calls

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
    console.log(...args);
  }

  const loggedInView = (
    <>
      <div className="flex-container">
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          {/* <button onClick={getAccounts} className="card">
            Get Accounts
          </button> */}
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={signMessage} className="card">
            Sign Message
          </button>
        </div>
        <div>
          <button onClick={sendTransaction} className="card">
            Send Transaction
          </button>
        </div>
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  const TheLoggedInView = () => {
    const router = useRouter();

    const dispatch = useAppDispatch();

    let userWalletData;
    const [ethPrivateKey, setEthPrivateKey] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [googleUserInfo, setGoogleUserInfo] = useState<any>();

    const getIsUserAnOldUserFromLocalStorage = () => {
      const userWalletInfo = localStorage.getItem("userLocalStorageData");
      return userWalletInfo;
    };

    const createUserAccount = async (
      ethPrivateKey: string,
      walletAddress: string
    ) => {
      // await createUserAccount()

      console.log({ walletAddress });

      const payload = {
        name: googleAuthRes.user.providerData?.[0]?.displayName,
        email: googleAuthRes.user.email || "",
        uid: googleAuthRes.user.providerData?.[0]?.uid,
        walletAddress: walletAddress,
      };

      console.log("payload", payload);

      const { data } = await axios.post<any>(`/users`, payload);
      console.log({ data });
      if (!!data) {
        dispatch(userActions.setUser(data));
        router.push("/rabots");
      }

      // await createUser({
      //   name: "",
      //   email: "",
      //   walletAddress: "",
      // });

      console.log("createUserAccount");
    };

    const getUserAccount = async () => {
      // useFetchUser();
    };

    const getAccounts = async () => {
      if (!provider) {
        uiConsole("provider not initialized yet");
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
      <div className="flex-container">
        <div>
          <p className="text-red-300">
            walletAddress:{" "}
            <span className="text-black font-light">{walletAddress}</span>
          </p>
          <p className="text-red-300">
            privateKey:{" "}
            <span className="text-black font-light">{ethPrivateKey}</span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      {/* <WalletModal /> */}

      <div className="grid">
        {loggedIn ? <TheLoggedInView /> : unloggedInView}
      </div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </div>
  );
}

export default Main;
