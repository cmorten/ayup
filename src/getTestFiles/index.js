import unique from "./unique";
import isBlacklisted from "./isBlacklisted";
import isWhitelisted from "./isWhitelisted";

const getTestFiles = ({ files, graph }) =>
  unique(
    files
      .reduce((list, file) => [...list, ...graph.depends(file)], [])
      .concat(files)
  ).filter((file) => !isBlacklisted(file) && isWhitelisted(file));

export default getTestFiles;
