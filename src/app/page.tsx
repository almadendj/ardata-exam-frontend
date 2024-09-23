'use client'
import APICard from "@/components/APICard";
import MintTokenCard from "@/components/MintTokenCard";
import TokensCard from "@/components/TokensCard";
import WalletDetailsCard from "@/components/WalletDetailsCard";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px]  justify-items-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center w-full gap-3">
        <WalletDetailsCard />
        <MintTokenCard />
        <TokensCard />
        <APICard />
      </main>
    </div>
  );
}
