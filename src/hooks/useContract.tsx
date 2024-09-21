import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useWallet } from "./useWallet";
import { Contract, ethers } from "ethers";
import { contractABI, contractAddress } from "@/lib/contractInfo";
import { useBalances } from "./useBalances";

type ContractProps = {
  mintToken: () => Promise<void>;
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
  const { ethersProvider, address } = useWallet();
  const { updateBalances } = useBalances();
  const [contract, setContract] = useState<Contract>();

  useEffect(() => {
    const getContract = async () => {
      try {
        const signer = await ethersProvider?.getSigner();
        const loadedContract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(loadedContract);
      } catch (error) {
        setContract(undefined);
      }
    };

    getContract();
  }, [contractAddress, contractABI, ethersProvider]);

  const mintToken = useCallback(async () => {
    if (ethersProvider && address && mintPrice) {
      try {
        const tx = await contract?.mint({ value: ethers.parseEther(mintPrice) });
        await tx.wait();

        console.log("Token minted successfully!");
        updateBalances(address);
      } catch (e) {
        console.error("Failed to mint token: ", e);
      }
    }
  }, [ethersProvider, address, mintPrice, contract]);


  const returnValue: ContractProps = {
    mintToken,
    mintPrice
  }

  return <ContractContext.Provider value={returnValue}>
    {children}
  </ContractContext.Provider>
}
