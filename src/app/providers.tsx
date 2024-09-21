'use client'

import { BalancesProvider } from "@/hooks/useBalances"
import { WalletProvider } from "@/hooks/useWallet"

export default function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <WalletProvider>
      <BalancesProvider>
        {children}
      </BalancesProvider>
    </WalletProvider>
  )
}
