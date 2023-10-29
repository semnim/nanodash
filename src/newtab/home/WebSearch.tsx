import { Input } from '@/components/ui/input'
import { ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { MagnifyingGlass } from 'react-loader-spinner'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { capitalize } from '../tasks/PrioritySelect'
import { useLocalStorage } from '../hooks/useLocalStorage'

type SearchEngine = {
  name: string
  searchUrl: string
}
export const WebSearch = () => {
  const searchEngines: SearchEngine[] = [
    {
      name: 'google',
      searchUrl: 'https://www.google.com/search?q=',
    },
    {
      name: 'bing',
      searchUrl: 'https://www.bing.com/search?q=',
    },
    {
      name: 'yahoo',
      searchUrl: 'https://search.yahoo.com/search?q=',
    },
    {
      name: 'ecosia',
      searchUrl: 'https://www.ecosia.org/search?q=',
    },
    {
      name: 'DuckDuckGo',
      searchUrl: 'https://duckduckgo.com/',
    },
    {
      name: 'yandex',
      searchUrl: 'https://yandex.com/search/?text=',
    },
  ]
  const { getItem, setItem } = useLocalStorage('searchEnginePreference')

  const [queryString, setQueryString] = useState('')
  const [searchOptionsOpen, setSearchOptionsOpen] = useState(false)
  const [currentSearchEngine, setCurrentSearchEngine] = useState<SearchEngine>(
    searchEngines.find((searchEngine) => searchEngine.name === getItem()) ?? searchEngines[0],
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryString(event.target.value)
  }

  const handleKeydown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      window.open(`${currentSearchEngine.searchUrl}${queryString}`, '_self')
    }
  }
  const handleChevronClick = () => {
    setSearchOptionsOpen(!searchOptionsOpen)
  }
  return (
    <div className="w-full flex justify-center items-center mt-12">
      <MagnifyingGlassIcon
        className="pointer-events-none relative z-10 text-primary top-2 left-10"
        width={25}
        height={25}
      />
      <Input
        autoFocus
        className="glass w-[50%] min-h-[3rem] text-primary mt-4 text-xl placeholder:text-primary pl-12"
        placeholder="Search..."
        onChange={handleChange}
        onKeyDown={handleKeydown}
      />
      <DropdownMenu
        open={searchOptionsOpen}
        onOpenChange={(newOpen) => setSearchOptionsOpen(newOpen)}
      >
        <DropdownMenuTrigger asChild>
          <ChevronDownIcon
            width={25}
            height={25}
            className={`relative z-10 text-primary top-2 right-10 ${
              searchOptionsOpen && 'rotate-180 transition-all duration-200'
            }`}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Search Engine</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {searchEngines.map((searchEngine) => {
            const isChosen = searchEngine.name === currentSearchEngine.name
            return (
              <DropdownMenuCheckboxItem
                checked={isChosen}
                onCheckedChange={() => {
                  setCurrentSearchEngine(searchEngine)
                  setItem(searchEngine.name)
                }}
              >
                {capitalize(searchEngine.name)}
              </DropdownMenuCheckboxItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
