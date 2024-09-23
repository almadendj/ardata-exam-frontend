import MintTokenCard from "@/components/MintTokenCard";
import TokensCard from "@/components/TokensCard";
import { Button } from "@/components/ui/button";
import WalletDetailsCard from "@/components/WalletDetailsCard";
import axios from "axios";

export default function Home() {
  const handleBackendCall = async () => {
    const gasPrice = await axios.get("http://localhost:8080/get-gas-price")
    console.log("gas price: ", gasPrice);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px]  justify-items-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center w-full gap-3">
        <WalletDetailsCard />
        <MintTokenCard />
        <TokensCard />
        <Button onClick={handleBackendCall}>
          Get ETH Gas Price
        </Button>
      </main>
    </div>
  );
}
