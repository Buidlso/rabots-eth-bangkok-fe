"use client";

import React, { useState } from "react";
import { RabotIcon, SettingsIcon } from "./icons";
import { Button } from "./ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";

interface Button {
  id: number;
  label: string;
  icon: any;
  link: string;
}

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState<number | null>(1);
  const buttons: Button[] = [
    {
      id: 1,
      label: "Home",
      link: "/rabots",
      icon: RabotIcon,
    },
    { id: 2, label: "Analytics", icon: FileText, link: "/analytics" },
    { id: 3, label: "settings", icon: SettingsIcon, link: "#" },
  ];

  return (
    <div className="py-6 px-6 bg-[#121212] rounded-md w-fit flex flex-col items-start gap-6 min-w-60">
      {buttons.map((button) => (
        <Link
          href={button.link}
          key={button.id}
          className={` flex items-center justify-center gap-2  transition-colors duration-200 hover:bg-none  ${
            activeButton === button.id ? " text-[#FF5900] " : " text-white "
          }`}
          onClick={() => setActiveButton(button.id)}
        >
          <button.icon className="inline-block w-fit flex-shrink-0 " />
          <p className="capitalize">{button.label}</p>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
