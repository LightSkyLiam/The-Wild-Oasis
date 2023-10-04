import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia(`(prefers-color-scheme: dark)`).matches,
    `isDarkMode`
  );
  const toggleDarkMode = () => {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  };
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add(`dark-mode`);
    } else {
      document.documentElement.classList.remove(`dark-mode`);
    }
  }, [isDarkMode]);
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error(`Context was used outside of provider`);
  return context;
}

export { DarkModeProvider, useDarkMode };
