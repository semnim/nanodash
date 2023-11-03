import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

export const AddCardPlaceholder = ({ onClick }: { onClick: () => void }) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div className="py-4 select-none mx-4">
      <Card
        onClick={onClick}
        className={`min-w-[275px]
      min-h-[100px] 
      mx-auto
      h-[170px] 
      border-dashed 
      border-2 
      bg-opacity-40 
      bg-transparent  
      glass 
      cursor-pointer 
      rounded 
      transition 
      duration-300 
      ease-in-out 
      text-primary
      ${isHovering && 'box-shadow -translate-y-1 transition-all'}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-center">Add a new task</CardTitle>
          {/* <CardDescription className="text-gray-600">Click here to create a new card</CardDescription> */}
        </CardHeader>
        <CardContent className={`flex items-center justify-center`}>
          <PlusCircledIcon className="text-primary rounded-full" width="40" height="40" />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  )
}
