import parseGitArray from "./parseGitArray";

describe("parseGitArray", () => {
  describe("when given a newline separated string array from a git output", () => {
    const mockLine1 = "test-line-1";
    const mockLine2 = "test-line-2";
    const mockLine3 = "test-line-3";
    const mockLine4 = " ";
    const mockGitArray = `${mockLine1}\r\n${mockLine2}\n${mockLine3}\n${mockLine4}`;
    const expectedArray = [mockLine1, mockLine2, mockLine3];

    it("should parse the string into a trimmed string array split by newlines", () => {
      expect(parseGitArray(mockGitArray)).toEqual(expectedArray);
    });
  });

  describe("when passed null", () => {
    it("should return an empty array", () => {
      expect(parseGitArray(null)).toEqual([]);
    });
  });

  describe("when passed an empty string", () => {
    it("should return an empty array", () => {
      expect(parseGitArray("")).toEqual([]);
    });
  });
});
