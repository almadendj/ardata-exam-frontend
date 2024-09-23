'use client'

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useContract } from "./useContract";
import { useWallet } from "./useWallet";
import { useBalances } from "./useBalances";

type TokenDetails = {
  id: string;
  name: string;
}

type TokensProps = {
  tokenIds?: number[];
  tokens?: TokenDetails[];
  tokenIdsLoading: boolean;
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

  const fetchOwnedTokens = async () => {
    if (!contract || !address) return [];

    const tokensResult = await contract.tokensOfOwner(address);
    return tokensResult.map((token: any) => Number(token));
  };

  const fetchTokenDetails = async (tokenIds: number[]) => {
    if (!contract) return [];

    const tokenDetailsPromises = tokenIds.map(async (tokenId) => {
      const tokenName = await contract.getTokenName(tokenId);
      return { id: String(tokenId), name: tokenName };
    });

    return Promise.all(tokenDetailsPromises);
  };

  const { data: tokenIds = [], isLoading: tokenIdsLoading } = useQuery<number[]>({
    queryKey: ['tokenIds', address, tokenBalance],
    queryFn: fetchOwnedTokens,
    enabled: !!address && !!contract
  });

  const { data: tokens = [], isLoading: tokensLoading } = useQuery<TokenDetails[]>({
    queryKey: ['tokens', tokenIds],
    queryFn: () => fetchTokenDetails(tokenIds!),
    enabled: tokenIds.length > 0 && !!contract
  })

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

