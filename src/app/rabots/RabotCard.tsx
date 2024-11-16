import React from "react";
import Image from "next/image";

import dummyRabotIcon from "../../components/icons/dummyRabotIcon.png";
import Link from "next/link";

type RabotCardProps = {
  botId: number;
  name: string;
  subtitle: string;
  description: string;
};

const RabotCard = ({ botId, description, name, subtitle }: RabotCardProps) => {
  return (
    <div className="bg-black p-6 max-w-96 flex-1 min-w-80">
      <Image
        src={dummyRabotIcon}
        alt="dummy-rabot-icon"
        width={50}
        height={50}
        className="mb-6"
      />
      <div className="mb-6">
        <h2 className="mb-3 text-[#FF5900] text-2xl capitalize">{name}</h2>
        <p className="text-white opacity-80 font-light text-sm">{subtitle}</p>
      </div>
      <p className="text-white/40 font-light mb-6">{description}</p>
      <div className="bg-[#FF5900]/10 border border-[#FF5900] rounded-xl w-full text-white py-3 text-center cursor-pointer">
        <Link href={`rabots/${botId}`}>Explore</Link>
      </div>
    </div>
  );
};

export default RabotCard;
