import { useEffect, useState } from 'react'

export type TabOption = 'home' | 'tasks' | 'notes' | 'settings'
export const useTabs = () => {
  const [tab, setTab] = useState<TabOption>('tasks')

  // const handleKeyboardNavigation = (event: KeyboardEvent) => {
  //   if (isNaN(Number(event.key)) && !event.shiftKey) {
  //     return
  //   }
  //   const keycode = Number(event.key)

  //   if (keycode < 1 || keycode > 4) {
  //     return
  //   }

  //   const views: (typeof tab)[] = ['home', 'tasks', 'notes', 'settings']

  //   setTab(views[keycode - 1])
  // }

  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyboardNavigation)
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyboardNavigation)
  //   }
  // }, [])

  return { tab, setTab }
}
