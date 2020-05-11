const getCommitDiff = async ({ git }) =>
  await git.diff(["--name-only", "--diff-filter=d", "HEAD", "HEAD~1"]);

export default getCommitDiff;
