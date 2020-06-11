import isBlocklisted from "./isBlocklisted";
import { blocklist } from "../constants";

const mockBlocklistedFile = `${blocklist[0]}/test-file`;
const mockNonBlocklistedFile = `not-blocklisted/test-file`;

describe("isBlocklisted", () => {
  let result;

  describe("when the passed file name is in the blocklist array", () => {
    beforeEach(() => {
      result = isBlocklisted(mockBlocklistedFile);
    });

    it("should return true", () => {
      expect(result).toEqual(true);
    });
  });

  describe("when the passed file name is not in the blocklist array", () => {
    beforeEach(() => {
      result = isBlocklisted(mockNonBlocklistedFile);
    });

    it("should return false", () => {
      expect(result).toEqual(false);
    });
  });
});
