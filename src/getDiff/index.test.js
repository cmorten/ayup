import getDiff from "./";
import getCommitDiff from "./getCommitDiff";
import getUntrackedDiff from "./getUntrackedDiff";
import parseGitArray from "./parseGitArray";
import exitWithError from "../exitWithError";
import { errors } from "../constants";

jest.mock("./getCommitDiff", () => jest.fn());
jest.mock("./getUntrackedDiff", () => jest.fn());
jest.mock("./parseGitArray", () => jest.fn());
jest.mock("../exitWithError", () => jest.fn());

const mockGit = Symbol("test-git");

const mockCommit = Symbol("test-commit");
const mockDiff = Symbol("test-diff");
const mockUntracked = Symbol("test-untracked");

const mockDiffArray = [Symbol("test-parsed-diff")];
const mockUntrackedArray = [Symbol("test-parsed-untracked")];

const mockError = new Error("test-error");

describe("getDiff", () => {
  let result;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when no errors are thrown", () => {
    beforeEach(async () => {
      getCommitDiff.mockResolvedValue(mockDiff);
      getUntrackedDiff.mockResolvedValue(mockUntracked);
      parseGitArray
        .mockReturnValueOnce(mockDiffArray)
        .mockReturnValueOnce(mockUntrackedArray);

      result = await getDiff({ git: mockGit });
    });

    it("should call 'getCommitDiff' with the git instance", () => {
      expect(getCommitDiff).toHaveBeenCalledWith({ git: mockGit });
    });

    it("should call 'getUntrackedDiff' with the git instance", () => {
      expect(getUntrackedDiff).toHaveBeenCalledWith({ git: mockGit });
    });

    it("should call 'parseGitArray' with the git diff", () => {
      expect(parseGitArray).toHaveBeenCalledWith(mockDiff);
    });

    it("should call 'parseGitArray' with the git untracked files", () => {
      expect(parseGitArray).toHaveBeenCalledWith(mockUntracked);
    });

    it("should return an array of the parsed diff and untracked files", () => {
      expect(result).toEqual([...mockDiffArray, ...mockUntrackedArray]);
    });
  });

  describe("when 'getCommitDiff' throws an error", () => {
    beforeEach(async () => {
      getCommitDiff.mockRejectedValue(mockError);

      result = await getDiff({ git: mockGit });
    });

    it("should call exitWithError with 'errors.git' and the thrown error message", () => {
      expect(exitWithError).toHaveBeenCalledWith(errors.git, mockError);
    });
  });

  describe("when 'getUntrackedDiff' throws an error", () => {
    beforeEach(async () => {
      getCommitDiff.mockResolvedValue(mockDiff);
      getUntrackedDiff.mockRejectedValue(mockError);

      result = await getDiff({ git: mockGit });
    });

    it("should call exitWithError with 'errors.git' and the thrown error message", () => {
      expect(exitWithError).toHaveBeenCalledWith(errors.git, mockError);
    });
  });
});
