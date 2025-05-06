export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  currency: string;
  setCurrency: (currency: string) => void;
}
