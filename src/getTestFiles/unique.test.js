import unique from "./unique";

const mockItem1 = Symbol("test-item-1");
const mockItem2 = Symbol("test-item-2");
const mockItem3 = Symbol("test-item-3");

const mockArray = [mockItem1, mockItem2, mockItem1, mockItem3, mockItem3];
const mockExpectedArray = [mockItem1, mockItem2, mockItem3];

describe("unique", () => {
  it("should return an array of unique values from the passed array", () => {
    expect(unique(mockArray)).toEqual(mockExpectedArray);
  });
});
