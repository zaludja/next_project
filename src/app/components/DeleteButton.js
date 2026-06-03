'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase'

export default function DeleteButton({ id }) {
  const router = useRouter()

  async function handleDelete() {
    await supabase.from('tasks').delete().eq('id', id)
    router.push('/tasks')
    router.refresh()
  }

  return (
    <button className="btn-danger" onClick={handleDelete}>
      Smazat
    </button>
  )
}
