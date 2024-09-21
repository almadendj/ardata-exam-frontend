'use client'

import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react"

type WalletProps = {
  address?: string;
  isConnected: boolean;
  setAddress: Dispatch<SetStateAction<string>>;
  setIsConnected: Dispatch<SetStateAction<boolean>>;
  selectedWallet?: EIP6963ProviderDetail;
  setSelectedWallet: Dispatch<SetStateAction<EIP6963ProviderDetail | undefined>>;
}

const WalletContext = createContext<WalletProps | null>(null);

export function useWallet() {
  const context = useContext(WalletContext);

  if (!context) throw Error("useWallet must be used within a WalletProvider");

  return context;
}

export function WalletProvider({ children }: { children?: React.ReactNode }) {
  const [address, setAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>();

  useEffect(() => {
    if (!!selectedWallet) {
      setIsConnected(true);
    }
  }, [selectedWallet, setIsConnected]);

  return <WalletContext.Provider value={{ address, isConnected, setAddress, setIsConnected, selectedWallet, setSelectedWallet }}>
    {children}
  </WalletContext.Provider>
}
