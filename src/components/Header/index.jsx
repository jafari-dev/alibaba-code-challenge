import "./styles.scss";
import { Sun, Moon } from "../../assets";
import { memo } from 'react';

function Header({isDarkThemeOn, onToggleTheme}) {
  return (
    <header className="header">
      <h1>Where in the world?</h1>
      <div data-testid="theme-switcher" onClick={onToggleTheme}>
        {isDarkThemeOn ?
          <Moon data-testid="theme-icon" /> :
          <Sun data-testid="theme-icon" />}
        <span data-testid="theme-title">{isDarkThemeOn ? "Dark Mode" : "Light Mode"}</span>
      </div>
    </header>
  )
}

export default memo(Header);
