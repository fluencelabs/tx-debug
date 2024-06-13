import axios from "axios";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { opImage } from "./ui";
import { CALL, CALLCODE, DELEGATECALL, STATICCALL } from "./const";
import { initSelectors } from "flbot";
import prompts from "prompts";
import { AccordionData, showAccordion } from "console-accordion";

let anvilSingleton: ChildProcessWithoutNullStreams | null = null;

const PORT = 9996;

export const hasRunningAnvil = (): boolean => {
  return anvilSingleton !== null;
};

export const execAnvilFork = async (rpcUrl: string): Promise<void> => {
  if (anvilSingleton) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    anvilSingleton = spawn("anvil", [
      "-p",
      PORT.toString(),
      "--fork-url",
      rpcUrl,
    ]);
  
    anvilSingleton.stdout.on('data', (_data) => {
      // console.log(`stdout: ${data}`);
      // TODO check "Listening on 127.0.0.1:9997"
      resolve();
    });
    
    anvilSingleton.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      anvilSingleton?.kill();
      anvilSingleton = null;
      reject();
    });
    
    anvilSingleton.on('close', (_code) => {
      // console.log(`child process exited with code ${code}`);
      anvilSingleton = null;
      reject();
    }); 
  });
}

export const terminateAnvil = (): boolean => {
  return anvilSingleton?.kill() ?? false;
}

// const main = async () => {
//   console.log(
//     formatFunctionCall(
//       "setFederatedPower(address[],bytes[],uint256[])",
//       [
//         [
//           "0x7E6bCAC9B600394ea1C7C38eA72cc56F57374c87",
//           "0xBF20b7664FEFb791A1dBB9a9308e1573063113c6",
//           "0x0a35741418Da8238c8BA4c50C83A660164F75daf",
//           "0xE8E8ED5Fd65a10200971C3e1e731c1aa49e994b5",
//           "0xB07E170EFF06CE9B96d1d1710CE404382aeBEa88",
//           "0x8c271BA18B42fa6c414f4c668D6d893551d4cD85",
//           "0x6d8Ffd463FcD5FA48EA114Defc015831995e4207",
//           "0x94C72DBB3FA675eB4bE1B3cCDFc6CF851092cbBC",
//           "0x6ce52FFA12a9550A55675f6A9c6CF55b5eB944f6",
//           "0xDc83188b36744A884Af3919493762DDdc77B373e",
//           "0x04dd467171B754b6c7F7C38acBDC1FcF20a3C330",
//           "0x75f46a07294A497914b3C3A851D18FD5354288c0",
//           "0x568824d3d8e01d7E0336F321048caaeed8d43Dd2",
//           "0x7058755aEe20c1F170De6300bB9Bb177861a9a44"
//         ],
//         [
//           "0x045197627a4a7f89458469255afb8711ab4c7bc4a76281376cb361c29bd0d9626758d47feadf43d77f843725cbad419e655d8689369c1ce59ccdaa67d47bd0ddf7",
//           "0x046ed27e5db71c4e7ec3b4498ee06913a59183e5c87f169652c92e7cc042f629088ef949c488135055722b8237009e7a77f4337185cbc89a6be60c0a63cfc72a2e",
//           "0x0475f2cbafbf3425ec8bccd96471ca65f8287f7cf51632a02de07e755e602a3f8fde1764936bd39dc72bf6cb52ba4cb793d42e5ec39465593f12e7a9d79c89d9ce",
//           "0x0454d737a8759eafadcf00a45708a8d602942ff86d22f0e312a40d32dfab30b665e324a045ef3871d0fa448764317f783a3185bc5541c0c141fdea96f971dda0fb",
//           "0x04683bac106c55e182fd47ddea0b200fc26a73b9c757c7a95ca166bb55ce468dbfda0933e569ce712138e36eed18b60cc7e1bd327296eeda9ddbe522798ede2290",
//           "0x040c42d1f0f193a07c2bed6650417fe10fe6a50eed429bdd54bbe993b5f5f48ddf8a7b922551d552b06547d049b8c2eef5a05b16ffa9414d12f2e9dac582756e01",
//           "0x0469ffff7be09bb0ea4b14d32f7d87621119ee8093937e1ea4937797dd16cece9b963363df3a2845b6928dab2c3744129ea4afe454654b2cd0a0301f5665fecdd7",
//           "0x047d190364263990e8b5bc45032baac70d7ed7fc44cac3a003fd74a87ede4ee080730655961af70bfe40575eb0ce67eaa346b246ba2968319d6e9ae27e41ef06a3",
//           "0x04f2c72208decfad0f769d8de7dcfc5292d260c63c4d7324b792d55a79ca97cf5b945482033863c49c7c1b33db3411e54443e449f3db91e8c1264d820a56dcffc9",
//           "0x0432eb1d0014286f77449cf789e2768eaa2502ff102d5efa9177cc59a4a1df00bc978cac7335ed88e42cbc1c1e4e018d2ca3862c683903cfa66b9684a44b2a51d2",
//           "0x04d04c1f2e01c8928cb7e55e0847b5be79cf8360f4a6a01144e9ea4e570e9116a621b96e0c500ec7cb53768195cad13b161b8f5c327f9c7f78394af4bd081dd4d6",
//           "0x04a95c74edbd664d5b02f5771be83320ba623c08684c2919e6b0d14b8770236784616c3f9917c7cb0d1c1df8082439cab5abc7e97b8413b230cb0b99f424c3cb93",
//           "0x04dbd94bfa2132e525d9cf3cb7d776f34ec311186c95ffcf9451afd1582175e4eaa3504821d91db57edb69152179c1e61f22d715fdc6059eb8df68dcf9bcf1065c",
//           "0x0435e9b95277b1b41516aec360163cc8e041e715a5d81c1a0e6a17d40365ea0a25d87a058d6164c348b2fa3cd55710d3b41943f408c6301918717a68557231c8bf"
//         ],
//         [
//           "100000",
//           "100000",
//           "100000",
//           "100000",
//           "100000",
//           "100000",
//           "1000",
//           "1000",
//           "1000",
//           "1000",
//           "1000",
//           "1000",
//           "100000",
//           "100000"
//         ]
//       ]
//     )
//   )
//   return;
//   await initSelectors();
//   await execAnvilFork("https://ipc.kras.fluence.dev");
//   console.log("Anvil started");
//   await new Promise((rs) => setTimeout(rs, 1000));
//   await traceCall(
//     "0x658Be5F3f4406045C58303F08EAE81e0625E83d2",
//     "0xEd10D80D239493bac784069A7791A52B8F1107B9",
//     "0x4a0e21690155122000000000000000000000000000000000000000000000000000000000821ffd6a0e20b959d6338b417f427439da254c7d4a30b0c5868b9e332653b04e000000000000000000000000e277d4cb6e522769e7962fb239d5342138891be600000000000000000000000000000000000000000000000000000000000f424000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000186a00000000000000000000000000000000000000000000000000000000000000180000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001a0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
//   );
//   terminateAnvil();
// }

