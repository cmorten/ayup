import path from "path";
import getDirectory from "./getDirectory";
import { defaultDirectory } from "./constants";

jest.mock("path", () => ({
  resolve: jest.fn(),
}));

const mockDirectory = Symbol("test-directory");
const mockD = Symbol("test-d");
const mockResolvedPath = Symbol("test-resolved-path");

describe("getDirectory", () => {
  let result;

  beforeEach(() => {
    jest.clearAllMocks();

    path.resolve.mockReturnValue(mockResolvedPath);
  });

  describe("when provided with a 'directory' argument", () => {
    beforeEach(() => {
      result = getDirectory({ directory: mockDirectory });
    });

    it("should call 'path.resolve' with the passed 'directory' argument", () => {
      expect(path.resolve).toHaveBeenCalledWith(mockDirectory);
    });

    it("should return the resolved path", () => {
      expect(result).toEqual(mockResolvedPath);
    });
  });

  describe("when not provided with a 'directory' argument", () => {
    describe("when provided with a 'd' argument", () => {
      beforeEach(() => {
        result = getDirectory({ d: mockD });
      });

      it("should call 'path.resolve' with the passed 'd' argument", () => {
        expect(path.resolve).toHaveBeenCalledWith(mockD);
      });

      it("should return the resolved path", () => {
        expect(result).toEqual(mockResolvedPath);
      });
    });

    describe("when not provided with a 'd' argument", () => {
      beforeEach(() => {
        result = getDirectory({});
      });

      it("should call 'path.resolve' with the default directory", () => {
        expect(path.resolve).toHaveBeenCalledWith(defaultDirectory);
      });

      it("should return the resolved path", () => {
        expect(result).toEqual(mockResolvedPath);
      });
    });
  });
});
