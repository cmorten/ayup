import getTestFiles from "./";
import unique from "./unique";
import isBlocklisted from "./isBlocklisted";
import isAllowlisted from "./isAllowlisted";

jest.mock("./unique", () => jest.fn());
jest.mock("./isBlocklisted", () => jest.fn());
jest.mock("./isAllowlisted", () => jest.fn());

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

const mockBlockListedFile = Symbol("test-blocklisted-file");
const mockNotAllowListedFile = Symbol("test-not-allowlisted-file");
const mockFile1 = Symbol("test-file-1");
const mockFile2 = Symbol("test-file-2");

const mockUniqueFiles = [
  mockBlockListedFile,
  mockNotAllowListedFile,
  mockFile1,
  mockFile2,
];

describe("getTestFiles", () => {
  let result;

  beforeEach(() => {
    jest.clearAllMocks();

    mockGraph.depends.mockImplementation((file) => mockDependencyTree[file]);
    unique.mockReturnValue(mockUniqueFiles);
    isBlocklisted.mockImplementation((file) => file === mockBlockListedFile);
    isAllowlisted.mockImplementation((file) => file !== mockNotAllowListedFile);

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

  it("should call 'isBlocklisted' for each of the unique files", () => {
    mockUniqueFiles.forEach((file) =>
      expect(isBlocklisted).toHaveBeenCalledWith(file)
    );
  });

  it("should call 'isAllowlisted' for each of the unique files that aren't blocklisted", () => {
    const [_, ...expectedFiles] = mockUniqueFiles;

    expectedFiles.forEach((file) =>
      expect(isAllowlisted).toHaveBeenCalledWith(file)
    );
  });

  it("should return an array of test files that are not blocklisted and are allowlisted", () => {
    expect(result).toEqual([mockFile1, mockFile2]);
  });
});
