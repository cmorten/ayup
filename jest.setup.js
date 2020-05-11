/* eslint-disable no-console */

console.error = (errorMessage) => {
  throw new Error(errorMessage);
};

process.exit = (code) => {
  throw new Error(`process.exit called with "${code}"`);
};
