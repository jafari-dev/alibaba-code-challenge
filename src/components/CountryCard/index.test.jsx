/* eslint-disable testing-library/prefer-screen-queries */
import { render } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import CountryCard from ".";
import { BrowserRouter } from "react-router-dom";

beforeAll(() => {
  faker.seed(1);
});

describe("CountryCard component", () => {
  test("matches the snapshots.", () => {
    const { container } = render(
      <BrowserRouter>
        <CountryCard
          name={faker.address.country()}
          capital={faker.address.city()}
          population={faker.datatype.number({min: 200000, max: 200000000})}
          region={faker.random.word()}
          flagUrl={faker.image.imageUrl()}
        />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });

  test("sets the props on the suitable element tags", () => {
    const name = faker.address.country();
    const capital = faker.address.city();
    const population = faker.datatype.number({min: 200000, max: 200000000});
    const region = faker.random.word();

    const { getByTestId } = render(
      <BrowserRouter>
        <CountryCard
          name={name}
          capital={capital}
          population={population}
          region={region}
          flagUrl={faker.image.imageUrl()}
        />
      </BrowserRouter>
    );

    expect(getByTestId("name")).toHaveTextContent(name);
    expect(getByTestId("capital")).toHaveTextContent(capital);
    expect(getByTestId("population")).toHaveTextContent(population);
    expect(getByTestId("region")).toHaveTextContent(region);
  });

  test(`sets the 'flagUrl' prop as the source of img tag and sets a suitable \
string as its alt attribute.`, () => {
    const name = faker.address.country();
    const flagUrl = faker.image.imageUrl();

    const { getByRole } = render(
      <BrowserRouter>
        <CountryCard
          name={name}
          flagUrl={flagUrl}
          capital={faker.address.city()}
          population={faker.datatype.number({min: 200000, max: 200000000})}
          region={faker.random.word()}
        />
      </BrowserRouter>
    );

    expect(getByRole("img")).toHaveAttribute("src", flagUrl);
    expect(getByRole("img")).toHaveAttribute("alt", `Flag of ${name}`);
  });
});
