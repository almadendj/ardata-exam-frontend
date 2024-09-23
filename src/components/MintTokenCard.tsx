'use client';
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContract } from "@/hooks/useContract";

type Inputs = {
  tokenName: string;
}

export default function MintTokenCard() {
  const { mintPrice } = useContract();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="flex-row justify-between items-start">
          <div className="flex flex-1 flex-col gap-2">
            <CardTitle>
              Mint Token
            </CardTitle>
            <CardDescription>Enter the details to mint a token</CardDescription>
          </div>
          <Input
            {...register("tokenName", { required: "Please enter a token name" })}
            className="flex-1"
            placeholder="Enter name for token"
            error={errors.tokenName?.message ?? ""}
          />
        </CardHeader>
        <CardContent>
          <Button className="w-full">Mint Token: {mintPrice}</Button>
        </CardContent>
      </form>
    </Card>
  );
}
