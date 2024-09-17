'use client'

import { Button } from "@/components/ui/button";
import { useCallback, useMemo } from "react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider, Eip1193Provider } from "ethers";
import { Wallet } from "@/lib/Wallet";

export default function Home() {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider, walletProviderType } = useAppKitProvider<Eip1193Provider>('eip155');
  const wallet = useMemo(() => {
    if (!!walletProvider) {
      const ethersProvider = new BrowserProvider(walletProvider);
      return new Wallet(ethersProvider);
    }

    return null;
  }, [walletProvider])

  const getBalance = useCallback(async () => {
    try {
      if (!wallet) throw Error("Wallet needs to be instantiated");
      if (!isConnected || !address) throw Error("User not connected");

      const balance = await wallet.getBalance(address);
      console.log(`balance: ${balance} ETH`);
    } catch (e) {
      console.error("error fetching balance: ", e);
    }
  }, [wallet, address, isConnected])


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <w3m-button />
        {!!wallet && (
          <Button onClick={getBalance}>Get Balance</Button>
        )}
      </main>
    </div>
  );
}
