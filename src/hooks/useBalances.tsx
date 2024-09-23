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

  const updateTokenBalance = useCallback(async (address: string) => {
    try {
      setTokenLoading(true);
      const contract = new ethers.Contract(contractAddress, contractABI, ethersProvider);

      // Fetch the token balance for the given address
      const tokenBalance = await contract.balanceOf(address);

      // Convert the balance from BigNumber to a human-readable format (Ether)
      const formattedBalance = ethers.formatUnits(tokenBalance, 0); // 0 decimals for ERC721
      setTokenBalance(formattedBalance);
    } catch (e) {
      // TODO: add better error handling
      console.error("Error fetching token balance:", e);
    } finally {
      setTokenLoading(false);
    }
  }, [ethersProvider, contractAddress, contractABI]);

  const updateBalances = useCallback((address: string) => {
    updateEthBalance(address);

    updateTokenBalance(address);
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
