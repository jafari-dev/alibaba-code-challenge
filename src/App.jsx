import { useCallback, useEffect, useState } from "react";
import { CountryCard, Header } from "./components";

function App() {
  const [countries, setCountries] = useState([]);
  const [isDarkThemeOn, setIsDarkThemeOn] = useState(false);
  const toggleTheme = useCallback(() => {
    setIsDarkThemeOn((previousState) => !previousState);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const URL = "https://restcountries.com/v3.1/all";

      try {
        const response = fetch(URL);
        const data = await (await response).json();

        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container">
      <Header
        isDarkThemeOn={isDarkThemeOn}
        onToggleTheme={toggleTheme}
      />
      <section className="countries">
        {countries.map((country) => (
          <CountryCard
            key={country.name.common}
            name={country.name.common}
            capital={country.capital}
            population={country.population}
            region={country.region}
            flagUrl={country.flags.svg}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
