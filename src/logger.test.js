import logger from "./logger";

const mockMessages = [
  Symbol("test-message"),
  Symbol("test-message"),
  Symbol("test-message"),
];

describe("logger", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => {});

    logger(...mockMessages);
  });

  it("should call 'console.log' with the provided messages", () => {
    mockMessages.forEach((mockMessage) =>
      expect(console.log).toHaveBeenCalledWith(mockMessage)
    );
  });
});
