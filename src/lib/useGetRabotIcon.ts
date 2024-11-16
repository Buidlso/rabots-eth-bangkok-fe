import RenzoIcon from "@/components/icons/RenzoIcono.svg";
import AerodromeIcon from "@/components/icons/AerodromeIcon.svg";
import QuickswapIcon from "@/components/icons/QuickSwapIcon.svg";

export const useGetRabotIcon = ({ botType }: { botType?: string }) => {
  console.log("botType", botType);
  
  const botIcons = {
    RENZO: RenzoIcon,
    LIDO: RenzoIcon,
    AERODROME_WETH_USDC: AerodromeIcon,
    QUICKSWAP_LP: QuickswapIcon,
  };

  const botIcon = (botIcons as any)?.[botType!];

  return botIcon;
};
