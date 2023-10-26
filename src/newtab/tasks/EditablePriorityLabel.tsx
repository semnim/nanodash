import { useState } from 'react'
import { Priority, PrioritySelect, capitalize } from './PrioritySelect'
import { priorityColors } from './TaskCard'
import { Button } from '@/components/ui/button'

export const EditablePriorityLabel = ({
  priority,
  applyChanges,
}: {
  priority: Priority
  applyChanges: (newValue: Priority) => void
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(priority)

  const resetValueEditStates = (newValue: Priority) => {
    setValue(newValue)
    setIsEditing(false)
  }

  const submitChanges = (newValue: Priority) => {
    applyChanges(newValue)
    resetValueEditStates(value)
  }

  const editComponent = (
    <PrioritySelect initialPriority={value} submitChanges={submitChanges}></PrioritySelect>
  )

  return (
    <Button
      onClick={() => setIsEditing(!isEditing)}
      className={`font-light text-sm  ${priorityColors[priority]} hover:text-primary hover:${priorityColors[priority]}/90 w-[150px] justify-start text-primary`}
    >
      {isEditing ? editComponent : capitalize(priority)}
    </Button>
  )
}
