'use client'

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

type WalletProps = {
  address?: string;
  isConnected: boolean;
  setAddress?: Dispatch<SetStateAction<string>>;
  setIsConnected?: Dispatch<SetStateAction<boolean>>;
}

const WalletContext = createContext<WalletProps>({
  isConnected: false
});

export function useWallet() {
  const context = useContext(WalletContext);

  if (!context) throw Error("useWallet must be used within a WalletProvider");

  return context;
}

export function WalletProvider({ children }: { children?: React.ReactNode }) {
  const [address, setAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  return <WalletContext.Provider value={{ address, isConnected, setAddress, setIsConnected }}>
    {children}
  </WalletContext.Provider>
}
