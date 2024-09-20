'use client'

import { Button } from "@/components/ui/button";
import { contractABI, contractAddress } from "@/lib/contractInfo";
import { BrowserProvider, ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [mintPrice, setMintPrice] = useState<string | null>(null);
  const [ethBalance, setEthBalance] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);

  useEffect(() => {
    const initProvider = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const browserProvider = new ethers.BrowserProvider(window.ethereum as any);
        setProvider(browserProvider);

        try {
          const contract = new ethers.Contract(contractAddress, contractABI, browserProvider);
          const price = await contract.MINT_PRICE();
          setMintPrice(ethers.formatEther(price));
        } catch (e) {
          console.log("Failed to get mint price: ", e);
        }
      }
    }

    initProvider();
  }, []);

  const connectWallet = useCallback(async () => {
    if (provider) {
      try {
        const accounts = await provider.send('eth_requestAccounts', []);
        setWallet(accounts[0]);

        updateBalances(accounts[0]);
      } catch (e) {
        console.error("Failed to connect to wallet: ", e);
      }
    }
  }, [provider]);

  const updateBalances = useCallback(async (address: string) => {
    if (!!provider) {
      const ethBalance = await provider.getBalance(address);
      setEthBalance(ethers.formatEther(ethBalance));

      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const tokenBalance = await contract.balanceOf(address);
      setTokenBalance(ethers.formatEther(tokenBalance));
    }
  }, [provider]);

  const mintToken = useCallback(async () => {
    if (provider && wallet && mintPrice) {
      try {
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const tx = await contract.mint({ value: ethers.parseEther(mintPrice) });
        await tx.wait();

        console.log("Token minted successfully!");
        updateBalances(wallet);
      } catch (e) {
        console.error("Failed to mint token: ", e);
      }
    }
  }, [provider, wallet, mintPrice]);

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
              Balance: {ethBalance} ETH
            </span>
            <span>
              Token Balance: {tokenBalance} ARDT
            </span>
            <span>
              Mint Price: {mintPrice} ETH
            </span>
            <Button onClick={mintToken}>
              Mint Token
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
