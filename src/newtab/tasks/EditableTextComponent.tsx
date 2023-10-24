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
    if (event.key === 'Tab') {
      event.preventDefault()
      setValue((prev) => `${prev}\t`)
    }
    const isSubmit = event.key === 'Enter' && !event.shiftKey
    const isClose = event.key === 'Escape'

    if (isSubmit && value.trim().length < 1) {
      setValue(initialValue)
      setIsEditing(false)
      return
    }
    if (isSubmit || isClose) {
      submitChanges()
    }
  }

  const editComponent =
    type === 'input' ? (
      <Input
        onFocus={(event) =>
          event.target.setSelectionRange(
            event.currentTarget.value.length,
            event.currentTarget.value.length,
          )
        }
        onBlur={() => submitChanges()}
        className={'font-semibold leading-none tracking-tight'}
        autoFocus
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
        }}
        onKeyDown={handleKeyDown}
        required
      />
    ) : (
      <Textarea
        onBlur={() => submitChanges()}
        onFocus={(event) =>
          event.target.setSelectionRange(
            event.currentTarget.value.length,
            event.currentTarget.value.length,
          )
        }
        className={'font-semibold leading-none tracking-tight'}
        autoFocus
        value={value}
        required
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
