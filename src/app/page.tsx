'use client'

import { Button } from "@/components/ui/button";
import { BrowserProvider, ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  useEffect(() => {
    const initProvider = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const browserProvider = new ethers.BrowserProvider(window.ethereum as any);
        setProvider(browserProvider);
      }
    }

    initProvider();
  }, []);

  const connectWallet = useCallback(async () => {
    if (provider) {
      try {
        const accounts = await provider.send('eth_requestAccounts', []);
        setWallet(accounts[0]);

        const balance = await provider.getBalance(accounts[0]);
        setBalance(ethers.formatEther(balance));
      } catch (e) {
        console.error("Failed to connect to wallet: ", e);
      }
    }
  }, [provider]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        {!wallet ? (
          <Button onClick={connectWallet}>
            Connect Wallet
          </Button>
        ) : (
          <div className="flex flex-col gap-3">
            <span>
              Connected Wallet: {wallet}
            </span>
            <span>
              Balance: {balance} ETH
            </span>
          </div>
        )}
      </main>
    </div>
  );
}
