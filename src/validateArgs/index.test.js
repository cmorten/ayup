import validateArgs from "./";
import validateDir from "./validateDir";
import validateBranch from "./validateBranch";

jest.mock("./validateDir", () => jest.fn());
jest.mock("./validateBranch", () => jest.fn());

const mockBranch = Symbol("test-branch");
const mockDirectory = Symbol("test-directory");
const mockGit = Symbol("test-git");

describe("validateArgs", () => {
  beforeEach(async () => {
    jest.clearAllMocks();

    await validateArgs({
      branch: mockBranch,
      directory: mockDirectory,
      git: mockGit,
    });
  });

  it("should call validateDir with the passed directory and git arguments", () => {
    expect(validateDir).toHaveBeenCalledWith({
      directory: mockDirectory,
      git: mockGit,
    });
  });

  it("should call validateBranch with the passed branch and git arguments", () => {
    expect(validateBranch).toHaveBeenCalledWith({
      branch: mockBranch,
      git: mockGit,
    });
  });
});
