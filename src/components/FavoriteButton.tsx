import type { WeatherData } from "@/Api/Core/Weather.types";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useFavorite } from "@/Hooks/useFavorite";

interface FavoriteButtonProps {
    data: WeatherData;
}

const FavoriteButton = ({ data }: FavoriteButtonProps) => {

    const {addToFavorite, isFavorite, removeFavorite} = useFavorite();
    const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

    const handleToggleFavorites = () => {
        if(isCurrentlyFavorite) {
            removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
            toast.error(`Removed ${data.name} from Favorites`);
        } else {
            addToFavorite.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country,
            });
            toast.success(`Added ${data.name} to Favorites`)
        }
    };



  return <Button 
  variant={isCurrentlyFavorite ? "default" : "outline"} 
  size={"icon"}
  onClick={handleToggleFavorites}
  className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}>
    <Star className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`}/>
  </Button>
}

export default FavoriteButton