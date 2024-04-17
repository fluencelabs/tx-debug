export enum DebugType {
  TX,
  CALLDATA,
};

export enum Chains {
  KRAS = 'Kras',
  DAR = 'Dar',
  FILECOIN = 'Filecoin',
  CALIBRATION = 'Calibration',
  OTHER = 'Other',
};

export const RPCS: Record<Chains, string> = {
  [Chains.KRAS]: 'https://ipc.kras.fluence.dev',
  [Chains.DAR]: 'https://ipc.dar.fluence.dev',
  [Chains.FILECOIN]: 'https://rpc.ankr.com/filecoin',
  [Chains.CALIBRATION]: 'https://rpc.ankr.com/filecoin_testnet',
  [Chains.OTHER]: '',
};
