import { ethers, formatEther } from "ethers";

export class Wallet {
  private provider: ethers.BrowserProvider;
  private address: string;

  constructor(provider: ethers.BrowserProvider, address: string) {
    if (!provider) throw Error("No provider.");
    if (!address) throw Error("No address.");

    this.provider = provider;
    this.address = address;
  }

  public async getBalance(): Promise<string> {
    const balance = await this.provider.getBalance(this.address);
    return formatEther(balance);
  }
}
