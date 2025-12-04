import { useFavorite } from '@/Hooks/useFavorite';
import { useWeatherQuery } from '@/Hooks/useWeather';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { Loader, X } from 'lucide-react';
interface ModalProps {
  open: boolean,
  onClose: () => void;
}

interface FavoriteCityTabletProps {
    id: string;
    name: string;
    lat: number;
    lon: number;
    onRemove: (id: string) => void;
}

const Modal = ({ open, onClose }: ModalProps) => {

    const {removeFavorite, favoriteQuery} = useFavorite();

    useEffect(() => {
        if(open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [open]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === "Escape") {
                onClose();
            };

        }
        if(open) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ duration: 0.25 }}
            className="bg-gray-900 dark:bg-zinc-800 p-6 rounded-lg shadow-lg min-w-[650px]"
          >
            <>
        <h1 className="text-xl font-bold tracking-tight dark:text-white text-white mb-5">Favorites</h1>
        <ScrollArea className="w-full pb-4">
            <div className="flex gap-4">
                {favoriteQuery.length === 0 ? (
 <p className="text-sm text-gray-400">No favorites found.</p>
                ) : (
                    <>
                    {favoriteQuery.map((city) => {
                        return <FavoriteCityTablet key={city.id} {...city} onRemove={() => removeFavorite.mutate(city.id)}/>
                    })}
                
                    </>    
                )}
            </div>
        </ScrollArea>
    </>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function FavoriteCityTablet({id, name, lat, lon, onRemove}: FavoriteCityTabletProps) {
    const navigate = useNavigate();
    const { data: weather, isLoading } = useWeatherQuery({ lat, lon});

    return <div onClick={() => navigate(`/city${name}?lat=${lat}&lon=${lon}`)}
    role="button"
    tabIndex={0}
    className="relative flex-min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md">
        <Button
        variant="ghost"
        size={"icon"}
        onClick={(e) => {
            e.stopPropagation();
            onRemove(id);
            toast.error(`Removed ${name} from Favorites`)
        }}
        className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive group-hover:opacity-100">
            <X className="h-4 w-4" />
        </Button>

        {isLoading?(
            <div className="flex h-8 items-center justify-center">
                <Loader className="h-4 w-4 animate-spin" />
            </div>
        ): weather ? <>

            <div className="flex items-center gap-2">
                <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} 
                alt="" />
                <p className="font-medium">{name}</p>
                <p className="text-xs text-muted-foreground">
                    {weather.sys.country}
                </p>
            </div>
            <div className="ml-auto text-right">
                <p className="text-xl font-bold">
                    {Math.round(weather.main.temp)}°
                </p>
                <p className="text-xs capitalize text-muted-foreground">
                    {weather.weather[0].description}
                </p>
            </div>
        
        </> : null}
    </div>
}


export default Modal