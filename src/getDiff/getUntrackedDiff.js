const getUntrackedDiff = async ({ git }) =>
  await git.raw(["ls-files", "--others", "--exclude-standard"]);

export default getUntrackedDiff;
