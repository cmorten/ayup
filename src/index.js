import minimist from "minimist";
import madge from "madge";
import gitPromise from "simple-git/promise";

import getDirectory from "./getDirectory";
import getBranch from "./getBranch";
import validateArgs from "./validateArgs";
import getDiff from "./getDiff";
import getTestFiles from "./getTestFiles";
import logger from "./logger";

const ayup = async (iArgs = {}) => {
  const args = { ...minimist(process.argv.slice(2)), ...iArgs };
  const directory = getDirectory(args);
  const git = gitPromise(directory);
  const branch = await getBranch({ ...args, git });

  await validateArgs({ branch, directory, git });

  const files = await getDiff({ git });
  const graph = await madge(directory);
  const testFiles = await getTestFiles({ files, graph });

  if (args.cli) {
    logger(...testFiles);
  }

  return testFiles;
};

export default ayup;
