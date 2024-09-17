'use client'

import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider } from "ethers";
import { formatEther } from "ethers/utils";

export default function Home() {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider, walletProviderType } = useAppKitProvider<any>('eip155');

  const getBalance = async () => {
    if (!!walletProvider) {
      try {
        if (!isConnected || !address) throw Error("User not connected");

        const ethersProvider = new BrowserProvider(walletProvider);

        const balance = await ethersProvider.getBalance(address);
        console.log(`balance: ${formatEther(balance)} ETH`);
      } catch (e) {
        console.error("error fetching balance: ", e);
      }
    }
  }


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <w3m-button />
        <button onClick={getBalance}>Get Balance</button>
      </main>
    </div>
  );
}
