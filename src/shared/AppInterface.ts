import { ReactNode } from "react";

export interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: "green-btn" | "orange-btn" | "red-btn";
  disabled?: boolean;
}

export type Sign = "+" | "-";

export interface Row {
  sign: Sign;
  value: number;
  disabled: boolean;
}

export type Action =
  | { type: "ADD_ROW" }
  | { type: "REMOVE_ROW"; index: number }
  | { type: "SET_SIGN"; index: number; sign: Sign }
  | { type: "SET_VALUE"; index: number; value: number }
  | { type: "SET_DISABLED"; index: number; disabled: boolean };

export interface InputProps {
  value: number;
  onChange: (value: string) => void;
}

export interface SelectProps {
  value: Sign;
  onChange: (sign: Sign) => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}

export interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
