import { useTheme } from "@/context/ThemeProvider";
import { Heart, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {

    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";

  return (
    <header className="sticky top-0 w-full border-b bg-background/95 backdrop-blur py-6 supports-backdrop-filter:bg-background/60">
      <div className="flex items-center justify-between container mx-auto">
        <Link to={"/"}>
        <h1 className="md:text-lg cursor-pointer font-semibold">WeatherApp</h1>
        </Link>
        <div className="flex items-center gap-5">
          <Heart className="cursor-pointer" />
          <div onClick={() => setTheme(isDark ? "light" : "dark")} className={`cursor-pointer flex items-center gap-3 border-[0.5px] overflow-hidden pt-2 pb-2 pr-2.5 pl-2.5 rounded ${isDark ? "border-white" : "border-black"}`}>
            {isDark ? (
                            <>
                                <div className={`transition-transform duration-500 ${isDark ? "rotate-180" : "rotate-0"}`}>
                                    <Sun className="h-6 w-6 text-yellow-600" />
                                </div>
                                <small className="text-sm font-medium hidden md:block">Light</small>
                            </>
                        ) : (
                            <>
                                <div className={`transition-transform duration-500 ${isDark ? "rotate-180" : "rotate-0"}`}>
                                    <Moon className="h-6 w-6 text-yellow-500" />
                                </div>
                                <small className="text-sm font-medium hidden md:block">Dark</small>
                            </>
                        )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
