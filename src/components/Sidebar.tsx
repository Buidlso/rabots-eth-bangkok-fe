"use client";

import React, { useState } from "react";
import { HeartIcon, RabotIcon, SettingsIcon } from "./icons";
import { Button } from "./ui/button";

interface Button {
  id: number;
  label: string;
  icon: any;
  link?: string;
}

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState<number | null>(1);
  const buttons: Button[] = [
    {
      id: 1,
      label: "rabots",
      link: "/rabots",
      icon: RabotIcon,
    },
    { id: 2, label: "likes", icon: HeartIcon },
    { id: 3, label: "settings", icon: SettingsIcon },
  ];

  return (
    <div className="py-6 p-3 bg-[#121212] rounded-md w-fit flex flex-col items-center gap-6">
      {buttons.map((button) => (
        <Button
          key={button.id}
          className={`w-12 h-12 flex items-center justify-center  py-2 px-4 rounded-full transition-colors duration-200 hover:bg-none border-2 ${
            activeButton === button.id
              ? 'bg-[#FF5900]/15 text-[#FF5900] border-orange-500'
              : "bg-white/15 text-white border-white"
          }`}
          onClick={() => setActiveButton(button.id)}
        >
          <button.icon className="inline-block w-fit" />
        </Button>
      ))}
    </div>
  );
};

export default Sidebar;
