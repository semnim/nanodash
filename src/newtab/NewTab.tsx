import './NewTab.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TasksView } from './tasks/TasksView'
import { DrawingPinIcon, GearIcon, HomeIcon, LayoutIcon } from '@radix-ui/react-icons'
import { HomeView } from './home/HomeView'
import { capitalize } from './tasks/PrioritySelect'
import { useEffect, useRef, useState } from 'react'
import autoAnimate from '@formkit/auto-animate'
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
const ConditionalTabLabel = ({ tab, label }: { tab: string; label: string }) => {
  return tab === label ? <span>{capitalize(label)}</span> : null
}
export type TabOption = 'home' | 'tasks' | 'notes' | 'settings'

export const NewTab = () => {
  const [tab, setTab] = useState<TabOption>('home')

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }

      if (e.key === 's' && e.metaKey) {
        e.preventDefault()
        setTab('settings')
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleCmdKSelection = (choice: TabOption) => {
    setTab(choice)
    setOpen(false)
  }
  useEffect(() => {
    setOpen(false)
  }, [tab])
  return (
    <section>
      <Tabs
        defaultValue="home"
        value={tab}
        onValueChange={(newValue) => setTab(newValue as TabOption)}
        className="h-screen p-4 w-screen"
      >
        <div className="flex items-center gap-4">
          <TabsList>
            <TabsTrigger className="gap-2" value="home" onClick={() => setTab('home')}>
              <HomeIcon />
              <ConditionalTabLabel label="home" tab={tab} />
            </TabsTrigger>

            <TabsTrigger className="gap-2" value="tasks" onClick={() => setTab('tasks')}>
              <LayoutIcon />
              <ConditionalTabLabel label="tasks" tab={tab} />
            </TabsTrigger>

            <TabsTrigger className="gap-2" value="notes" onClick={() => setTab('notes')}>
              <DrawingPinIcon />
              <ConditionalTabLabel label="notes" tab={tab} />
            </TabsTrigger>

            <TabsTrigger className="gap-2" value="settings" onClick={() => setTab('settings')}>
              <GearIcon />
              <ConditionalTabLabel label="settings" tab={tab} />
            </TabsTrigger>
          </TabsList>

          <div>
            <p className="h-[36px] text-sm text-white glass py-[.5rem] px-[1rem] flex items-center gap-3">
              Press{' '}
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </p>
            <CommandDialog open={open} onOpenChange={setOpen}>
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem
                    onClick={() => handleCmdKSelection('tasks')}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleCmdKSelection('tasks')
                      }
                    }}
                  >
                    <LayoutIcon className="mr-2 h-4 w-4" />
                    <span>Tasks</span>
                  </CommandItem>
                  <CommandItem onClick={() => setTab('notes')}>
                    <DrawingPinIcon className="mr-2 h-4 w-4" />
                    <span>Notes</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem onClick={() => setTab('settings')}>
                    <GearIcon className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <CommandShortcut>⌘S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </CommandDialog>
          </div>
        </div>
        <TabsContent value="home">
          <HomeView />
        </TabsContent>

        <TabsContent value="tasks" className="grid grid-cols-3 justify-items-center gap-4">
          <TasksView />
        </TabsContent>

        <TabsContent value="notes"></TabsContent>

        <TabsContent value="settings"></TabsContent>
      </Tabs>
    </section>
  )
}
export default NewTab
