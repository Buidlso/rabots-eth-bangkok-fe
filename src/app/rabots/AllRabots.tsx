import React from "react";
import RabotCard from "./RabotCard";
import { useFetchRabots } from "@/server/api/rabots";
import { useRabotsStore } from "@/redux/hooks";

type TDummyRabots = {
  botId: number;
  name: string;
  subtitle: string;
  description: string;
};

const AllRabots = () => {
  const { data: rabots } = useFetchRabots();

  if (!rabots)
    return (
      <div className="min-h-screen rounded-md bg-[#121212] px-6 py-6">
        <p className="text-white">loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen rounded-md bg-[#121212] px-6 py-6">
      {/* <h3 className="text-accent text-xl mb-4">Rabots</h3> */}
      <div className=" flex flex-wrap gap-2">
        {rabots?.map((rabot) => (
          <RabotCard
            key={rabot.id}
            name={rabot.name}
            botId={rabot.id}
            description={rabot.description}
            botType={rabot.type}
            subtitle={"Earn 3-4% APR with ezETH"}
          />
        ))}
      </div>
    </div>
  );
};
export default AllRabots;
