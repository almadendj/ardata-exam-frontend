import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export default function MintTokenCard() {
  return (
    <Card className="w-full">
      <CardHeader className="flex-row justify-between items-start">
        <div className="flex flex-1 flex-col gap-2">
          <CardTitle>
            Mint Token
          </CardTitle>
          <CardDescription>Enter the details to mint a token</CardDescription>
        </div>
        <Input className="flex-1" placeholder="Enter name for token" />
      </CardHeader>
      <CardContent>
        <Button className="w-full">Mint Token</Button>
      </CardContent>
    </Card>
  );
}
