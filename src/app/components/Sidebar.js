'use client'

import { useState } from 'react'
import SidebarDeleteButton from './SidebarDeleteButton'

export default function Sidebar({ tasks }) {
  const [open, setOpen] = useState(true)

  return (
    <aside className={`sidebar ${open ? 'sidebar--open' : 'sidebar--closed'}`}>
      <button className="sidebar__toggle" onClick={() => setOpen(!open)}>
        {open ? '◀' : '▶'}
      </button>

      {open && (
        <>
          <div className="sidebar__header">
            <h2>Splněné</h2>
            <span className="sidebar__count">{tasks.length}</span>
          </div>

          <div className="sidebar__list">
            {tasks.length === 0 ? (
              <p className="sidebar__empty">Žádné splněné úkoly</p>
            ) : (
              tasks.map(task => (
                <div key={task.id} className="sidebar__item">
                  <span className="sidebar__item-title">{task.title}</span>
                  <SidebarDeleteButton id={task.id} />
                </div>
              ))
            )}
          </div>
        </>
      )}
    </aside>
  )
}
