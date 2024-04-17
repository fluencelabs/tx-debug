import prompts from "prompts";
import { Chains } from "./constants";
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
      initial: '0xb0f7AceA17aE7892B0432e89E467f55f57B76Cef',
    },
    {
      type: 'text',
      name: '_data',
      message: 'Calldata',
      initial: '0xac9650d80000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000084886f0e87c5ca4571f567a8a3294d6213164a86eb4bca719ed6406105aa31237bdca3c329000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000aae6000000000000000000000000000000000000000000000000000000000',
    },
  ]);
  console.log({ _from, _to, _data });
  const cmd = command(_from, _to, _data, rpc);
  console.log("Tracing with cast...");
  const result = await execCommand(cmd);
  const resultByLines = removeColorSymbols(result).split('\n');
  console.log(resultByLines)
}
