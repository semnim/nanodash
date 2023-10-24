import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { priorityColors } from './TaskCard'
import { useRef, useState } from 'react'

export const capitalize = (word: string) => {
  return `${word[0].toUpperCase()}${word.slice(1)}`
}

export const PrioritySelect = ({
  initialPriority,
  submitChanges,
}: {
  initialPriority: 'low' | 'medium' | 'high'
  submitChanges: (newValue: 'low' | 'medium' | 'high') => void
}) => {
  const priorities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high']

  return (
    <Select
      defaultOpen
      onValueChange={(newValue: 'low' | 'medium' | 'high') => submitChanges(newValue)}
    >
      <SelectTrigger onBlur={() => submitChanges(initialPriority)} className={`w-[180px]`}>
        <SelectValue
          placeholder={capitalize(initialPriority)}
          className={`text-sm ${priorityColors[initialPriority]}`}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Priorities</SelectLabel>
          {priorities.map((prio) => (
            <SelectItem className={`text-[${priorityColors[initialPriority]}]`} value={prio}>
              {capitalize(prio)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