// main();

export const forkDebug = async (rpc: string) => {
  try {
    const { _from, _to, _data, _value } = await prompts([
      {
        type: 'text',
        name: '_from',
        message: 'From address',
        initial: '0x34612D67ba11E61118b0337931A45dD98A3C645e',
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
        initial: '0x4ece5685636b121ada6c5ef8282a9e514ad31c4dcee394ecbe586ba0abb84de1dbcde66cba1682bd31419c71b471bf3debc105dd7f3dc9393b10f9582c02cdd3aa1acf6c0000106960d86160c9ac591aec4870123272f36dd9e44ac4484361be6f3a1b3f',
      },
      {
        type: 'text',
        name: '_value',
        message: 'Value',
        initial: '0',
      }
    ]);

    await initSelectors();
    await execAnvilFork(rpc);
    console.log("Anvil started");
    await new Promise((rs) => setTimeout(rs, 1000));
    await traceCall(_from, _to, _data, _value);
  } finally {
    terminateAnvil();
  }
};

export const traceCall = async (
  from: string,
  to: string,
  data: string,
  value: string,
) => {
  const request = {
    "jsonrpc":"2.0",
    "method":"debug_traceCall",
    "params":[
      {
        from,
        to,
        data,
        value: `0x${parseInt(value).toString(16)}`,
      },
      "latest",
      {"stepsTracing": true, "enableMemory": true}
    ],
    "id": "1",
  };
  const resp = await axios.post(
    `http://127.0.0.1:${PORT}`,
    request,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const { data: httpData } = resp;
  const { result } = httpData;
  const { failed, gas, returnValue, structLogs } = result;
  console.log({ failed, gas, returnValue });
  const accordionData: AccordionData = [];
  const accordionTitle = (short: boolean) => `
Failed: ${failed}
Gas: ${gas}
Return value: ${short ? returnValue.slice(0, 20) + "..." : returnValue}
  `.trim();
  accordionData.push({
    title: accordionTitle(true),
    replace: accordionTitle(false),
  });
  for (let i = 0; i < structLogs.length; i++) {
    const log = structLogs[i];
    if ([DELEGATECALL, STATICCALL, CALL, CALLCODE].includes(log.op)) {
      accordionData.push({
        title: opImage(log, true),
        replace: opImage(log, false),
      });
    }
  }
  // console.log(accordionTitle, accordionData)
  showAccordion(accordionData);
};
