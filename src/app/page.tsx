'use client'

import { Button } from "@/components/ui/button";
import { Fragment, useCallback, useMemo } from "react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider, Eip1193Provider } from "ethers";
import { Wallet } from "@/lib/Wallet";

export default function Home() {
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Eip1193Provider>('eip155');
  const wallet = useMemo(() => {
    if (!!walletProvider && !!address) {
      const ethersProvider = new BrowserProvider(walletProvider);
      return new Wallet(ethersProvider, address);
    }

    return null;
  }, [walletProvider, address])

  const getBalance = useCallback(async () => {
    try {
      if (!wallet) throw Error("Wallet needs to be instantiated");

      const balance = await wallet.getBalance();
      console.log(`balance: ${balance} ETH`);
    } catch (e) {
      console.error("error fetching balance: ", e);
    }
  }, [wallet])

  const getTransactions = useCallback(async () => {
    try {
      if (!wallet) throw Error("Wallet needs to be instantiated");

      console.log(await wallet.getTransactions());
    } catch (e) {
      console.error("error fecthing wallet transactions: ", e);
    }
  }, [wallet]);


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <w3m-button />
        {!!wallet && (
          <Fragment>
            <Button onClick={getBalance}>Get Balance</Button>
            <Button onClick={getTransactions}>Get Transactions</Button>
          </Fragment>
        )}
      </main>
    </div>
  );
}
