import getUntrackedDiff from "./getUntrackedDiff";

const mockGit = {
  raw: jest.fn(),
};
const mockUntrackedDiff = Symbol("test-untracked-diff");

describe("getUntrackedDiff", () => {
  let result;
  beforeEach(async () => {
    jest.clearAllMocks();
    mockGit.raw.mockResolvedValue(mockUntrackedDiff);

    result = await getUntrackedDiff({ git: mockGit });
  });

  it("should call 'git.raw' with the 'ls-files' command and '--others' and '--exclude-standard' flags", () => {
    expect(mockGit.raw).toHaveBeenCalledWith([
      "ls-files",
      "--others",
      "--exclude-standard",
    ]);
  });

  it("should return the untracked diff", () => {
    expect(result).toEqual(mockUntrackedDiff);
  });
});
