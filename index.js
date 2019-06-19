const minimist = require("minimist");
const fs = require("fs");
const madge = require("madge");
const git = require("nodegit-kit");

const blacklist = ["node_modules", "__snapshots__"];
const whitelist = [".test.js"];

const errors = {
  invalidDirectory: "provided directory does not exist",
  emptyBranch: "provided branch must not be empty",
  git: "unable to retrieve git diff for provided directory and branch",
  dependencies: "unable to find file depedencies for provided directory"
};

const help = () =>
  `
Usage:
\t[yarn] ayup [flags]

Flags:
\t-d,\t--directory\t\tThe absolute path of the git repository to watch.
\t-b,\t--branch\t\tThe branch of the git repository to watch.
`;

const logger = (...msgs) => msgs.map(msg => console.log(msg));
const exitWithError = (...errors) =>
  logger("Error", ...errors, help()) && process.exit(1);

const getDirectory = ({ directory, d }) => directory || d;
const getBranch = ({ branch, b }) => branch || b;

const validateDir = args =>
  fs.existsSync(getDirectory(args)) || exitWithError(errors.invalidDirectory);

const validateBranch = args =>
  getBranch(args) || exitWithError(errors.emptyBranch);

const validateArgs = args => validateDir(args) && validateBranch(args);

const getFileDiff = async (directory, branch) =>
  await git
    .open(directory)
    .then(repo =>
      git
        .log(repo, { branch })
        .then(history => [repo, history[0].commit, history[1].commit])
    )
    .then(([repo, commit1, commit2]) =>
      git.diff(repo, commit1, commit2, { "name-only": true })
    )
    .catch(({ message }) => exitWithError(errors.git, message));

const isBlacklisted = file => blacklist.find(term => file.includes(term));
const isWhitelisted = file => whitelist.find(term => file.includes(term));

const unique = arr => [...new Set(arr)];

const getFilesToRun = async (directory, filesDiff) =>
  await madge(directory)
    .then(res =>
      unique(
        filesDiff
          .reduce((list, file) => [...list, ...res.depends(file)], [])
          .concat(filesDiff)
      ).filter(file => !isBlacklisted(file) && isWhitelisted(file))
    )
    .catch(({ message }) => exitWithError(errors.dependencies, message));

const merge = (cargs, iargs) =>
  Object.entries(iargs).reduce(
    (args, [key, value]) =>
      typeof value !== "undefined" ? { ...args, [key]: value } : args,
    cargs
  );

module.exports = async (iargs = {}) => {
  const args = merge(minimist(process.argv.slice(2)), iargs);
  validateArgs(args);

  const directory = getDirectory(args);
  const branch = getBranch(args);
  const filesDiff = await getFileDiff(directory, branch);
  const filesToRun = await getFilesToRun(directory, filesDiff);
  logger(...filesToRun);

  return filesToRun;
};
