import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { useEffect, useState } from 'react'
import { TabOption } from './NewTab'
import { DrawingPinIcon, GearIcon, LayoutIcon } from '@radix-ui/react-icons'
import { CommandSearchCTA } from './CommandSearchCTA'

interface CommandSearchProps {
  tab: TabOption
  setTab: React.Dispatch<React.SetStateAction<TabOption>>
}
export const CommandSearch = ({ tab, setTab }: CommandSearchProps) => {
  const [open, setOpen] = useState(false)

  const handleCmdKSelection = (currentValue: string) => {
    setTab(currentValue === tab ? tab : (currentValue as TabOption))
    setOpen(false)
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }

      if (e.key === 's' && e.metaKey) {
        e.preventDefault()
        handleCmdKSelection('settings')
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [tab])

  return (
    <div>
      <CommandSearchCTA />

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Tabs">
            <CommandItem onSelect={handleCmdKSelection} value={'home'}>
              <DrawingPinIcon className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem value={'tasks'} onSelect={handleCmdKSelection}>
              <LayoutIcon className="mr-2 h-4 w-4" />
              <span>Tasks</span>
            </CommandItem>
            <CommandItem onSelect={handleCmdKSelection} value={'notes'}>
              <DrawingPinIcon className="mr-2 h-4 w-4" />
              <span>Notes</span>
            </CommandItem>
            <CommandItem onSelect={handleCmdKSelection} value={'settings'}>
              <GearIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Tasks"></CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Notes"></CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}
