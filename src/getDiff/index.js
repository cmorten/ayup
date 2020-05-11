import getCommitDiff from "./getCommitDiff";
import getUntrackedDiff from "./getUntrackedDiff";
import parseGitArray from "./parseGitArray";
import exitWithError from "../exitWithError";
import { errors } from "../constants";

const getDiff = async ({ git }) => {
  try {
    const diff = await getCommitDiff({ git });
    const untracked = await getUntrackedDiff({ git });

    return [...parseGitArray(diff), ...parseGitArray(untracked)];
  } catch (error) {
    exitWithError(errors.git, error);
  }
};

export default getDiff;
