/* eslint-disable jest/no-conditional-expect */
/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import SelectBox from ".";

beforeAll(() => {
  faker.seed(1);
});

describe("SelectBox component", () => {
  test("matches the snapshots.", () => {
    const options = Array.from(
      {
        length: faker.datatype.number({ min: 3, max: 10 }),
      },
      () => faker.random.word()
    );

    const { container } = render(
      <SelectBox
        placeholder={faker.random.word()}
        options={options}
        onChange={jest.fn()}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test("sets an empty string as the default value of selectbox.", () => {
    const options = Array.from(
      {
        length: faker.datatype.number({ min: 3, max: 10 }),
      },
      () => faker.random.word()
    );

    const { getByTestId } = render(
      <SelectBox
        placeholder={faker.random.word()}
        options={options}
        onChange={jest.fn()}
      />
    );

    expect(getByTestId("selectbox")).toHaveValue("");
  });

  test("calls the provided `onChange` by changing the selectbox value.", () => {
    const onChange = jest.fn();
    const options = Array.from(
      {
        length: faker.datatype.number({ min: 3, max: 10 }),
      },
      () => faker.random.word()
    );

    const { getByTestId } = render(
      <SelectBox
        placeholder={faker.random.word()}
        options={options}
        onChange={onChange}
      />
    );

    expect(onChange).not.toBeCalled();

    fireEvent.change(
      getByTestId("selectbox", {
        target: { value: faker.helpers.arrayElement(options) },
      })
    );
  });

  test("contains a disabled option tag with the provided 'placeholder' prop.", () => {
    const options = Array.from(
      {
        length: faker.datatype.number({ min: 3, max: 10 }),
      },
      () => faker.random.word()
    );
    const placeholder = faker.random.word();

    const { getAllByTestId } = render(
      <SelectBox
        placeholder={placeholder}
        options={options}
        onChange={jest.fn()}
      />
    );

    expect(getAllByTestId("option")[0]).toHaveValue("");
    expect(getAllByTestId("option")[0]).toBeDisabled();
    expect(getAllByTestId("option")[0]).toHaveTextContent(placeholder);
  });

  test("contains a list of option tags that they have the", () => {
    const onChange = jest.fn();
    const options = Array.from(
      {
        length: faker.datatype.number({ min: 3, max: 10 }),
      },
      () => faker.random.word()
    );

    const { getAllByTestId } = render(
      <SelectBox
        placeholder={faker.random.word()}
        options={options}
        onChange={onChange}
      />
    );

    const allOptions = [...getAllByTestId("option")];

    // The first ignored option is the default option (previous test)
    const [, ...normalOptions] = allOptions;

    expect(allOptions).toHaveLength(options.length + 1);

    normalOptions.forEach((option, index) => {
      expect(option).toHaveTextContent(options[index]);
    });
  });
});
