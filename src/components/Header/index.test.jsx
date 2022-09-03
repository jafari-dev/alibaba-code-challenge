/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import Header from ".";

beforeAll(() => {
  faker.seed(1);
});

describe("Header component", () => {
  test("matches the snapshots.", () => {
    const { container } = render(
      <>
        <Header isDarkThemeOn={false} onToggleTheme={jest.fn()} />
        <Header isDarkThemeOn={true} onToggleTheme={jest.fn()} />
      </>
    );

    expect(container).toMatchSnapshot();
  });

  test("calls the provided 'onToggleTheme' prop when the switcher part is clicked.", () => {
    const onToggleTheme = jest.fn();

    const { getByTestId } = render(
      <Header
        isDarkThemeOn={faker.datatype.boolean()}
        onToggleTheme={onToggleTheme}
      />
    );

    expect(onToggleTheme).toBeCalledTimes(0);

    fireEvent.click(getByTestId("theme-switcher"));
    expect(onToggleTheme).toBeCalledTimes(1);
    fireEvent.click(getByTestId("theme-switcher"));
    expect(onToggleTheme).toBeCalledTimes(2);
  });

  test("contains the sun icon and 'Light Mode' text when the provided 'isDarkThemeOn' prop is false.", () => {
    const { getByTestId } = render(
      <Header isDarkThemeOn={false} onToggleTheme={jest.fn()} />
    );

    expect(getByTestId("theme-title")).toHaveTextContent("Light Mode");
    expect(getByTestId("theme-icon")).toContainHTML("sun.svg");
  });

  test("contains the moon icon and 'Dark Mode' text when the provided 'isDarkThemeOn' prop is true.", () => {
    const { getByTestId } = render(
      <Header isDarkThemeOn={true} onToggleTheme={jest.fn()} />
    );

    expect(getByTestId("theme-title")).toHaveTextContent("Dark Mode");
    expect(getByTestId("theme-icon")).toContainHTML("moon.svg");
  });
});
