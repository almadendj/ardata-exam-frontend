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

        setMintPrice(ethers.formatEther(mintPrice));
        setWeiMintPrice(Number(mintPrice));
        setContract(loadedContract);
      } catch (error) {
        console.error("Error in contract interaction:", error);
        setContract(undefined);
        setMintPrice("");
      }
    };

    getContract();
  }, [contractAddress, contractABI, ethersProvider, setMintPrice]);

  const mintToken = useCallback(async (tokenName: string) => {
    // TODO: better error handling
    if (!contract || !address || !weiMintPrice || !ethersProvider) return;

    try {
      const nonce = await ethersProvider.getTransactionCount(address);
      const tx = await contract.mintToken(tokenName, { value: weiMintPrice, nonce: nonce });
      await tx.wait();

      console.log("Token minted successfully!");
      updateBalances(address);
    } catch (e) {
      console.error("Failed to mint token: ", e);
    }
  }, [address, weiMintPrice, contract, ethersProvider]);

  const getOwnedTokens = useCallback(async () => {
    if (!contract) return;
    try {
      const tokensResult = await contract?.tokensOfOwner(address);
      const tokens = tokensResult.map((token: any) => Number(token));
      console.log("tokens: ", tokens);
    } catch (e) {
      console.error("Failed to get owned tokens: ", e);
    }
  }, [address, contract]);

  const getTokenDetails = useCallback(async () => {
    if (!contract) return;

    try {
      const token = await contract.getTokenName(0);
      console.log("token: ", token);
    } catch (e) {
      console.error("Failed to get token details: ", e);
    }
  }, [!contract]);

  useEffect(() => {
    getOwnedTokens();
    getTokenDetails();
  }, [getOwnedTokens, getTokenDetails])

  const returnValue: ContractProps = {
    mintToken,
    mintPrice
  }

  return <ContractContext.Provider value={returnValue}>
    {children}
  </ContractContext.Provider>
}
