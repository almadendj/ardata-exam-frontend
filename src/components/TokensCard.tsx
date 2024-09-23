import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import TokensTable from "./TokensTable";

export default function TokensCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          NFT's
        </CardTitle>
        <CardDescription>
          A list of all your owned NFT's
        </CardDescription>
        <CardContent>
          <TokensTable />
        </CardContent>
      </CardHeader>
    </Card>
  );
}
