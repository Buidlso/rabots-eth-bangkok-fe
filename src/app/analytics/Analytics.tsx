"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const Analytics = () => {
  const [revenue, setRevenue] = useState<number>(0);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [protocolRevenue, setProtocolRevenue] = useState<number>(0);
  const [protocolAvgOrderValue, setProtocolAvgOrderValue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    const ethWalletAddress = localStorage.getItem("ethWalletAddress");
    console.log("ethWalletAddress", ethWalletAddress);

    setWallet({
      ethWalletAddress,
    });
    fetchGeneralAnalytics(ethWalletAddress!);
    fetchProtocolAnalytics(["0x3C97112223b1Ad104cF2Ac022E450EF862652b93"]);
  }, []);

  const fetchGeneralAnalytics = async (walletAddress: string) => {
    if (!walletAddress) return;

    // The request is being proxied from localhost:8080 to https://api.1inch.dev
    const url = `http://localhost:8080/portfolio/portfolio/v4/general/profit_and_loss`;

    const config = {
      headers: {
        Authorization: "Bearer LbIpCTk9myxSu8EgneNDOjs5hn1yPAWJ",
      },
      params: {
        addresses: [walletAddress],
        chain_id: "137",
      },
      paramsSerializer: {
        indexes: null,
      },
    };

    try {
      console.log("fetching general analytics");
      setLoading(true);
      const response = await axios.get(url, config);
      console.log("response", response.data);

      if (
        response.data &&
        response.data.result &&
        response.data.result.length > 0
      ) {
        const result = response.data.result[0];

        setRevenue(result.abs_profit_usd);
        setAvgOrderValue(result.roi * 1000);
        setTotalOrders(230);
      }
    } catch (error) {
      console.error("Error fetching general analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProtocolAnalytics = async (walletAddresses: string[]) => {
    if (!walletAddresses) return;

    // The request is being proxied from localhost:8080 to https://api.1inch.dev
    const url = `http://localhost:8080/portfolio/portfolio/v4/overview/protocols/profit_and_loss`;

    const config = {
      headers: {
        Authorization: "Bearer LbIpCTk9myxSu8EgneNDOjs5hn1yPAWJ",
      },
      params: {
        addresses: walletAddresses,
        chain_id: "8453",
      },
      paramsSerializer: {
        indexes: null,
      },
    };

    try {
      console.log("fetching protocol analytics");
      setLoading(true);
      const response = await axios.get(url, config);
      console.log("response", response.data);

      if (
        response.data &&
        response.data.result &&
        response.data.result.length > 0
      ) {
        const result = response.data.result.find(
          (r: any) => r.chain_id === 8453
        );

        if (result) {
          setProtocolRevenue(result.abs_profit_usd);
          setProtocolAvgOrderValue(result.roi * 1000);
        }
      }
    } catch (error) {
      console.error("Error fetching protocol analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#121212] rounded-xl h-full flex-1 w-full">
      <div className="flex flex-wrap items-stretch justify-center gap-3 w-full p-6">
        <div className="border border-white/40 rounded-xl p-3 flex-1 bg-black">
          <p className="text-white text-sm mb-3">Gross Revenue</p>
          <p className="text-white text-2xl">${revenue.toFixed(2)}</p>
        </div>
        <div className="border border-white/40 rounded-xl p-3 flex-1 bg-black">
          <p className="text-white text-sm mb-3">Avg. Order value</p>
          <p className="text-white text-2xl">${avgOrderValue.toFixed(2)}</p>
        </div>
        <div className="border border-white/40 rounded-xl p-3 flex-1 bg-black">
          <p className="text-white text-sm mb-3">Total orders</p>
          <p className="text-white text-2xl">{totalOrders}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-stretch justify-center gap-3 w-full p-6">
        <div className="border border-white/40 rounded-xl p-3 flex-1 bg-black">
          <p className="text-white text-sm mb-3">Protocol Gross Revenue</p>
          <p className="text-white text-2xl">${protocolRevenue.toFixed(2)}</p>
        </div>
        <div className="border border-white/40 rounded-xl p-3 flex-1 bg-black">
          <p className="text-white text-sm mb-3">Protocol Avg. Order value</p>
          <p className="text-white text-2xl">
            ${protocolAvgOrderValue.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
