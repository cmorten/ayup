import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import {
  main,
  modern,
  module as moduleExport,
  unpkg,
} from "../../package.json";

const mockTestFile = "src/__index.mock.test.js";
const mockTestFileContents = `import ayup from "./"`;

function getDefaultExport(nodule) {
  return nodule && "object" == typeof nodule && "default" in nodule
    ? nodule.default
    : nodule;
}

describe("Integration: ayup", () => {
  describe.each`
    exportType  | exportLocation
    ${"main"}   | ${main}
    ${"modern"} | ${modern}
    ${"module"} | ${moduleExport}
    ${"unpkg"}  | ${unpkg}
  `("when using the $exportType bundle", ({ exportLocation }) => {
    let result;
    const ayup = getDefaultExport(require(path.join("../../", exportLocation)));

    beforeEach(() => {
      fs.writeFileSync(mockTestFile, mockTestFileContents);
    });

    afterEach(() => {
      fs.unlinkSync(mockTestFile);
    });

    describe("when used as an imported module", () => {
      beforeEach(async () => {
        result = await ayup();
      });

      it("should return the new test file", () => {
        expect(result).toContain(mockTestFile);
      });
    });

    describe("when used as a CLI", () => {
      beforeEach(() => {
        ({ stdout: result } = spawnSync("npx", ["."], { encoding: "utf8" }));
      });

      it("should return the new test file", () => {
        expect(result).toContain(mockTestFile);
      });
    });
  });
});
