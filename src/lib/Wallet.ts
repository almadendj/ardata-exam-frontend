import { ethers, formatEther } from "ethers";

export class Wallet {
  private provider: ethers.BrowserProvider;
  private address: string;
  private apiUrl: string;

  constructor(provider: ethers.BrowserProvider, address: string) {
    const apiUrl = process.env.NEXT_PUBLIC_ETHER_API_URL ?? "";

    if (!apiUrl) throw Error("Please set API URL in env");
    if (!provider) throw Error("No provider.");
    if (!address) throw Error("No address.");

    this.apiUrl = apiUrl;
    this.provider = provider;
    this.address = address;
  }

  public async getBalance(): Promise<string> {
    const balance = await this.provider.getBalance(this.address);
    return formatEther(balance);
  }

  public async getTransactions(limit: number = 10) {
    return this.apiUrl;
  }
}
