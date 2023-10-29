import './styles/NewTab.css'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { TasksView } from './tasks/TasksView'
import { HomeView } from './home/HomeView'
import { useState } from 'react'
import { CommandSearch } from './CommandSearch'
import { DashboardTabsList } from './DashboardTabsList'
import { SettingsView } from './settings/SettingsView'

export type TabOption = 'home' | 'tasks' | 'notes' | 'settings'

export const NewTab = () => {
  const [tab, setTab] = useState<TabOption>('home')

  return (
    <section>
      <Tabs
        defaultValue="home"
        value={tab}
        onValueChange={(newValue) => setTab(newValue as TabOption)}
        className="h-screen p-4 w-screen flex flex-col"
      >
        <div className="flex items-center gap-4">
          <DashboardTabsList tab={tab} setTab={setTab} />
          <CommandSearch tab={tab} setTab={setTab} />
        </div>

        <TabsContent value="home">
          <HomeView />
        </TabsContent>

        <TabsContent value="tasks" className="lg:grid lg:grid-cols-3 justify-items-center gap-4">
          <TasksView />
        </TabsContent>

        <TabsContent value="notes"></TabsContent>

        <TabsContent value="settings" className="grid lg:grid-cols-1 justify-items-center gap-4">
          <SettingsView />
        </TabsContent>
      </Tabs>
    </section>
  )
}
export default NewTab
