'use client'

import { Toaster } from "@/components/ui/toaster"
import { BalancesProvider } from "@/hooks/useBalances"
import { ContractProvider } from "@/hooks/useContract"
import { ThemeProvider } from "@/hooks/useTheme"
import { TokensProvider } from "@/hooks/useTokens"
import { WalletProvider } from "@/hooks/useWallet"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

export default function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <WalletProvider>
          <BalancesProvider>
            <ContractProvider>
              <TokensProvider>
                {children}
                <Toaster />
              </TokensProvider>
            </ContractProvider>
          </BalancesProvider>
        </WalletProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
