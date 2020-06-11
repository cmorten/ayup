import isAllowlisted from "./isAllowlisted";
import { allowlist } from "../constants";

const mockAllowlistedFile = `${allowlist[0]}/test-file`;
const mockNonAllowlistedFile = `not-allowlisted/test-file`;

describe("isAllowlisted", () => {
  let result;

  describe("when the passed file name is in the allowlist array", () => {
    beforeEach(() => {
      result = isAllowlisted(mockAllowlistedFile);
    });

    it("should return true", () => {
      expect(result).toEqual(true);
    });
  });

  describe("when the passed file name is not in the allowlist array", () => {
    beforeEach(() => {
      result = isAllowlisted(mockNonAllowlistedFile);
    });

    it("should return false", () => {
      expect(result).toEqual(false);
    });
  });
});
