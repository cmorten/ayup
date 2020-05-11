import getCurrentBranch from "./getCurrentBranch";

const mockGit = {
  raw: jest.fn(),
};

const mockBranchWithWhitespace = "  test-branch   ";

describe("getCurrentBranch", () => {
  let result;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const commonAssertions = () => {
    it("should call git.raw with an args array of 'rev-parse', '--abbrev-ref', 'HEAD' to retrieve the current branch", () => {
      expect(mockGit.raw).toHaveBeenCalledWith([
        "rev-parse",
        "--abbrev-ref",
        "HEAD",
      ]);
    });
  };

  describe("when 'git.raw' does not throw an error", () => {
    beforeEach(async () => {
      mockGit.raw.mockResolvedValue(mockBranchWithWhitespace);

      result = await getCurrentBranch({ git: mockGit });
    });

    commonAssertions();

    it("should return the current git branch name trimmed of any whitespace", () => {
      expect(result).toEqual(mockBranchWithWhitespace.trim());
    });
  });

  describe("when 'git.raw' throws an error", () => {
    beforeEach(async () => {
      mockGit.raw.mockRejectedValue(new Error("test-error"));

      result = await getCurrentBranch({ git: mockGit });
    });

    commonAssertions();

    it("should return an empty string", () => {
      expect(result).toEqual("");
    });
  });
});
