import { useState } from "react"
import { Button } from "./ui/button";
import { Clock, Loader2, SearchIcon, Star, XCircle } from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { useSearchQuery } from "@/Hooks/useWeather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "@/Hooks/useSearchHistory";
import { CommandSeparator } from "cmdk";
import { format } from "date-fns";
import { useFavorite } from "@/Hooks/useFavorite";


const Search = () => {

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const { data: queryData, isLoading } = useSearchQuery(query);
    const { history, clearHistory, addToHistory } = useSearchHistory();

    const handleSelect = (cityData: string) => {
        const [lat, lon, name, country] = cityData.split("|");

        addToHistory.mutate({
            query,
            name,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            country,
        });

        setOpen(false);
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`)
    };

    const { favoriteQuery  } = useFavorite();

  return (
  <div>
  <Button variant={"outline"} className="justify-start text-xs md:text-sm text-muted-foreground sm:pr-12 w-34 md:w-40 lg:w-64" onClick={() => setOpen(true)}>
    <SearchIcon />
    Search Cities...
  </Button>
  {open && (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." value={query} onValueChange={setQuery}/>
      <CommandList>
        {query.length >= 2 && !isLoading && (
            <CommandEmpty>No results found.</CommandEmpty>
        )}

        {favoriteQuery.length > 0 && (
                <CommandGroup heading="Favorites">
                    {favoriteQuery.map((location) => {

                       return <CommandItem
                key={location.id}
                value={`${location.lat} | ${location.lon} | ${location.name} | ${location.country}`}
                onSelect={handleSelect}
                >
                    <Star className="mr-2 h-4 w-4 text-yellow-500" />
                    <span>
                        {location.name}
                    </span>
                    {location.state && (
                        <span className="text-sm text-muted-foreground">
                            , {location.state}
                        </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                        , {location.country}
                    </span>

                </CommandItem>
                        
                    })}
                </CommandGroup>
          ) 
          }

        {history.length > 0 && (
              <>
              <CommandSeparator />
                <CommandGroup>
                    <div className="flex items-center justify-between px-2 my-2">
                        <p className="text-xs text-muted-foreground">Recent Searches</p>
                        <Button 
                        variant="ghost"
                        size="sm"
                        onClick={() => clearHistory.mutate()}>
                            <XCircle className="h-4 w-4" />
                            Clear
                        </Button>
                    </div>
                    {history.map((location) => {

                       return <CommandItem 
                key={`${location.lat} - ${location.lon}`}
                value={`${location.lat} | ${location.lon} | ${location.name} | ${location.country}`}
                onSelect={handleSelect}
                >
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                        {location.name}
                    </span>
                    {location.state && (
                        <span className="text-sm text-muted-foreground">
                            , {location.state}
                        </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                        , {location.country}
                    </span>
                    <span className="ml-auto text-sx text-muted-foreground">
                        {format(location.searchedAt, "MMM d, h:mm a")}
                    </span>

                </CommandItem>
                        
                    })}
                </CommandGroup>
            </>
          ) 
          }

          <CommandSeparator />

        {queryData && queryData.length > 0 && (
        <CommandGroup heading="Suggestions">
            {isLoading && (
                <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-4 w-4 animate-spin"/>
                </div>
            )}
            {queryData.map((q) => {
               return <CommandItem 
               key={`${q.lat} - ${q.lon}`}
                value={`${q.lat} | ${q.lon} | ${q.name} | ${q.country}`} 
                onSelect={handleSelect}>
                    <SearchIcon className="mr-2 h-4 w-4"/>
                    <span>
                        {q.name}
                    </span>
                    {q.state && (
                        <span>, {q.state}</span>
                    )}
                    <span>, {q.country}</span>
               </CommandItem>
                
            })}
        </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>

  )}

  </div>
  )
}

export default Search