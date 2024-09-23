'use client';
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContract } from "@/hooks/useContract";
import { useWallet } from "@/hooks/useWallet";

type Inputs = {
  tokenName: string;
}

export default function MintTokenCard() {
  const { mintPrice } = useContract();
  const { isConnected } = useWallet();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!isConnected) return; // just to make sure
    console.log(data)
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="flex-col md:flex-row justify-between items-start">
          <div className="flex flex-1 flex-col gap-2">
            <CardTitle>
              Mint Token
            </CardTitle>
            <CardDescription>Enter the details to mint a token</CardDescription>
          </div>
          <div className="w-full flex-1">
            <Input
              {...register("tokenName", { required: "Please enter a token name" })}
              placeholder="Enter name for token"
              error={errors.tokenName?.message ?? ""}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Button disabled={!isConnected} className="w-full">
            {!isConnected ? (
              "Please connect your wallet"
            ) : (
              <>
                Mint Token: {mintPrice} ETH
              </>
            )}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
