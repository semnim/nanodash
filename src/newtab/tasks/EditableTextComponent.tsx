import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'

export type EditableTextComponentType = 'input' | 'textarea' | 'select'

export const EditableTextComponent = ({
  initialValue,
  applyChanges,
  type = 'input',
}: {
  initialValue: string
  applyChanges: (newValue: string) => void
  type?: EditableTextComponentType
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialValue)

  const resetValueEditStates = (newValue: string) => {
    setValue(newValue)
    setIsEditing(false)
  }

  const submitChanges = () => {
    applyChanges(value)
    resetValueEditStates(value)
  }
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' && !event.shiftKey) || event.key === 'Escape') {
      submitChanges()
    }
  }

  const editComponent =
    type === 'input' ? (
      <Input
        onBlur={() => submitChanges()}
        className={'font-semibold leading-none tracking-tight'}
        autoFocus
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
        }}
        onKeyDown={handleKeyDown}
      />
    ) : (
      <Textarea
        onBlur={() => submitChanges()}
        className={'font-semibold leading-none tracking-tight'}
        autoFocus
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
        }}
        onKeyDown={handleKeyDown}
      />
    )

  return (
    <div className="whitespace-pre-wrap break-words break-all" onClick={() => setIsEditing(true)}>
      {isEditing ? editComponent : initialValue}
    </div>
  )
}
