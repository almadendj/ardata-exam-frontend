import { Dispatch, SetStateAction, useState } from "react"
import { useSyncProviders } from "../hooks/useSyncProviders"
import { formatAddress } from "@/utils/crypto";
import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";

type DialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const WalletProvidersDialog = ({ open, setOpen }: DialogProps) => {
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>()
  const [userAccount, setUserAccount] = useState<string>("")
  const providers = useSyncProviders()

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts: any = await providerWithInfo.provider.request({
        method: "eth_requestAccounts"
      })

      setSelectedWallet(providerWithInfo)
      setUserAccount(accounts?.[0])
    } catch (error) {
      console.error(error)
    }
  }

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
            providers.length > 0 ? providers?.map((provider: EIP6963ProviderDetail) => (
              <button key={provider.info.uuid} onClick={() => handleConnect(provider)} >
                <img src={provider.info.icon} alt={provider.info.name} />
                <div>{provider.info.name}</div>
              </button>
            )) :
              <div>
                No Announced Wallet Providers
              </div>
          }
        </div>
        <hr />
        <h2>{userAccount ? "" : "No "}Wallet Selected</h2>
        {userAccount &&
          <div>
            <div>
              <img src={selectedWallet?.info.icon} alt={selectedWallet?.info.name} />
              <div>{selectedWallet?.info.name}</div>
              <div>({formatAddress(userAccount)})</div>
            </div>
          </div>
        }
      </DialogContent>
    </Dialog>
  )
}
