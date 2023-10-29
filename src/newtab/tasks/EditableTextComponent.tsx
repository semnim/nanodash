import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import Markdown from 'react-markdown'

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
        placeholder="Add a description"
        onFocus={(event) =>
          event.target.setSelectionRange(
            event.currentTarget.value.length,
            event.currentTarget.value.length,
          )
        }
        className={'min-h-[50px] leading-none tracking-tight'}
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
    <div
      className="[&>ul]:list-disc [&>ul]:px-4 whitespace-pre-wrap break-words break-all"
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        editComponent
      ) : (
        <Markdown
          className={`pl-3 ${
            type === 'textarea' ? 'min-h-[50px] pt-[.33rem] text-[.825rem]' : 'min-h-[20px]'
          } font-normal text-sm ${!initialValue && 'text-muted-foreground'}`}
        >
          {initialValue.length === 0
            ? `Add a ${type === 'input' ? 'task' : 'description'}`
            : initialValue}
        </Markdown>
      )}
    </div>
  )
}
