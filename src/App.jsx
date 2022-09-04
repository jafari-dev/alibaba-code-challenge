import { useCallback, useEffect, useState } from "react";
import { Header } from "./components";
import { HomePage, CountryPage } from "./pages";
import { Routes, Route } from "react-router-dom";
import { API_URL, THEMES } from "./utils/constants";

function App() {
  const [countries, setCountries] = useState([]);
  const [theme, setTheme] = useState(THEMES.Light);

  const toggleTheme = useCallback(() => {
    if (theme === THEMES.Dark) setTheme(THEMES.Light);
    else setTheme(THEMES.Dark);
    document.body.classList.toggle(THEMES.Light);
    document.body.classList.toggle(THEMES.Dark);
  }, [theme]);

  useEffect(() => {
    {/* Try to load the stored them in the client's browser */}
    const storedTheme = window.localStorage.getItem("theme");

    if (storedTheme === THEMES.Light || storedTheme === THEMES.Dark) {
      document.body.classList.add(storedTheme);
      setTheme(storedTheme);
    } else {
      window.localStorage.setItem("theme", THEMES.Light);
      document.body.classList.add(THEMES.Light);
      setTheme(THEMES.Light);
    }

    {/* Try to fetch countries informations from the API */}
    (async function fetchData() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="container">
      <Header theme={theme} onToggleTheme={toggleTheme} />
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
