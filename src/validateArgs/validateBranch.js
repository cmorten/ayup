import exitWithError from "../exitWithError";
import { errors } from "../constants";

const validateBranch = async ({ branch, git }) => {
  if (!branch) {
    exitWithError(errors.emptyBranch);
  }

  try {
    await git.checkout(branch);
  } catch (error) {
    exitWithError(errors.notValidBranch, error);
  }
};

export default validateBranch;
