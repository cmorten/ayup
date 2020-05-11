import path from "path";
import { defaultDirectory } from "./constants";

const getDirectory = ({ directory, d }) =>
  path.resolve(directory || d || defaultDirectory);

export default getDirectory;
