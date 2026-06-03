export const dynamic = 'force-dynamic'

import { supabase } from '@/utils/supabase'
import Link from 'next/link'
import TaskCard from '@/app/components/TaskCard'
import Sidebar from '@/app/components/Sidebar'

export default async function TasksPage() {
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <p className="tasks-error">Chyba při načítání úkolů: {error.message}</p>
  }

  const activeTasks = tasks.filter(t => t.status !== 'done')
  const doneTasks = tasks.filter(t => t.status === 'done')

  return (
    <div className="tasks-layout">
      <Sidebar tasks={doneTasks} />

      <main className="tasks-page">
        <div className="tasks-header">
          <h1>Moje úkoly</h1>
          <Link href="/tasks/new" className="btn-primary">
            + Přidat úkol
          </Link>
        </div>

        {activeTasks.length === 0 ? (
          <p className="tasks-empty">Žádné aktivní úkoly. Přidejte první!</p>
        ) : (
          <div className="task-list">
            {activeTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
