'use client'

import { Toaster } from "@/components/ui/toaster"
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
            <Toaster />
          </ContractProvider>
        </BalancesProvider>
      </WalletProvider>
    </ThemeProvider>
  )
}
