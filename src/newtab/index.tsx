import React from 'react'
import ReactDOM from 'react-dom/client'
import { NewTab } from './NewTab'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <NewTab />
    </DndProvider>
  </React.StrictMode>,
)
