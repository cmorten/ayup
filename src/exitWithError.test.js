import exitWithError from "./exitWithError";
import logger from "./logger";
import { help } from "./constants";

jest.mock("./logger", () => jest.fn());

const mockErrors = [
  Symbol("test-error"),
  Symbol("test-error"),
  Symbol("test-error"),
];

describe("exitWithError", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(process, "exit").mockImplementation(() => {});

    exitWithError(...mockErrors);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should call the logger with 'ERROR:', all the passed errors and the 'help' string", () => {
    expect(logger).toHaveBeenCalledWith("ERROR:", ...mockErrors, help);
  });

  it("should call 'process.exit' with code 1", () => {
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
