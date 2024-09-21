import { Dispatch, SetStateAction, useState, useCallback } from "react"
import { useSyncProviders } from "../hooks/useSyncProviders"
import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { useWallet } from "@/hooks/useWallet";

type DialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const WalletProvidersDialog = ({ open, setOpen }: DialogProps) => {
  const { setSelectedWallet, setAddress, injectedProviders, handleConnectProvider } = useWallet();

  const handleConnect = useCallback(async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts: any = await providerWithInfo.provider.request({
        method: "eth_requestAccounts"
      })

      setSelectedWallet(providerWithInfo)
      setAddress(accounts?.[0])
    } catch (error) {
      console.error(error)
    } finally {
      setOpen(false);
    }
  }, [setSelectedWallet, setOpen, setAddress]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Wallets Detected
          </DialogTitle>
          <DialogDescription>
            Please select one
          </DialogDescription>
        </DialogHeader>
        <div>
          {
            injectedProviders.size > 0 ? Array.from(injectedProviders)?.map(([_, { info, provider }]) => (
              <Button
                className="w-full space-x-3 py-6"
                key={info.uuid}
                onClick={() =>
                  handleConnectProvider({ info, provider })
                    .then(() => setOpen(false))
                } >
                <div className="w-[30px] h-[30px] relative">
                  <Image src={info.icon} alt={info.name} fill />
                </div>
                <span>{info.name}</span>
              </Button>
            )) :
              <span className="font-bold">
                No Announced Wallet Providers. Please install MetaMask
              </span>
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}
