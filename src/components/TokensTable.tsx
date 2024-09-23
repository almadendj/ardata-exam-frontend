'use client'
import { useTokens } from "@/hooks/useTokens";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export default function TokensTable() {
  const { tokens, tokensLoading } = useTokens();

  return (
    <Table className="w-full">
      <TableCaption>
        A list of all your owned NFT's
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
          tokens.map((token) => (
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
