const errors = {
  invalidDirectory: "Provided directory does not exist.",
  notGitRepo: "Provided directory is not an initialised git repo.",
  emptyBranch: "Provided branch must not be empty.",
  notValidBranch: "Provided branch does not exist.",
  git: "Unable to retrieve git diff for provided directory and branch.",
};

const blocklist = ["node_modules", "__snapshots__"];
const allowlist = [".test.js", ".spec.js"];

const defaultDirectory = "./";

const help = `
Usage:
\t[yarn] ayup [flags]

Flags:
\t-d,\t--directory\t\tThe path of the git repository to analyse.
\t-b,\t--branch\t\tThe branch of the git repository to analyse.
`;

export { errors, blocklist, allowlist, defaultDirectory, help };
