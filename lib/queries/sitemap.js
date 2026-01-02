import { supabase } from '@/lib/supabaseClient'

export const getAllBlogs = async () => {
  const { data, error } = await supabase
    .from('blogs')
    .select('slug, created_at, updated_at')

  if (error) {
    console.error(error)
    return []
  }

  return data
}
