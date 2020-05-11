const getCurrentBranch = async ({ git }) => {
  try {
    return (await git.raw(["rev-parse", "--abbrev-ref", "HEAD"])).trim();
  } catch (_) {
    return "";
  }
};

export default getCurrentBranch;
