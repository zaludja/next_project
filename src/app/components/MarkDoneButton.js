'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase'

export default function MarkDoneButton({ id }) {
  const router = useRouter()

  async function handleMarkDone() {
    await supabase.from('tasks').update({ status: 'done' }).eq('id', id)
    router.refresh()
  }

  return (
    <button className="btn-done" onClick={handleMarkDone}>
      ✓ Splněno
    </button>
  )
}
