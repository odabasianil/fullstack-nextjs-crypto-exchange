import { twMerge } from "tailwind-merge"
import { Icon } from "./icon"
import { setCookie } from "@/utils/set-cookie";

export const ThemeSwitcher = (props: any) => {
  const { theme, setTheme } = props;

  const toggleTheme = () => {
    if (localStorage.getItem('theme') === "light") {
      document.documentElement.classList.add("dark");
      setCookie("theme", 'dark', 365);
      setTheme('dark');
    } else {
      document.documentElement.classList.remove("dark");
      setCookie("theme", 'light', 365);
      setTheme('light');
    }
    // Tema değişikliği için bir CustomEvent oluştur ve tetikle
    const themeChangeEvent = new CustomEvent('themeChange', { detail: theme });
    window.dispatchEvent(themeChangeEvent);
  };
  
  return (
    <div className={twMerge(
        "bg-transparent border border-white-400 dark:border-secondary rounded-md",
        "h-8 w-[92px] p-0.5 cursor-pointer",
        "inline-flex items-center relative"
      )}
    >
      <div className={twMerge(
          "absolute left-0.5 bottom-0 top-0 ",
          "w-[calc(50%-2px)] my-0.5 text-xl rounded-l-md",
          "flex items-center justify-center",
          theme === "dark" && "bg-secondary text-white-100"
        )}
        onClick={() => toggleTheme()}
      >
        <Icon name="theme" size={16} />
      </div>
      <div className={twMerge(
          "absolute right-0.5 bottom-0 top-0",
          "w-[calc(50%-2px)] my-0.5 text-xl rounded-r-md",
          "flex items-center justify-center",
          theme === "light" && "bg-white-300 text-white-100"
        )}
        onClick={() => toggleTheme()}
      >
        <Icon name="theme-dark" size={16} className={twMerge(theme === 'light' && 'text-black-100')} />
      </div>
    </div>
  )
}