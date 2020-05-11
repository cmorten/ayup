import fs from "fs";
import exitWithError from "../exitWithError";
import { errors } from "../constants";

const validateDir = async ({ directory, git }) => {
  if (!fs.existsSync(directory)) {
    exitWithError(errors.invalidDirectory);
  } else if (!(await git.checkIsRepo())) {
    exitWithError(errors.notGitRepo);
  }
};

export default validateDir;
