import { useEffect, useState } from 'react'
import { PrioritySelect, capitalize } from './PrioritySelect'
import { priorityColors } from './TaskCard'

export const EditablePriorityLabel = ({
  priority,
  applyChanges,
}: {
  priority: 'low' | 'medium' | 'high'
  applyChanges: (newValue: 'low' | 'medium' | 'high') => void
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(priority)

  const resetValueEditStates = (newValue: 'low' | 'medium' | 'high') => {
    setValue(newValue)
    setIsEditing(false)
  }

  useEffect(() => {
    console.log(isEditing)
  }, [isEditing])

  const submitChanges = (newValue: 'low' | 'medium' | 'high') => {
    applyChanges(newValue)
    resetValueEditStates(value)
  }

  const editComponent = (
    <PrioritySelect initialPriority={value} submitChanges={submitChanges}></PrioritySelect>
  )

  return (
    <span onClick={() => setIsEditing(true)} className={`text-sm ${priorityColors[priority]}`}>
      {isEditing ? editComponent : capitalize(priority)}
    </span>
  )
}
