import isWhitelisted from "./isWhitelisted";
import { whitelist } from "../constants";

const mockWhitelistedFile = `${whitelist[0]}/test-file`;
const mockNonWhitelistedFile = `not-whitelisted/test-file`;

describe("isWhitelisted", () => {
  let result;

  describe("when the passed file name is in the whitelist array", () => {
    beforeEach(() => {
      result = isWhitelisted(mockWhitelistedFile);
    });

    it("should return true", () => {
      expect(result).toEqual(true);
    });
  });

  describe("when the passed file name is not in the whitelist array", () => {
    beforeEach(() => {
      result = isWhitelisted(mockNonWhitelistedFile);
    });

    it("should return false", () => {
      expect(result).toEqual(false);
    });
  });
});
