import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function MintTokenCard() {
  return (
    <Card className="w-full">
      <CardHeader className="flex-row justify-between items-start">

        <div className="flex flex-col gap-2">
          <CardTitle>
            Mint Token
          </CardTitle>
          <CardDescription>Enter the details to mint a token</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
