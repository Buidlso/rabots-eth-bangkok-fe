import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInfuraRpcNetwork = (network: string): string => {
  switch (network) {
    case 'arbitrum':
      return 'https://arbitrum-mainnet.infura.io/v3/7e36059f2fc44c46b47aa0ca4a1eed7c';
    case 'optimism':
      return 'https://optimism-mainnet.infura.io/v3/7e36059f2fc44c46b47aa0ca4a1eed7c';
    case 'polygon':
      return 'https://polygon-mainnet.infura.io/v3/7e36059f2fc44c46b47aa0ca4a1eed7c';
    case 'ethereum':
      return 'https://mainnet.infura.io/v3/7e36059f2fc44c46b47aa0ca4a1eed7c';
    case 'eth_sepolia':
      return 'https://sepolia.infura.io/v3/7e36059f2fc44c46b47aa0ca4a1eed7c';
    case 'base':
      return 'https://base-mainnet.infura.io/v3/7e36059f2fc44c46b47aa0ca4a1eed7c';
    default:
      throw new Error('Unsupported network');
  }
};