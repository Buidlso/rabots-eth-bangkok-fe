import EthIcon from "../../public/eth-icon-black.png";
import MaticIcon from "../../public/maticIcon.svg";
import USDCIcon from "../../public/usdc.png";
import USDTIcon from "../../public/usdt.png";

export const useGetTokenLogo = ({ token }: { token: string }) => {
  const logos = {
    ETH: EthIcon,
    MATIC: MaticIcon,
    USDC: USDCIcon,
    USDT: USDTIcon,
    POL: MaticIcon,
  };


  const tokenLogo = (logos as any)?.[token];

  return tokenLogo;
};
