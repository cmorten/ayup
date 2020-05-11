import isBlacklisted from "./isBlacklisted";
import { blacklist } from "../constants";

const mockBlacklistedFile = `${blacklist[0]}/test-file`;
const mockNonBlacklistedFile = `not-blacklisted/test-file`;

describe("isBlacklisted", () => {
  let result;

  describe("when the passed file name is in the blacklist array", () => {
    beforeEach(() => {
      result = isBlacklisted(mockBlacklistedFile);
    });

    it("should return true", () => {
      expect(result).toEqual(true);
    });
  });

  describe("when the passed file name is not in the blacklist array", () => {
    beforeEach(() => {
      result = isBlacklisted(mockNonBlacklistedFile);
    });

    it("should return false", () => {
      expect(result).toEqual(false);
    });
  });
});
