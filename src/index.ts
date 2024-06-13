#!/usr/bin/env node

import prompts, { prompt } from "prompts";
import { Chains, DebugType, RPCS } from "./constants";
import { debugByData } from "./calldata-debugger";
import { debugByTx } from "./run-debugger";
import { forkDebug } from "./fork-debug";


const main = async () => {
  const { _chain, _type} = await prompts([
    {
      type: 'select',
      name: '_type',
      message: 'Debug type',
      choices: [
        { title: 'From/to/calldata', value: DebugType.CALLDATA },
        { title: 'Experimental', value: DebugType.EXPERIMENTAL },
        { title: 'Replay transaction', value: DebugType.TX },
      ],
    },
    {
      type: 'select',
      name: '_chain',
      message: 'Select chain',
      choices: [
        { title: Chains.KRAS, value: Chains.KRAS },
        { title: Chains.DAR, value: Chains.DAR },
        { title: Chains.FILECOIN, value: Chains.FILECOIN },
        { title: Chains.CALIBRATION, value: Chains.CALIBRATION },
        { title: Chains.ETHEREUM, value: Chains.ETHEREUM },
        { title: Chains.OTHER, value: Chains.OTHER },
      ],
    },
  ]);

  let _rpc = RPCS[_chain as Chains];
  if (_chain === Chains.OTHER) {
    const { rpc } = await prompt({
      type: 'text',
      name: 'rpc',
      message: 'Enter RPC url',
    });
    _rpc = rpc;
  }

  if (_type === DebugType.TX) {
    await debugByTx(_rpc);
  } else if (_type === DebugType.CALLDATA) {
    await debugByData(_rpc);
  } else if (_type === DebugType.EXPERIMENTAL) {
    await forkDebug(_rpc);
  }
};

main();
