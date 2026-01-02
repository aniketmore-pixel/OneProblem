import { supabase } from '@/lib/supabaseClient'

export async function incrementBlogViews(blogId) {
  const { error } = await supabase.rpc('increment_blog_views', {
    blog_id_input: blogId
  })

  if (error) {
    console.error('Failed to increment views:', error)
  }
}
