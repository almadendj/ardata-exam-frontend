"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export enum ColorScheme {
  LIGHT = "light",
  DARK = "dark",
}

export type ThemeType = {
  colorScheme: ColorScheme | string;
  setColorScheme: (colorScheme: ColorScheme) => void;
};

const defaultTheme: ThemeType = {
  colorScheme: ColorScheme.DARK,
  setColorScheme: () => { },
};

const ThemeContext = createContext<ThemeType>(defaultTheme);

export const useTheme = () => {
  if (!ThemeContext) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return useContext(ThemeContext);
};

export const ThemeProvider: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme | string>(
    ColorScheme.DARK,
  );

  useEffect(() => {
    const bodyElement = document.querySelector("body");
    const removeClass = colorScheme === ColorScheme.LIGHT ? "dark" : "light";
    const addClass = colorScheme === ColorScheme.LIGHT ? "light" : "dark";

    if (!!bodyElement) {
      bodyElement.classList.remove(removeClass);
      bodyElement.classList.add(addClass);
    }
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ colorScheme, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

