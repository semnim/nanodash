import './NewTab.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TasksView } from './tasks/TasksView'
import { DrawingPinIcon, GearIcon, HomeIcon, LayoutIcon } from '@radix-ui/react-icons'
import { HomeView } from './home/HomeView'
import { TabOption, useTabs } from './hooks/useTabs'
import { capitalize } from './tasks/PrioritySelect'
import { useEffect, useRef } from 'react'
import autoAnimate from '@formkit/auto-animate'

const ConditionalTabLabel = ({ tab, label }: { tab: string; label: string }) => {
  return tab === label ? <span>{capitalize(label)}</span> : null
}

export const NewTab = () => {
  const { tab, setTab } = useTabs()

  return (
    <section>
      <Tabs
        defaultValue="tasks"
        value={tab}
        onValueChange={(newValue) => setTab(newValue as TabOption)}
        className="h-screen p-4 w-screen"
      >
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
