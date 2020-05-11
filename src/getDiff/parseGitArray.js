const parseGitArray = (arrayStr) => {
  if (arrayStr === null) {
    return [];
  }

  return arrayStr
    .trim()
    .split(/\r?\n/)
    .filter((str) => str.length);
};

export default parseGitArray;
