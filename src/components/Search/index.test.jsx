/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import Search from ".";

beforeAll(() => {
  faker.seed(1);
});

describe("Search component", () => {
  test("matches the snapshots.", () => {
    const { container } = render(
      <Search searchValue={faker.random.words()} onChange={jest.fn()} />
    );

    expect(container).toMatchSnapshot();
  });

  test("sets the provided `searchValue` as the input's value attribure.", () => {
    const searchValue = faker.random.words();

    const { getByRole } = render(
      <Search searchValue={searchValue} onChange={jest.fn()} />
    );

    expect(getByRole("textbox")).toHaveValue(searchValue);
  });

  test("calls the provided `onChange` by entered value in the input.", () => {
    const onChange = jest.fn();

    const { getByRole } = render(
      <Search searchValue={faker.random.words()} onChange={onChange} />
    );

    const enteredValue = faker.random.words();

    fireEvent.change(getByRole("textbox"), { target: { value: enteredValue } });
    expect(onChange).toBeCalledWith(enteredValue);
  });
});
