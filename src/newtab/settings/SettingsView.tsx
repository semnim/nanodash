import * as React from 'react'
import { CaretSortIcon, Cross1Icon, DoubleArrowDownIcon } from '@radix-ui/react-icons'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { quoteTopicList } from '../home/quoteTopicList'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { capitalize } from '../tasks/PrioritySelect'
export type Topic = {
  isChecked: boolean
  label: string
}
export const SettingsView = () => {
  const [isOpen, setIsOpen] = React.useState(true)
  const [quoteInputValue, setQuoteInputValue] = React.useState('')
  const { setItem, getItem } = useLocalStorage('quote-topics')
  const initialTopicListFromConfig = quoteTopicList.map((topic) => ({
    label: topic,
    isChecked: false,
  }))
  const [topics, setTopics] = React.useState<Topic[]>(
    (getItem() ?? initialTopicListFromConfig).map((topic: Topic) => ({
      label: capitalize(topic.label),
      isChecked: topic.isChecked,
    })),
  )

  const handleCheckedChange = (topic: Topic) => {
    setTopics((prev) => {
      const updated = prev.map((t) =>
        t.label === topic.label ? { label: topic.label, isChecked: !topic.isChecked } : t,
      )
      setItem(updated)
      return updated
    })
  }

  const [showScrollIndicator, setShowScrollIndicator] = React.useState(true)

  return (
    <div className="glass flex flex-col items-center w-full justify-start">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2 text-primary w-full">
        <div className="flex items-center justify-between space-x-4 px-4">
          <CollapsibleTrigger asChild>
            <div className="flex justify-between w-full cursor-pointer items-center min-h-[50px] p-2">
              <div>
                <h2 className="text-3xl">Customize quote topics</h2>
                <h3>Select topics to filter the fetched quotes by.</h3>
                <h3>By default, no topics are excluded.</h3>
              </div>
              <CaretSortIcon className="h-4 w-4 text-lg" />
            </div>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="p-4 grid gap-4">
          <div className="flex gap-8">
            <div className="w-[50%] text-primary flex flex-nowrap gap-4">
              <Input
                className="placeholder:text-primary"
                placeholder="Search for a topic"
                value={quoteInputValue}
                onChange={(event) => setQuoteInputValue(event.target.value.toLowerCase())}
              />
              <Button
                variant="outline"
                className="flex gap-4"
                onClick={() => {
                  setTopics((prev) => prev.map((t) => ({ label: t.label, isChecked: false })))
                }}
              >
                <span>Reset selection</span>
                <Cross1Icon />
              </Button>
            </div>
            <h3 className="text-2xl px-10">Selected topics</h3>
          </div>
          <Separator className="w-full" />
          <div className="flex gap-8">
            <div
              className="grid grid-cols-3 w-[50%] overflow-scroll max-h-[400px]"
              onScroll={() => setShowScrollIndicator(false)}
            >
              {topics
                .filter((topic) => topic.label.toLowerCase().includes(quoteInputValue))
                .map((topic) => {
                  return (
                    <div className="w-full flex px-4 py-2 font-mono text-sm shadow-sm gap-3">
                      <Checkbox
                        onCheckedChange={() => handleCheckedChange(topic)}
                        checked={topic.isChecked}
                      />
                      <span className="text-primary">{topic.label}</span>
                    </div>
                  )
                })}
            </div>
            {showScrollIndicator && (
              <DoubleArrowDownIcon className="absolute bottom-8 right-[50%] blink" />
            )}
            <Separator orientation="vertical" />
            <div>
              {topics
                .filter((topic) => topic.isChecked)
                .map((topic) => (
                  <div className="w-full flex px-4 py-2 font-mono text-sm shadow-sm gap-3">
                    <Checkbox
                      checked={topic.isChecked}
                      onCheckedChange={() => handleCheckedChange(topic)}
                    />
                    <span className="text-primary">{topic.label}</span>
                  </div>
                ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
