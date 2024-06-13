export enum DebugType {
  TX,
  CALLDATA,
  EXPERIMENTAL,
};

export enum Chains {
  KRAS = 'Kras',
  DAR = 'Dar',
  FILECOIN = 'Filecoin',
  CALIBRATION = 'Calibration',
  ETHEREUM = 'Ethereum',
  OTHER = 'Other',
};

export const RPCS: Record<Chains, string> = {
  [Chains.KRAS]: 'https://ipc.kras.fluence.dev',
  [Chains.DAR]: 'https://ipc.dar.fluence.dev',
  [Chains.FILECOIN]: 'https://rpc.ankr.com/filecoin',
  [Chains.CALIBRATION]: 'https://rpc.ankr.com/filecoin_testnet',
  [Chains.ETHEREUM]: 'https://eth.llamarpc.com',
  [Chains.OTHER]: '',
};
