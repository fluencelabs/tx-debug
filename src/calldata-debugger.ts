import prompts from "prompts";
import { execCommand } from "./exec-cast";
import { removeColorSymbols } from "./helpers";

const command = (from: string, to: string, data: string, value: string, rpc: string) => {
  return `cast call ${to} --from ${from} --data ${data} --value ${parseInt(value)} --trace --rpc-url ${rpc}`;
};


export const debugByData = async (rpc: string) => {
  // request from address
  const { _from, _to, _data, _value } = await prompts([
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
      initial: '0x92163b4b',
    },
    {
      type: 'text',
      name: '_value',
      message: 'Value',
      initial: '0',
    }
  ]);
  // console.log({ _from, _to, _data });
  const cmd = command(_from, _to, _data, _value, rpc);
  console.log("Tracing with cast...");
  const result = await execCommand(cmd);
  // const resultByLines = removeColorSymbols(result).split('\n');
  console.log(removeColorSymbols(result));
}
