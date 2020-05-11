import validateBranch from "./validateBranch";
import exitWithError from "../exitWithError";
import { errors } from "../constants";

jest.mock("../exitWithError", () => jest.fn());

const mockGit = {
  checkout: jest.fn(),
};
const mockBranch = Symbol("test-branch");
const mockError = new Error("test-error");

describe("validateBranch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when provided with an empty branch", () => {
    beforeEach(async () => {
      await validateBranch({ branch: "", git: mockGit });
    });

    it("should call exitWithError with the empty branch error", () => {
      expect(exitWithError).toHaveBeenCalledWith(errors.emptyBranch);
    });
  });

  describe("when provided a non-empty branch", () => {
    const commonAssertions = () => {
      it("should call git.checkout with the branch", () => {
        expect(mockGit.checkout).toHaveBeenCalledWith(mockBranch);
      });
    };

    describe("when the branch does not exist", () => {
      beforeEach(async () => {
        mockGit.checkout.mockRejectedValue(mockError);
        await validateBranch({ branch: mockBranch, git: mockGit });
      });

      commonAssertions();

      it("should call exitWithError with the empty branch error", () => {
        expect(exitWithError).toHaveBeenCalledWith(
          errors.notValidBranch,
          mockError
        );
      });
    });

    describe("when the branch exists", () => {
      beforeEach(async () => {
        mockGit.checkout.mockResolvedValue();
        await validateBranch({ branch: mockBranch, git: mockGit });
      });

      commonAssertions();

      it("should not call exitWithError", () => {
        expect(exitWithError).not.toHaveBeenCalled();
      });
    });
  });
});
