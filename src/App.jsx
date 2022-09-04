import { useCallback, useEffect, useState } from "react";
import { Header } from "./components";
import { HomePage, CountryPage } from "./pages";
import { Routes, Route } from "react-router-dom";

function App() {
  const [countries, setCountries] = useState([]);
  const [isDarkThemeOn, setIsDarkThemeOn] = useState(false);
  const toggleTheme = useCallback(async () => {
    document.body.classList.toggle("light-theme");
    document.body.classList.toggle("dark-theme");
    setIsDarkThemeOn(!isDarkThemeOn);
  }, [isDarkThemeOn]);

  useEffect(() => {
    document.body.classList.add("light-theme");
  }, []);

  useEffect(() => {
    async function fetchData() {
      const URL = "https://restcountries.com/v2/all";

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
      <Header isDarkThemeOn={isDarkThemeOn} onToggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<HomePage countries={countries} />} />
        <Route
          path="/countries/:name"
          element={<CountryPage countries={countries} />}
        />
      </Routes>
    </div>
  );
}

export default App;
