import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";

const Transactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    const ethWalletAddress = localStorage.getItem("ethWalletAddress");
    const ethPrivateKey = localStorage.getItem("ethPrivateKey");
    console.log("ethWalletAddress", ethWalletAddress);
    console.log("ethPrivateKey", ethPrivateKey);

    setWallet({
      ethWalletAddress,
      ethPrivateKey,
    });
    fetchTransactions(ethWalletAddress!);
  }, []);

  const fetchTransactions = async (walletAddress: string) => {
    console.log(wallet);

    if (!walletAddress) return;

    const url = `http://localhost:8080/history/v2.0/history/${walletAddress}/events`;

    const config = {
      headers: {
        Authorization: "Bearer LbIpCTk9myxSu8EgneNDOjs5hn1yPAWJ",
      },
      params: {
        limit: "10",
        chainId: "137",
      },
      paramsSerializer: {
        indexes: null,
      },
    };

    try {
      console.log("fetching");
      setLoading(true);
      const response = await axios.get(url, config);
      console.log("response", response.data);
      setTransactions(response.data.items);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const isARecieveTransaction = (toWalletAddress: string) => {
    const normalizedToWalletAddress = toWalletAddress.toLowerCase();
    const normalizedWalletAddress = wallet?.ethWalletAddress?.toLowerCase();

    console.log(
      normalizedToWalletAddress,
      normalizedWalletAddress,
      normalizedToWalletAddress === normalizedWalletAddress
    );

    return normalizedToWalletAddress === normalizedWalletAddress;
  };

  return (
    <div className="bg-[#121212] rounded-xl h-full w-full flex flex-col p-6">
      <h1 className="text-white text-xl mb-6">Recent Transactions</h1>
      <div className="bg-black border border-white/40 rounded-xl p-6 overflow-y-auto">
        {loading ? (
          <p className="text-white text-center">Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <p className="text-white text-center">No transactions found.</p>
        ) : (
          <ul className="divide-y divide-white/20">
            {transactions.map((tx) => (
              <li key={tx.id} className="py-4 flex justify-between items-start">
                <div>
                  <p className="text-white text-sm">
                    <span className="font-semibold">Tx Hash:</span>{" "}
                    {tx.details.txHash}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {new Date(tx.details.blockTimeSec * 1000).toLocaleString()}
                  </p>
                  <p className="text-white text-sm mt-2">
                    <span className="font-semibold">Amount:</span>{" "}
                    {parseFloat(tx.details.tokenActions[0].amount) / 1e18} MATIC
                  </p>
                  <p className="text-white text-sm">
                    <span className="font-semibold">To:</span>{" "}
                    {tx.details.toAddress.slice(0, 10)}...
                  </p>
                </div>
                <div className="text-green-400 text-sm font-semibold flex flex-col items-end">
                  <p
                    className={`${
                      isARecieveTransaction(tx.details.toAddress)
                        ? "text-green-400"
                        : "text-red-400"
                    } flex items-center gap-1`}
                  >
                    {isARecieveTransaction(tx.details.toAddress)
                      ? "Received"
                      : "Sent"}

                    {isARecieveTransaction(tx.details.toAddress) ? (
                      <ArrowUpLeft className="size-4 text-green-400" />
                    ) : (
                      <ArrowUpRight className="size-4 text-red-400" />
                    )}
                  </p>
                  <p>{tx.details.status.toUpperCase()}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Transactions;
