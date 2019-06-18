const minimist = require("minimist");
const fs = require("fs");
const madge = require("madge");
const git = require("nodegit-kit");

const blacklist = ["node_modules"];
const whitelist = [".test.js"];

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
  logger(...errors, help()) && process.exit(1);

const getDirectory = ({ directory, d }) => directory || d;
const getBranch = ({ branch, b }) => branch || b;

const validateDir = args =>
  fs.existsSync(getDirectory(args)) ||
  exitWithError("invalid git directory provided - does not exist");

const validateBranch = args =>
  getBranch(args) ||
  exitWithError("invalid git branch provided - must be non-empty");

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
    .catch(({ message }) =>
      exitWithError("unable to retrieve git information", message)
    );

const isBlacklisted = file => blacklist.find(term => file.includes(term));
const isWhitelisted = file => whitelist.find(term => file.includes(term));

const getFilesToRun = async (directory, filesDiff) =>
  await madge(directory)
    .then(res =>
      filesDiff
        .reduce((list, file) => [...list, ...res.depends(file)], [])
        .filter(file => !isBlacklisted(file) && isWhitelisted(file))
    )
    .catch(({ message }) =>
      exitWithError(
        "unable to find depedencies within provided directory",
        message
      )
    );

module.exports = async () => {
  const args = minimist(process.argv.slice(2));
  validateArgs(args);

  const directory = getDirectory(args);
  const branch = getBranch(args);
  const filesDiff = await getFileDiff(directory, branch);
  const filesToRun = await getFilesToRun(directory, filesDiff);
  logger(...filesToRun);
};
