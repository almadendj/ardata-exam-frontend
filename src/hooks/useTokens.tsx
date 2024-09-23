'use client'

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useContract } from "./useContract";
import { useWallet } from "./useWallet";
import { useBalances } from "./useBalances";

type TokenDetails = {
  id: string;
  name: string;
}

type TokensProps = {
  tokenIds: number[];
  tokenIdsLoading: boolean;
  tokens: TokenDetails[]
  tokensLoading: boolean;
}

const TokensContext = createContext<TokensProps | null>(null);

export function useTokens() {
  const context = useContext(TokensContext);

  if (!context) throw Error("useTokens must be used within a TokensProvider");

  return context;
}

export function TokensProvider({ children }: { children?: React.ReactNode }) {
  const { address } = useWallet();
  const { tokenBalance } = useBalances();
  const { contract } = useContract();
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [tokens, setTokens] = useState<TokenDetails[]>([]);
  const [tokenIdsLoading, setTokenIdsLoading] = useState(false);
  const [tokensLoading, setTokensLoading] = useState(false);

  const getOwnedTokens = useCallback(async () => {
    if (!contract) return;
    setTokenIdsLoading(true);
    setTokensLoading(true);

    try {
      const tokensResult = await contract?.tokensOfOwner(address);
      const tokensResultIds: number[] = tokensResult.map((token: any) => Number(token));
      setTokenIds(tokensResultIds);
      setTokenIdsLoading(false);

      const tokenDetailsPromises = tokensResultIds.map(async (tokenId): Promise<TokenDetails> => {
        const tokenName = await contract.getTokenName(tokenId);
        return { id: String(tokenId), name: tokenName }
      })

      const tokenDetails = await Promise.all(tokenDetailsPromises);
      setTokensLoading(false);
      setTokens(tokenDetails);
    } catch (e) {
      console.error("Failed to get owned tokens: ", e);
    } finally {
      setTokensLoading(false);
      setTokenIdsLoading(false);
    }
  }, [address, contract]);

  useEffect(() => {
    getOwnedTokens();
  }, [tokenBalance, getOwnedTokens, address, contract]); // update tokens then tokenBalance is updated

  const tokensValue: TokensProps = {
    tokenIds,
    tokens,
    tokenIdsLoading,
    tokensLoading
  }

  return (
    <TokensContext.Provider value={tokensValue}>
      {children}
    </TokensContext.Provider>
  );
}
