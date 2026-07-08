import { createContext, useEffect, useState } from "react";

export const ThemeContext  = createContext(null)

export function ThemeProvider ({children}) {
   const currentTheme = localStorage.getItem('theme')
    const [theme, setTheme] = useState(() =>{
      return currentTheme || 'light'
    })
   
    const toggleTheme = () => {
      // console.log(theme);
      setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };
      useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem('theme' , theme)
    }, [theme]);
    
   return (
    <ThemeContext.Provider value={{ theme , toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}
