'use client'

import { BalancesProvider } from "@/hooks/useBalances"
import { ContractProvider } from "@/hooks/useContract"
import { ThemeProvider } from "@/hooks/useTheme"
import { WalletProvider } from "@/hooks/useWallet"

export default function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <ThemeProvider>
      <WalletProvider>
        <BalancesProvider>
          <ContractProvider>
            {children}
          </ContractProvider>
        </BalancesProvider>
      </WalletProvider>
    </ThemeProvider>
  )
}
