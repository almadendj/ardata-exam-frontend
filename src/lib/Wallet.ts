import { ethers, formatEther } from "ethers";
import axios, { AxiosResponse } from "axios";
import { TransactionResponse } from "@/types/common";

export class Wallet {
  private provider: ethers.BrowserProvider;
  private address: string;
  private apiUrl: string;
  private apiKey: string;

  constructor(provider: ethers.BrowserProvider, address: string) {
    const apiUrl = process.env.NEXT_PUBLIC_ETHER_API_URL ?? "";
    const apiKey = process.env.NEXT_PUBLIC_ETHER_API_KEY ?? "";

    if (!apiUrl || !apiKey) throw Error("Please set API KEY & URL in env");
    if (!provider) throw Error("No provider.");
    if (!address) throw Error("No address.");

    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
    this.provider = provider;
    this.address = address;
  }

  public async getBalance(): Promise<string> {
    const balance = await this.provider.getBalance(this.address);
    return formatEther(balance);
  }

  public async getTransactions(limit: number = 10): Promise<TransactionResponse> {
    const urlQuery = `${this.apiUrl}?module=account&action=txlist&address=${this.address}&startblock=0&endblock=99999999&page=1&offset=${limit}&sort=asc&apiKey=${this.apiKey}`

    const etherscanResponse: AxiosResponse<TransactionResponse> = await axios.get(urlQuery);

    return etherscanResponse.data;
  }
}
