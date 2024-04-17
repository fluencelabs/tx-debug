import prompts from "prompts";
import { execCommand } from "./exec-cast";
import { removeColorSymbols } from "./helpers";

const command = (from: string, to: string, data: string, rpc: string) => {
  return `cast call ${to} --from ${from} --data ${data} --trace --rpc-url ${rpc}`;
};


export const debugByData = async (rpc: string) => {
  // request from address
  const { _from, _to, _data } = await prompts([
    {
      type: 'text',
      name: '_from',
      message: 'From address',
      initial: '0x7ca0941C4ad6f92320FEA73042140dD687053988',
    },
    {
      type: 'text',
      name: '_to',
      message: 'To address',
      initial: '0x7B90337f65fAA2B2B8ed583ba1Ba6EB0C9D7eA44',
    },
    {
      type: 'text',
      name: '_data',
      message: 'Calldata',
      initial: '0x06fdde03',
    },
  ]);
  console.log({ _from, _to, _data });
  const cmd = command(_from, _to, _data, rpc);
  console.log("Tracing with cast...");
  const result = await execCommand(cmd);
  // const resultByLines = removeColorSymbols(result).split('\n');
  console.log(removeColorSymbols(result));
}
