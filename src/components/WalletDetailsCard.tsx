'use client'
import { useWallet } from "@/hooks/useWallet";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useBalances } from "@/hooks/useBalances";
import { Fragment, useState } from "react";
import { WalletProvidersDialog } from "./WalletProvidersDialog";

export default function WalletDetailsCard() {
  const { isConnected, disconnect, address } = useWallet();
  const { ethBalanceLoading, ethBalance } = useBalances();
  const [providersDialogOpen, setProvidersDialogOpen] = useState(false);

  return (
    <Fragment>
      <Card className="w-full">
        <CardHeader className="flex-col md:flex-row justify-between items-start">
          <div className="flex flex-col gap-2">
            <CardTitle>
              {ethBalanceLoading ? (
                "Loading..."
              ) : !isConnected ? (
                "Connect your wallet"
              ) : (
                `${Number(ethBalance).toFixed(8)} ETH`
              )}
            </CardTitle>
            <CardDescription>
              {isConnected && !!address && (
                address
              )}
            </CardDescription>
          </div>
          {isConnected ? (
            <Button className="w-full md:w-max" variant={"destructive"} onClick={() => disconnect()}>
              Disconnect
            </Button>
          ) : (
            <Button onClick={() => setProvidersDialogOpen(true)}>
              Connect Wallet
            </Button>
          )}
        </CardHeader>
      </Card>
      <WalletProvidersDialog
        open={providersDialogOpen}
        setOpen={setProvidersDialogOpen}
      />
    </Fragment>
  );
}
