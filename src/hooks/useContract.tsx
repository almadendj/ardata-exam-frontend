import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useWallet } from "./useWallet";
import { Contract, ethers } from "ethers";
import { contractABI, contractAddress } from "@/lib/contractInfo";
import { useBalances } from "./useBalances";

type ContractProps = {
  mintToken: (tokenName: string) => Promise<void>;
  mintPrice: string;
  contract?: Contract;
}

const ContractContext = createContext<ContractProps | null>(null);

export function useContract() {
  const context = useContext(ContractContext);

  if (!context) throw Error("useContract must be used within a ContractProvider");

  return context;
}

export function ContractProvider({ children }: { children?: React.ReactNode }) {
  const [mintPrice, setMintPrice] = useState("");
  const [weiMintPrice, setWeiMintPrice] = useState<number>(0);
  const { ethersProvider, address } = useWallet();
  const { updateBalances } = useBalances();
  const [contract, setContract] = useState<Contract>();

  useEffect(() => {
    const getContract = async () => {
      try {
        const signer = await ethersProvider?.getSigner();
        if (!signer) return;

        const loadedContract = new ethers.Contract(contractAddress, contractABI, signer);
        const mintPrice = await loadedContract.mintPrice();

        setContract(loadedContract);
        setMintPrice(ethers.formatEther(mintPrice));
        setWeiMintPrice(Number(mintPrice));
      } catch (error) {
        console.error("Error in contract interaction:", error);
        setMintPrice("");
      }
    };

    getContract();
  }, [contractAddress, contractABI, ethersProvider, setMintPrice]);

  const mintToken = useCallback(async (tokenName: string) => {
    if (!contract || !address || !weiMintPrice || !ethersProvider) return;

    const nonce = await ethersProvider.getTransactionCount(address);
    const tx = await contract.mintToken(tokenName, { value: weiMintPrice, nonce: nonce });
    await tx.wait();

    updateBalances(address);
  }, [address, weiMintPrice, contract, ethersProvider]);

  const returnValue: ContractProps = {
    mintToken,
    mintPrice,
    contract
  }

  return <ContractContext.Provider value={returnValue}>
    {children}
  </ContractContext.Provider>
}
