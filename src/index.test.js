import ayup from "./";
import minimist from "minimist";
import madge from "madge";
import gitPromise from "simple-git/promise";
import getDirectory from "./getDirectory";
import getBranch from "./getBranch";
import validateArgs from "./validateArgs";
import getDiff from "./getDiff";
import getTestFiles from "./getTestFiles";
import logger from "./logger";

jest.mock("minimist", () => jest.fn());
jest.mock("madge", () => jest.fn());
jest.mock("simple-git/promise", () => jest.fn());
jest.mock("./getDirectory", () => jest.fn());
jest.mock("./getBranch", () => jest.fn());
jest.mock("./validateArgs", () => jest.fn());
jest.mock("./getDiff", () => jest.fn());
jest.mock("./getTestFiles", () => jest.fn());
jest.mock("./logger", () => jest.fn());

const mockDefaultIArgs = {
  "test-arg-key": Symbol("test-arg-value"),
};

const mockArgv = [
  Symbol("test-argv-1"),
  Symbol("test-argv-2"),
  Symbol("test-argv-3"),
];

const mockMinimistParsedArgs = {
  "test-minimist-arg-key": Symbol("test-minimist-arg-value"),
};

const mockDirectory = Symbol("test-directory");
const mockGit = Symbol("test-git");
const mockBranch = Symbol("test-branch");

const mockDiffFiles = Symbol("test-diff-files");
const mockGraph = Symbol("test-graph");

const mockTestFiles = [
  Symbol("test-file"),
  Symbol("test-file"),
  Symbol("test-file"),
];

describe("ayup", () => {
  let result;
  let originalArgv;
  let mockIArgs;

  beforeEach(() => {
    jest.clearAllMocks();

    originalArgv = process.argv;
    delete process.argv;
    process.argv = mockArgv;

    minimist.mockReturnValue(mockMinimistParsedArgs);
    getDirectory.mockReturnValue(mockDirectory);
    gitPromise.mockReturnValue(mockGit);
    getBranch.mockReturnValue(mockBranch);
    getDiff.mockReturnValue(mockDiffFiles);
    madge.mockReturnValue(mockGraph);
    getTestFiles.mockReturnValue(mockTestFiles);
  });

  afterEach(() => {
    process.argv = originalArgv;
  });

  const commonAssertions = () => {
    it("should call minimist with the value of 'process.argv.slice(2)'", () => {
      expect(minimist).toHaveBeenCalledWith(mockArgv.slice(2));
    });

    it("should call 'getDirectory' with the merge of the input args and command line args", () => {
      expect(getDirectory).toHaveBeenCalledWith({
        ...mockMinimistParsedArgs,
        ...mockIArgs,
      });
    });

    it("should call 'gitPromise' with the directory", () => {
      expect(gitPromise).toHaveBeenCalledWith(mockDirectory);
    });

    it("should call 'getBranch' with the args and the initialised git object", () => {
      expect(getBranch).toHaveBeenCalledWith({
        ...mockMinimistParsedArgs,
        ...mockIArgs,
        git: mockGit,
      });
    });

    it("should call 'validateArgs' with the branch, directory and the initialised git object", () => {
      expect(validateArgs).toHaveBeenCalledWith({
        branch: mockBranch,
        directory: mockDirectory,
        git: mockGit,
      });
    });

    it("should call 'getDiff' with the initialised git object", () => {
      expect(getDiff).toHaveBeenCalledWith({
        git: mockGit,
      });
    });

    it("should call 'madge' with the directory", () => {
      expect(madge).toHaveBeenCalledWith(mockDirectory);
    });

    it("should call 'getTestFiles' with the directory graph and the diff files array", () => {
      expect(getTestFiles).toHaveBeenCalledWith({
        files: mockDiffFiles,
        graph: mockGraph,
      });
    });

    it("should return the test files", () => {
      expect(result).toEqual(mockTestFiles);
    });
  };

  describe("when called as a CLI", () => {
    beforeEach(async () => {
      mockIArgs = { cli: true };
      result = await ayup(mockIArgs);
    });

    commonAssertions();

    it("should call the logger with the test files", () => {
      expect(logger).toHaveBeenCalledWith(...mockTestFiles);
    });
  });

  describe("when called as a module with args", () => {
    beforeEach(async () => {
      mockIArgs = { ...mockDefaultIArgs };
      result = await ayup(mockIArgs);
    });

    commonAssertions();

    it("should not call the logger", () => {
      expect(logger).not.toHaveBeenCalled();
    });
  });

  describe("when called as a module without args", () => {
    beforeEach(async () => {
      mockIArgs = undefined;
      result = await ayup();
    });

    commonAssertions();

    it("should not call the logger", () => {
      expect(logger).not.toHaveBeenCalled();
    });
  });
});
