'use client'
import { Button } from "./ui/button";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import { GasPriceResponse } from "@/types/api";

export default function APICard() {
  const [gasPrice, setGasPrice] = useState("");
  const [gasLoading, setGasLoading] = useState(false);

  const handleBackendCall = async () => {
    try {
      setGasLoading(true);
      const gasPrice = await axios.get<{ result: GasPriceResponse }>("http://localhost:8080/get-gas-price")
      setGasPrice(gasPrice.data.result.gas_price);
    } catch (e) {
      console.error("something went wrong getting gas price:", e);
    } finally {
      setGasLoading(false);
    }
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          API Calls
        </CardTitle>
        <CardDescription>
          Press the buttons to do API Calls from the backend
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <span className="font-bold text-xl">
            Gas Price: {gasLoading ? "Loading..." : gasPrice}
          </span>
          <Button onClick={() => handleBackendCall()}>Get gas Price</Button>
        </div>
      </CardContent>
    </Card>
  );
}
