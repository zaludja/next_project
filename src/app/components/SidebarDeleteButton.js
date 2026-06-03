'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase'

export default function SidebarDeleteButton({ id }) {
  const router = useRouter()

  async function handleDelete() {
    await supabase.from('tasks').delete().eq('id', id)
    router.refresh()
  }

  return (
    <button className="sidebar__delete" onClick={handleDelete}>
      ✕
    </button>
  )
}
