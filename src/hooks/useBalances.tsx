'use client'
import { createContext, useCallback, useContext, useState } from "react";
import { useWallet } from "./useWallet";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "@/lib/contractInfo";

type BalancesProps = {
  ethBalance: string;
  tokenBalance: string;
  updateBalances: (address: string) => Promise<void>
}

const BalancesContext = createContext<BalancesProps | null>(null);

export function useBalances() {
  const context = useContext(BalancesContext);

  if (!context) throw Error("useBalances must be used within a BalancesProvider");

  return context;
}

export function BalancesProvider({ children }: { children?: React.ReactNode }) {
  const [ethBalance, setEthBalance] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const ethersProvider = useWallet().ethersProvider;

  const updateBalances = useCallback(async (address: string) => {
    if (!!ethersProvider) {
      const ethBalance = await ethersProvider.getBalance(address);
      setEthBalance(ethers.formatEther(ethBalance));

      const contract = new ethers.Contract(contractAddress, contractABI, ethersProvider);
      const tokenBalance = await contract.balanceOf(address);
      setTokenBalance(ethers.formatEther(tokenBalance));
    }
  }, [ethersProvider]);

  return <BalancesContext.Provider value={{
    ethBalance,
    tokenBalance,
    updateBalances
  }}>
    {children}
  </BalancesContext.Provider>
}
