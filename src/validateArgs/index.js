import validateDir from "./validateDir";
import validateBranch from "./validateBranch";

const validateArgs = async ({ branch, directory, git }) => {
  await validateDir({ directory, git });
  await validateBranch({ branch, git });
};

export default validateArgs;
