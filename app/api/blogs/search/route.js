import { supabaseServer } from '@/lib/supabase-server'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q') || ''

    console.log('[API] Searching blogs for query:', query)

    const { data, error } = await supabaseServer
      .from('blogs')
      .select('blog_id, title, slug, featured_image')
      .ilike('title', `%${query}%`)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[Supabase Error]', error)
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }

    console.log('[Supabase Data]', data)

    return new Response(JSON.stringify({ data }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('[API Error]', err)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 })
  }
}
