'use client'
import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet, arbitrum } from "@reown/appkit/networks";

const projectId: string = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID ?? "";

const ethersAdapter = new EthersAdapter();

const metadata = {
  name: 'ARData Frontend',
  description: 'ARData Frontend',
  url: 'http://localhost:3000',
  icons: []
}

createAppKit({
  adapters: [ethersAdapter],
  metadata: metadata,
  networks: [mainnet, arbitrum],
  projectId,
})

export function AppKit({ children }: { children?: React.ReactNode }) {
  return children;
}
