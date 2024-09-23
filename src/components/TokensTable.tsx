'use client'
import { useTokens } from "@/hooks/useTokens";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { useWallet } from "@/hooks/useWallet";

export default function TokensTable() {
  const { isConnected } = useWallet();
  const { tokens, tokensLoading } = useTokens();

  return (
    <Table className="w-full">
      <TableCaption>
        {isConnected ? (
          "A list of all your owned NFT's"
        ) : (
          "Please connect your wallet"
        )}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            Token ID
          </TableHead>
          <TableHead>
            Token Name
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!tokensLoading && (
          isConnected && tokens.map((token) => (
            <TableRow key={`token-${token.id}`}>
              <TableCell>
                {token.id}
              </TableCell>
              <TableCell>
                {token.name}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
