import getCurrentBranch from "./getCurrentBranch";

const getBranch = async ({ branch, b, git }) =>
  branch || b || (await getCurrentBranch({ git }));

export default getBranch;
