import Link from 'next/link'
import { formatDate } from '@/utils/format'
import MarkDoneButton from '@/app/components/MarkDoneButton'
import DeleteButton from '@/app/components/DeleteButton'

const statusLabel = {
  pending: 'Nevyřízeno',
  in_progress: 'Probíhá',
  done: 'Splněno',
}

const statusClass = {
  pending: 'status-pending',
  in_progress: 'status-in-progress',
  done: 'status-done',
}

export default function TaskCard({ task }) {
  return (
    <div className="task-card">
      <div className="task-card__header">
        <h2 className="task-card__title">{task.title}</h2>
        <span className={`task-status ${statusClass[task.status] ?? ''}`}>
          {statusLabel[task.status] ?? task.status}
        </span>
      </div>

      {task.description && (
        <p className="task-card__description">{task.description}</p>
      )}

      {task.due_date && (
        <p className="task-card__due">Termín: {formatDate(task.due_date)}</p>
      )}

      <div className="task-card__actions">
        <Link href={`/tasks/${task.id}/edit`} className="btn-secondary">
          Upravit
        </Link>
        {task.status !== 'done'
          ? <MarkDoneButton id={task.id} />
          : <DeleteButton id={task.id} />
        }
      </div>
    </div>
  )
}
