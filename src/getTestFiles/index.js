import unique from "./unique";
import isBlocklisted from "./isBlocklisted";
import isAllowlisted from "./isAllowlisted";

const getTestFiles = ({ files, graph }) =>
  unique(
    files
      .reduce((list, file) => [...list, ...graph.depends(file)], [])
      .concat(files)
  ).filter((file) => !isBlocklisted(file) && isAllowlisted(file));

export default getTestFiles;
