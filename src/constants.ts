export enum DebugType {
  TX,
  CALLDATA,
  EXPERIMENTAL,
};

export enum Chains {
  FLUENCE = 'Fluence',
  TESTNET = 'Fluence Testnet',
  STAGE = 'Fluence Stage',
  ETHEREUM = 'Ethereum',
  OTHER = 'Other',
};

export const RPCS: Record<Chains, string> = {
  [Chains.FLUENCE]: 'https://rpc.mainnet.fluence.dev',
  [Chains.TESTNET]: 'https://rpc.testnet.fluence.dev',
  [Chains.STAGE]: 'https://rpc.stage.fluence.dev',
  [Chains.ETHEREUM]: 'https://eth.llamarpc.com',
  [Chains.OTHER]: '',
};
