"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";

const RECENT_SEARCHES_KEY = "recent_searches";
const MAX_RECENT_SEARCHES = 5;

const SearchBar = ({
  width = "w-[700px]",
  className,
  padding = "py-4",
  shadow = "shadow-2xl",
}) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState({
    cities: [],
    projects: [],
    developers: [],
  });
  const [loading, setLoading] = React.useState(false);
  const commandRef = React.useRef(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [recentSearches, setRecentSearches] = React.useState([]);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (commandRef.current && !commandRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    const fetchSearchResults = async () => {
      if (!debouncedSearch) {
        setSearchResults({ cities: [], projects: [], developers: [] });
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://api.homebaba.ca/api/search/?q=${encodeURIComponent(
            debouncedSearch
          )}`
        );
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearch]);

  React.useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const handleSelect = (type, item) => {
    setOpen(false);

    const newSearch = {
      type,
      id: item.id,
      name: item.name,
      icon: item.icon,
      subtext: item.subtext,
    };

    const updatedSearches = [
      newSearch,
      ...recentSearches
        .filter((search) => search.id !== item.id)
        .slice(0, MAX_RECENT_SEARCHES - 1),
    ];

    setRecentSearches(updatedSearches);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));

    if (type === "cities") {
      router.push(
        `/pre-construction-homes/${item.name.split(",")[0].toLowerCase()}`
      );
    } else if (type === "projects") {
      router.push(`/pre-construction-homes/${item.slug}`);
    } else if (type === "developers") {
      router.push(`/developer/${item.slug}`);
    }
  };

  return (
    <div className={cn("relative mx-auto", width, className)} ref={commandRef}>
      <Command className={cn("rounded-t-lg border", shadow)}>
        <CommandInput
          placeholder="Search homes by city, project name, or developer..."
          className={cn("pl-2 w-full text-[11px] md:text-sm", padding)}
          onFocus={() => setOpen(true)}
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        {open && (
          <CommandList className="absolute w-full bg-white rounded-b-lg border-x border-b top-[96%] left-0 shadow-lg mt-[2px] z-[100] max-h-[300px] overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Loading...
              </div>
            ) : (
              <>
                <CommandEmpty>No results found.</CommandEmpty>

                {!searchQuery && recentSearches.length > 0 && (
                  <CommandGroup
                    heading="Recent Searches"
                    className="text-start"
                  >
                    {recentSearches.map((item) => (
                      <CommandItem
                        key={`${item.type}-${item.id}`}
                        value={item.name}
                        className="flex flex-col items-start p-2"
                        onSelect={() => handleSelect(item.type, item)}
                      >
                        <div className="flex items-start gap-2">
                          <span>{item.icon}</span>
                          <span>{item.name}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {searchResults.cities?.length > 0 && (
                  <CommandGroup heading="Cities" className="text-start">
                    {searchResults.cities.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.name}
                        className="flex flex-col items-start p-2"
                        onSelect={() => handleSelect("cities", item)}
                      >
                        <div className="flex items-start gap-2">
                          <span>{item.icon}</span>
                          <span>{item.name}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {searchResults.projects?.length > 0 && (
                  <CommandGroup heading="Projects" className="text-start">
                    {searchResults.projects.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.name}
                        className="flex flex-col items-start p-2"
                        onSelect={() => handleSelect("projects", item)}
                      >
                        <div className="flex items-start gap-2">
                          <span>{item.icon}</span>
                          <span>{item.name}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {searchResults.developers?.length > 0 && (
                  <CommandGroup heading="Developers" className="text-start">
                    {searchResults.developers.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.name}
                        className="flex flex-col items-start p-2"
                        onSelect={() => handleSelect("developers", item)}
                      >
                        <div className="flex items-start gap-2">
                          <span>{item.icon}</span>
                          <span>{item.name}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        )}
      </Command>
    </div>
  );
};

export default SearchBar;
