import { ethers, formatEther } from "ethers";

export class Wallet {
  private provider: ethers.BrowserProvider;

  constructor(provider: ethers.BrowserProvider) {
    if (!provider) throw Error("No provider.");
    this.provider = provider;
  }

  public async getBalance(address: string): Promise<string> {
    if (!address) throw Error("No address.");

    console.log("fetching address for: ", address);
    const balance = await this.provider.getBalance(address);
    return formatEther(balance);
  }
}
