import logger from "./logger";
import { help } from "./constants";

const exitWithError = (...errors) => {
  logger("ERROR:", ...errors, help);
  process.exit(1);
};

export default exitWithError;
