'use client'

import { WalletProvidersDialog } from "@/components/WalletProvidersDialog";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBalances } from "@/hooks/useBalances";
import { useWallet } from "@/hooks/useWallet";
import { Fragment, useState } from "react";

export default function Home() {
  const { isConnected, disconnect, address } = useWallet();
  const { tokenBalance, tokenBalanceLoading } = useBalances();
  const [providersDialogOpen, setProvidersDialogOpen] = useState(false);

  return (
    <Fragment>
      <div className="grid grid-rows-[20px_1fr_20px]  justify-items-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col row-start-2 items-center w-full">
          <Card className="w-full">
            <CardHeader className="flex-row justify-between items-start">
              <div className="flex flex-col gap-2">
                <CardTitle>
                  {tokenBalanceLoading ? (
                    "Loading..."
                  ) : !isConnected ? (
                    "Connect your wallet"
                  ) : (
                    `${tokenBalance} ARDT`
                  )}
                </CardTitle>
                <CardDescription>
                  {isConnected && !!address && (
                    address
                  )}
                </CardDescription>
              </div>
              {isConnected ? (
                <Button variant={"destructive"} onClick={() => disconnect()}>
                  Disconnect
                </Button>
              ) : (
                <Button onClick={() => setProvidersDialogOpen(true)}>
                  Connect Wallet
                </Button>
              )}
            </CardHeader>
          </Card>
        </main>
      </div>

      <WalletProvidersDialog
        open={providersDialogOpen}
        setOpen={setProvidersDialogOpen}
      />
    </Fragment>
  );
}
