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
  const { data } = useFetchRabots();
  const { rabots } = useRabotsStore();

  console.log({ rabots }, "sdfkjaskl;fjlkfjasl;kfjsaf");

  return (
    <div className="min-h-screen rounded-md bg-[#121212] px-6 py-3">
      <h3 className="text-white mb-3">Rabots</h3>
      <div className=" flex flex-wrap gap-2">
        {rabots?.map((rabot) => (
          <RabotCard
            key={rabot.id}
            name={rabot.name}
            botId={rabot.id}
            description={rabot.description}
            subtitle={"Earn 3-4% APR with ezETH"}
          />
        ))}
      </div>
    </div>
  );
};
export default AllRabots;
