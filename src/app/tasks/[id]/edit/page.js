import { notFound } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import TaskForm from '@/app/components/TaskForm'

export default async function EditTaskPage({ params }) {
  const { id } = await params

  const { data: task } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single()

  if (!task) notFound()

  return (
    <main className="form-page">
      <h1>Upravit úkol</h1>
      <TaskForm defaultValues={task} />
    </main>
  )
}
