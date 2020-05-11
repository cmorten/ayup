import getTestFiles from "./";
import unique from "./unique";
import isBlacklisted from "./isBlacklisted";
import isWhitelisted from "./isWhitelisted";

jest.mock("./unique", () => jest.fn());
jest.mock("./isBlacklisted", () => jest.fn());
jest.mock("./isWhitelisted", () => jest.fn());

const mockDependencyTree = {
  "test-file-1": [
    Symbol("test-dependency-of-file-1"),
    Symbol("test-dependency-of-file-1"),
    Symbol("test-dependency-of-file-1"),
  ],
  "test-file-2": [
    Symbol("test-dependency-of-file-2"),
    Symbol("test-dependency-of-file-2"),
    Symbol("test-dependency-of-file-2"),
  ],
  "test-file-3": [
    Symbol("test-dependency-of-file-3"),
    Symbol("test-dependency-of-file-3"),
    Symbol("test-dependency-of-file-3"),
  ],
};

const mockFiles = Object.keys(mockDependencyTree);
const mockFilesAndDependencies = [
  ...Object.values(mockDependencyTree).flat(),
  ...mockFiles,
];

const mockGraph = {
  depends: jest.fn(),
};

const mockBlackListedFile = Symbol("test-blacklisted-file");
const mockNotWhiteListedFile = Symbol("test-not-whitelisted-file");
const mockFile1 = Symbol("test-file-1");
const mockFile2 = Symbol("test-file-2");

const mockUniqueFiles = [
  mockBlackListedFile,
  mockNotWhiteListedFile,
  mockFile1,
  mockFile2,
];

describe("getTestFiles", () => {
  let result;

  beforeEach(() => {
    jest.clearAllMocks();

    mockGraph.depends.mockImplementation((file) => mockDependencyTree[file]);
    unique.mockReturnValue(mockUniqueFiles);
    isBlacklisted.mockImplementation((file) => file === mockBlackListedFile);
    isWhitelisted.mockImplementation((file) => file !== mockNotWhiteListedFile);

    result = getTestFiles({ files: mockFiles, graph: mockGraph });
  });

  it("should call 'graph.depends' to get the dependencies of each file", () => {
    mockFiles.forEach((file) =>
      expect(mockGraph.depends).toHaveBeenCalledWith(file)
    );
  });

  it("should call 'unique' with an array containing the files and each of the file's dependencies", () => {
    expect(unique).toHaveBeenCalledWith(mockFilesAndDependencies);
  });

  it("should call 'isBlacklisted' for each of the unique files", () => {
    mockUniqueFiles.forEach((file) =>
      expect(isBlacklisted).toHaveBeenCalledWith(file)
    );
  });

  it("should call 'isWhitelisted' for each of the unique files that aren't blacklisted", () => {
    const [_, ...expectedFiles] = mockUniqueFiles;

    expectedFiles.forEach((file) =>
      expect(isWhitelisted).toHaveBeenCalledWith(file)
    );
  });

  it("should return an array of test files that are not blacklisted and are whitelisted", () => {
    expect(result).toEqual([mockFile1, mockFile2]);
  });
});
