import { useState } from "react"
import { Button } from "./ui/button";
import { Loader2, SearchIcon } from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { useSearchQuery } from "@/Hooks/useWeather";


const Search = () => {

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    const { data: queryData, isLoading } = useSearchQuery(query);

  return (
  <div>
  <Button variant={"outline"} className="w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64" onClick={() => setOpen(true)}>
    <SearchIcon />
    Search Cities...
  </Button>
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." value={query} onValueChange={setQuery}/>
      <CommandList>
        {query.length >= 2 && !isLoading && (
            <CommandEmpty>No results found.</CommandEmpty>
        )}

        {queryData && queryData.length > 0 && (
        <CommandGroup heading="Suggestions">
            {isLoading && (
                <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-4 w-4 animate-spin"/>
                </div>
            )}
            {queryData.map((q) => {
               return <CommandItem key={`${q.lat} - ${q.lon}`}
                value={`${q.lat} | ${q.lon} | ${q.name} | ${q.country}`}>
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

  </div>
  )
}

export default Search