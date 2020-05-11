import getCommitDiff from "./getCommitDiff";

const mockGit = {
  diff: jest.fn(),
};
const mockDiff = Symbol("test-diff");

describe("getCommitDiff", () => {
  let result;
  beforeEach(async () => {
    jest.clearAllMocks();
    mockGit.diff.mockResolvedValue(mockDiff);

    result = await getCommitDiff({ git: mockGit });
  });

  it("should call 'git.diff' with the '--name-only' and '--diff-filter=d' flags and the commit range 'HEAD' to 'HEAD~1'", () => {
    expect(mockGit.diff).toHaveBeenCalledWith([
      "--name-only",
      "--diff-filter=d",
      "HEAD",
      "HEAD~1",
    ]);
  });

  it("should return the diff", () => {
    expect(result).toEqual(mockDiff);
  });
});
