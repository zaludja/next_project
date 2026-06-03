import { notFound } from 'next/navigation'
import { formatDate } from '@/utils/format'
import Link from 'next/link'
import { supabase } from '@/utils/supabase'
import DeleteButton from '@/app/components/DeleteButton'

const statusLabel = {
  pending: 'Nevyřízeno',
  in_progress: 'Probíhá',
  done: 'Splněno',
}

export default async function TaskDetailPage({ params }) {
  const { id } = await params

  const { data: task } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single()

  if (!task) notFound()

  return (
    <main className="detail-page">
      <div className="detail-header">
        <h1>{task.title}</h1>
        <span className={`task-status status-${task.status}`}>
          {statusLabel[task.status] ?? task.status}
        </span>
      </div>

      {task.description && (
        <p className="detail-description">{task.description}</p>
      )}

      {task.due_date && (
        <p className="detail-due">Termín: {formatDate(task.due_date)}</p>
      )}

      <div className="detail-actions">
        <Link href="/tasks" className="btn-secondary">← Zpět</Link>
        <Link href={`/tasks/${task.id}/edit`} className="btn-secondary">Upravit</Link>
        <DeleteButton id={task.id} />
      </div>
    </main>
  )
}
