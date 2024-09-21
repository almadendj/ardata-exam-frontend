'use client'

import { BalancesProvider } from "@/hooks/useBalances"
import { ContractProvider } from "@/hooks/useContract"
import { WalletProvider } from "@/hooks/useWallet"

export default function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <WalletProvider>
      <BalancesProvider>
        <ContractProvider>
          {children}
        </ContractProvider>
      </BalancesProvider>
    </WalletProvider>
  )
}
