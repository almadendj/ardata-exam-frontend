'use client'

import { WalletProvidersDialog } from "@/components/WalletProvidersDialog";
import { Button } from "@/components/ui/button";
import { useBalances } from "@/hooks/useBalances";
import { useWallet } from "@/hooks/useWallet";
import { contractABI, contractAddress } from "@/lib/contractInfo";
import { BrowserProvider, ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const { address, isConnected, connectedProvider, ethersProvider } = useWallet();
  const { updateBalances } = useBalances();
  const [mintPrice, setMintPrice] = useState<string | null>(null);
  const [providersDialogOpen, setProvidersDialogOpen] = useState(false);
  const [ethBalance, setEthBalance] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);

  useEffect(() => {
    const initProvider = async () => {
      if (!!connectedProvider) {
        const browserProvider = new ethers.BrowserProvider(connectedProvider.provider);

        try {
          const contract = new ethers.Contract(contractAddress, contractABI, browserProvider);
          const price = await contract.MINT_PRICE();
          console.log("mint price: ", ethers.formatEther(price));
          setMintPrice(ethers.formatEther(price));
        } catch (e) {
          console.log("Failed to get mint price: ", e);
        }
      }
    }

    initProvider();
  }, [connectedProvider]);

  const mintToken = useCallback(async () => {
    if (ethersProvider && address && mintPrice) {
      try {
        const signer = await ethersProvider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const tx = await contract.mint({ value: ethers.parseEther(mintPrice) });
        await tx.wait();

        console.log("Token minted successfully!");
        updateBalances(address);
      } catch (e) {
        console.error("Failed to mint token: ", e);
      }
    }
  }, [ethersProvider, address, mintPrice]);


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        {isConnected && (
          <span>
            Wallet Connected
          </span>
        )}

        <Button onClick={() => setProvidersDialogOpen(true)}>
          Connect Wallet
        </Button>
      </main>

      <WalletProvidersDialog
        open={providersDialogOpen}
        setOpen={setProvidersDialogOpen}
      />
    </div>
  );
}
