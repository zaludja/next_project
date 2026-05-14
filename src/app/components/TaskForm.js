'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase'

const schema = z.object({
  title: z.string().min(2, 'Název musí mít alespoň 2 znaky'),
  description: z.string().optional(),
  status: z.enum(['pending', 'in_progress', 'done']),
  due_date: z.string().optional(),
})

export default function TaskForm({ defaultValues }) {
  const router = useRouter()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? {
      title: '',
      description: '',
      status: 'pending',
      due_date: '',
    },
  })

  async function onSubmit(data) {
    if (defaultValues?.id) {
      await supabase.from('tasks').update(data).eq('id', defaultValues.id)
    } else {
      await supabase.from('tasks').insert(data)
    }
    router.push('/tasks')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Název</label>
        <input id="title" type="text" {...register('title')} />
        {errors.title && <p className="form-error">{errors.title.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Popis</label>
        <textarea id="description" rows={3} {...register('description')} />
      </div>

      <div className="form-group">
        <label htmlFor="status">Stav</label>
        <select id="status" {...register('status')}>
          <option value="pending">Nevyřízeno</option>
          <option value="in_progress">Probíhá</option>
          <option value="done">Splněno</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="due_date">Termín</label>
        <input id="due_date" type="date" {...register('due_date')} />
      </div>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={() => router.back()}>
          Zrušit
        </button>
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Ukládám...' : defaultValues?.id ? 'Uložit změny' : 'Vytvořit úkol'}
        </button>
      </div>
    </form>
  )
}
