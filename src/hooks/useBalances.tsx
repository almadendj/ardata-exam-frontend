'use client'
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useWallet } from "./useWallet";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "@/lib/contractInfo";

type BalancesProps = {
  ethBalance: string;
  tokenBalance: string;
  updateBalances: (address: string) => void;
  ethBalanceLoading?: boolean;
  tokenBalanceLoading?: boolean;
}

const BalancesContext = createContext<BalancesProps | null>(null);

export function useBalances() {
  const context = useContext(BalancesContext);

  if (!context) throw Error("useBalances must be used within a BalancesProvider");

  return context;
}

export function BalancesProvider({ children }: { children?: React.ReactNode }) {
  const [ethBalance, setEthBalance] = useState("");
  const [ethLoading, setEthLoading] = useState(false);
  const [tokenBalance, setTokenBalance] = useState("");
  const [tokenLoading, setTokenLoading] = useState(false);
  const { address, ethersProvider } = useWallet();

  const updateEthBalance = useCallback(async (address: string) => {
    try {
      if (!!ethersProvider) {
        setEthLoading(true);
        const ethBalance = await ethersProvider.getBalance(address);
        setEthBalance(ethers.formatEther(ethBalance));
      }
    } catch (e) {
      // TODO: add better error handling
      console.error(e);
    } finally {
      setEthLoading(false);
    }
  }, [ethersProvider, setEthBalance]);

  const updateTokenbalance = useCallback(async (address: string) => {
    try {
      setTokenLoading(true);
      const contract = new ethers.Contract(contractAddress, contractABI, ethersProvider);
      const tokenBalance = await contract.balanceOf(address);
      setTokenBalance(ethers.formatEther(tokenBalance));
    } catch (e) {
      // TODO: add better error handling
      console.error(e);
    } finally {
      setTokenLoading(false);
    }
  }, [ethers, ethersProvider, contractAddress, contractABI]);

  const updateBalances = useCallback((address: string) => {
    updateEthBalance(address);

    updateTokenbalance(address);
  }, [ethersProvider]);

  // fetch balances when page loads
  useEffect(() => {
    if (!!address) {
      updateBalances(address);
    }
  }, [updateBalances, address]);

  return <BalancesContext.Provider value={{
    ethBalance,
    tokenBalance,
    updateBalances,
    ethBalanceLoading: ethLoading,
    tokenBalanceLoading: tokenLoading
  }}>
    {children}
  </BalancesContext.Provider>
}
