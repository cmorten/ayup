import getBranch from "./";
import getCurrentBranch from "./getCurrentBranch";

jest.mock("./getCurrentBranch", () => jest.fn());

const mockGit = Symbol("test-git");
const mockBranch = Symbol("test-branch");
const mockB = Symbol("test-b");
const mockCurrentBranch = Symbol("test-current-branch");

describe("getBranch", () => {
  let result;

  beforeEach(() => {
    jest.clearAllMocks();
    getCurrentBranch.mockResolvedValue(mockCurrentBranch);
  });

  describe("when provided with a 'branch' argument", () => {
    beforeEach(async () => {
      result = await getBranch({ branch: mockBranch, git: mockGit });
    });

    it("should return the passed 'branch' argument", () => {
      expect(result).toEqual(mockBranch);
    });
  });

  describe("when not provided with a 'branch' argument", () => {
    describe("when provided with a 'b' argument", () => {
      beforeEach(async () => {
        result = await getBranch({ b: mockB, git: mockGit });
      });

      it("should return the passed 'b' argument", () => {
        expect(result).toEqual(mockB);
      });
    });

    describe("when not provided with a 'b' argument", () => {
      beforeEach(async () => {
        result = await getBranch({ git: mockGit });
      });

      it("should call 'getCurrentBranch' with the passed git object", () => {
        expect(getCurrentBranch).toHaveBeenCalledWith({ git: mockGit });
      });

      it("should return the result of 'getCurrentBranch'", () => {
        expect(result).toEqual(mockCurrentBranch);
      });
    });
  });
});
