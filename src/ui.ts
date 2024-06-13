import { CALL, CALLCODE, DELEGATECALL, STATICCALL } from "./const";
import { getOnlyFunction } from "flbot";


type OpEvent = {
  pc: number;
  op: string;
  gas: number;
  gasCost: number;
  memory: string[];
  stack: string[];
  depth: number;
  error: string;
}

const opCodesMap: Record<string, string> = {
  [DELEGATECALL]: "🇩  ",
  [STATICCALL]: "🇸  ",
  [CALL]: "🇨  ",
  [CALLCODE]: "🇨 🇨 ",
  // ...
}

export const opImage = (opEvent: OpEvent, short = true): string => {
  let result = new Array(opEvent.depth).fill('✨').join('');
  result = result + (opCodesMap[opEvent.op] ?? opEvent.op);
  if ([STATICCALL, DELEGATECALL, CALL, CALLCODE].includes(opEvent.op)) {
    const stack = [...opEvent.stack].reverse();
    let [gas, to, argsOffset, argsSize, retOffset, retSize] = stack;
    let value = ""; // TODO null?
    if ([CALL, CALLCODE].includes(opEvent.op)) {
      [gas, to, value, argsOffset, argsSize, retOffset, retSize] = stack;
    }
    const memory = opEvent.memory.join("");
    const internalCalldata = memory.substring(parseInt(argsOffset) * 2, parseInt(argsOffset) * 2 + parseInt(argsSize) * 2); // *2 as we use hex
    const readableArgs = getOnlyFunction(internalCalldata);
    result = result + " " + (short ? formatEthAddress(to) : to);
    if (readableArgs) {
      const functionName = readableArgs.split("\n")[0];
      const args = readableArgs.split("\n").slice(1).join("\n");
      const fnData = formatFunctionCall(functionName, JSON.parse(args || "[]"));
      result = result + " " + (short ? shortenString(fnData) : fnData);
    } else {
      result = result + " " + (short && internalCalldata.length > 20 ? internalCalldata.slice(0, 12) + "..." : internalCalldata);
    }
    
    gas;
    retOffset;
    retSize;
    value;

  }
  return result;
}

export function formatFunctionCall(funcSignature: string, params: any[]): string {
  // Extract the function name from the signature
  const functionName = funcSignature.split('(')[0];

  // Format parameters by recursively handling arrays within arrays
  function formatParams(params: any[]): string {
      return params.map(param => JSON.stringify(param)).join(', ');
  }

  // Construct the function call string
  return `${functionName}(${formatParams(params)})`;
}

export const formatEthAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function shortenString(input: string): string {
  // Regular expression to match Ethereum addresses
  const ethAddressRegex = /0x[a-fA-F0-9]{40}/g;

  // Replace each Ethereum address in the input string
  return input.replace(ethAddressRegex, (match) => formatEthAddress(match));
}
