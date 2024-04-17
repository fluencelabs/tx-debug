import prompts from "prompts";
import { execCommand } from "./exec-cast";
import { removeColorSymbols } from "./helpers";

const command = (tx: string, rpc: string) => {
  return `cast run ${tx} --rpc-url ${rpc}`;
};


export const debugByTx = async (rpc: string) => {
  // request from address
  const { _tx } = await prompts([
    {
      type: 'text',
      name: '_tx',
      message: 'Tx hash',
      initial: '0x9dfde0d2bfc38701410c3a4ad2ccb5c681a402d42d3b878195ebff1fecb78fe0',
    },
  ]);
  const cmd = command(_tx, rpc);
  console.log("Tracing with cast...");
  const result = await execCommand(cmd);
  const resultByLines = removeColorSymbols(result).split('\n');
  console.log(resultByLines)
}
