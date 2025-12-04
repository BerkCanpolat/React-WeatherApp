import { useTheme } from "@/context/ThemeProvider";
import { Heart, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Search from "./Search";
import { useFavorite } from "@/Hooks/useFavorite";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const isDark = theme === "dark";
  const { favoriteQuery } = useFavorite();

  return (
    <>
    <header className="sticky top-0 w-full border-b bg-background/95 backdrop-blur py-3.5 md:py-6 supports-backdrop-filter:bg-background/60">
      <div className="flex items-center justify-between container mx-auto max-sm:px-5">
        <Link to={"/"}>
          <h1 className="md:text-lg cursor-pointer font-bold">
            WeatherApp
          </h1>
        </Link>
        <div className="flex items-center gap-5">
          <Search />
          <div className="relative">
          <Heart className={`cursor-pointer ${favoriteQuery.length ? "text-red-400 fill-red-500" : ""}`} onClick={() => setOpenModal(true)}/>
            <div className="absolute -top-1 -left-1.5 bg-red-500 rounded-full w-4 h-4 text-center">
            <p className="text-xs font-bold text-white">{favoriteQuery.length}</p>
            </div>
          </div>
          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`cursor-pointer flex items-center gap-3 border-[0.5px] overflow-hidden pt-2 pb-2 pr-2.5 pl-2.5 rounded ${
              isDark ? "border-white" : "border-black"
            }`}
          >
            {isDark ? (
              <>
                <div
                  className={`transition-transform duration-500 ${
                    isDark ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <Sun className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" />
                </div>
                <small className="text-sm font-medium hidden md:block">
                  Light
                </small>
              </>
            ) : (
              <>
                <div
                  className={`transition-transform duration-500 ${
                    isDark ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <Moon className="h-6 w-6 text-yellow-500" />
                </div>
                <small className="text-sm font-medium hidden md:block">
                  Dark
                </small>
              </>
            )}
          </div>
        </div>
      </div>
    </header>

    {openModal && (
      <Modal open={openModal} onClose={() => setOpenModal(false)} />

    )}
    
    </>
  );
};

export default Header;
