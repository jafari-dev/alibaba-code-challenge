import "./styles.scss";
import { Sun, Moon } from "../../assets";
import { memo } from "react";
import { THEMES } from "../../utils/constants";

function Header({ theme, onToggleTheme }) {
  return (
    <div className="header">
      <header>
        <h1>Where in the world?</h1>
        <div data-testid="theme-switcher" onClick={onToggleTheme}>
          {theme === THEMES.Dark ? (
            <Moon data-testid="theme-icon" />
          ) : (
            <Sun data-testid="theme-icon" />
          )}
          <span data-testid="theme-title">
            {theme === THEMES.Dark ? "Dark Mode" : "Light Mode"}
          </span>
        </div>
      </header>
    </div>
  );
}

export default memo(Header);
