import validateDir from "./validateDir";
import fs from "fs";
import exitWithError from "../exitWithError";
import { errors } from "../constants";

jest.mock("fs", () => ({
  existsSync: jest.fn(),
}));
jest.mock("../exitWithError", () => jest.fn());

const mockDirectory = Symbol("test-directory");
const mockGit = {
  checkIsRepo: jest.fn(),
};

describe("validateDir", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const commonAssertions = () => {
    it("should call fs.existsSync with the directory", () => {
      expect(fs.existsSync).toHaveBeenCalledWith(mockDirectory);
    });
  };

  describe("when the provided directory does not exist", () => {
    beforeEach(async () => {
      fs.existsSync.mockReturnValue(false);

      await validateDir({ directory: mockDirectory, git: mockGit });
    });

    commonAssertions();

    it("should call exitWithError with the invalidDirectory message", () => {
      expect(exitWithError).toHaveBeenCalledWith(errors.invalidDirectory);
    });
  });

  describe("when the provided directory does exist", () => {
    beforeEach(() => {
      fs.existsSync.mockReturnValue(true);
    });

    describe("when the provided directory is not a git repo", () => {
      beforeEach(async () => {
        mockGit.checkIsRepo.mockResolvedValue(false);

        await validateDir({ directory: mockDirectory, git: mockGit });
      });

      commonAssertions();

      it("should call exitWithError with the notGitRepo message", () => {
        expect(exitWithError).toHaveBeenCalledWith(errors.notGitRepo);
      });
    });

    describe("when the provided directory is a git repo", () => {
      beforeEach(async () => {
        mockGit.checkIsRepo.mockResolvedValue(true);

        await validateDir({ directory: mockDirectory, git: mockGit });
      });

      commonAssertions();

      it("should not call exitWithError", () => {
        expect(exitWithError).not.toHaveBeenCalled();
      });
    });
  });
});
