'use client'

import { WalletProvidersDialog } from "@/components/WalletProvidersDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@/hooks/useWallet";
import { Fragment, useState } from "react";

export default function Home() {
  const { isConnected, disconnect } = useWallet();
  const [providersDialogOpen, setProvidersDialogOpen] = useState(false);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">

        <Card>
          <CardHeader>
            <CardTitle>
              Connect your wallet
            </CardTitle>
            <CardDescription>
              This is for ARData Tech Exam
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isConnected ? (
              <Fragment>
                <span>
                  Wallet Connected
                </span>
                <Button variant={"destructive"} onClick={() => disconnect()}>
                  Disconnect
                </Button>
              </Fragment>
            ) : (
              <Button onClick={() => setProvidersDialogOpen(true)}>
                Connect Wallet
              </Button>
            )}
          </CardContent>
        </Card>

      </main>

      <WalletProvidersDialog
        open={providersDialogOpen}
        setOpen={setProvidersDialogOpen}
      />
    </div>
  );
}
