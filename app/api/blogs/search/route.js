// app/api/blogs/search/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';

  if (!query) {
    return NextResponse.json([], { status: 200 });
  }

  const { data, error } = await supabase
    .from('blogs')
    .select('blog_id, title, slug, featured_image')
    .ilike('title', `%${query}%`) // case-insensitive search
    .order('created_at', { ascending: false })
    .limit(5); // top 5 results

  if (error) {
    console.error('Supabase search error:', error);
    return NextResponse.json([], { status: 500 });
  }

  return NextResponse.json(data);
}
