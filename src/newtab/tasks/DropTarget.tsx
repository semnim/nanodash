import { useDrop } from 'react-dnd'
import { ItemTypes } from './TaskItemCard'

const DropTarget = () => {
  const [, ref] = useDrop({
    accept: ItemTypes.TASK, // Specify the accepted item type
    drop: (item) => {
      // Handle the dropped item here, e.g., reorder the task list
    },
  })

  return (
    <div ref={ref} className="drop-target">
      {/* ... Your drop target content ... */}
    </div>
  )
}

export default DropTarget
