import BaseIcon from "../../public/BaseIcon.png";
import MaticIcon from "../../public/maticIcon.svg";

export const useGetBlockchainLogo = ({
  blockchain,
}: {
  blockchain?: string;
}) => {
  const logos = {
    polygon: MaticIcon,
    base: BaseIcon,
  };

  const blockchainLogo = (logos as any)?.[blockchain!];

  return blockchainLogo;
};
