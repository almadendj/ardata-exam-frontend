export interface GenericAPIResponse {
  success: boolean
}

export interface GasPriceResponse extends GenericAPIResponse {
  gas_price: string;
}
