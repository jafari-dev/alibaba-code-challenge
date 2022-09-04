/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import Header from ".";
import { THEMES } from "./../../utils/constants";

beforeAll(() => {
  faker.seed(1);
});

describe("Header component", () => {
  test("matches the snapshots.", () => {
    const { container } = render(
      <>
        <Header theme={THEMES.Light} onToggleTheme={jest.fn()} />
        <Header theme={THEMES.Dark} onToggleTheme={jest.fn()} />
      </>
    );

    expect(container).toMatchSnapshot();
  });

  test("calls the provided 'onToggleTheme' prop when the switcher part is clicked.", () => {
    const onToggleTheme = jest.fn();

    const { getByTestId } = render(
      <Header
        theme={faker.helpers.arrayElement([THEMES.Light, THEMES.Dark])}
        onToggleTheme={onToggleTheme}
      />
    );

    expect(onToggleTheme).toBeCalledTimes(0);

    fireEvent.click(getByTestId("theme-switcher"));
    expect(onToggleTheme).toBeCalledTimes(1);
    fireEvent.click(getByTestId("theme-switcher"));
    expect(onToggleTheme).toBeCalledTimes(2);
  });

  test("contains the sun icon and 'Light Mode' text when the provided 'thme' prop 'light-theme'.", () => {
    const { getByTestId } = render(
      <Header theme={THEMES.Light} onToggleTheme={jest.fn()} />
    );

    expect(getByTestId("theme-title")).toHaveTextContent("Light Mode");
    expect(getByTestId("theme-icon")).toContainHTML("sun.svg");
  });

  test("contains the moon icon and 'Dark Mode' text when the provided 'thme' prop is 'dark-theme'.", () => {
    const { getByTestId } = render(
      <Header theme={THEMES.Dark} onToggleTheme={jest.fn()} />
    );

    expect(getByTestId("theme-title")).toHaveTextContent("Dark Mode");
    expect(getByTestId("theme-icon")).toContainHTML("moon.svg");
  });
});
