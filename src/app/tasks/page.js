import { supabase } from '@/utils/supabase'
import Link from 'next/link'
import TaskCard from '@/app/components/TaskCard'

export default async function TasksPage() {
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <p className="text-red-500 p-4">Chyba při načítání úkolů: {error.message}</p>
  }

  return (
    <main className="tasks-page">
      <div className="tasks-header">
        <h1>Moje úkoly</h1>
        <Link href="/tasks/new" className="btn-primary">
          + Přidat úkol
        </Link>
      </div>

      {tasks.length === 0 ? (
        <p className="tasks-empty">Žádné úkoly. Přidejte první!</p>
      ) : (
        <div className="task-list">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </main>
  )
}
