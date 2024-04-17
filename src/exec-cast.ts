import { exec } from "child_process";


export const execCommand = async (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(command, (error: any, stdout: string, stderr: any) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        reject(stderr);
      }
      resolve(stdout);
    });
  });
}
