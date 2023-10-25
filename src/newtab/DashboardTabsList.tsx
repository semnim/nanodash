import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DrawingPinIcon, GearIcon, HomeIcon, LayoutIcon } from '@radix-ui/react-icons'
import { capitalize } from './tasks/PrioritySelect'
import { TabOption } from './NewTab'

const ConditionalTabLabel = ({ tab, label }: { tab: string; label: string }) => {
  return tab === label ? <span>{capitalize(label)}</span> : null
}

interface DashboardTabsListProps {
  tab: TabOption
  setTab: React.Dispatch<React.SetStateAction<TabOption>>
}
export const DashboardTabsList = ({ tab, setTab }: DashboardTabsListProps) => {
  return (
    <TabsList className="w-[230px] justify-stretch">
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
  )
}
