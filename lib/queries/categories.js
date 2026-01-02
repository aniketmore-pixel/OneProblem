import { supabase } from '@/lib/supabaseClient';

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }
  return data;
};

export const getCategoryBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error(error)
    return null
  }
  return data
}

export const getBlogsByCategory = async (categoryId, sort = 'latest') => {
  let query = supabase
    .from('blogs')
    .select('*')
    .eq('category_id', categoryId)

  if (sort === 'latest') query = query.order('published_at', { ascending: false })
  if (sort === 'popular') query = query.order('views', { ascending: false })

  const { data, error } = await query
  if (error) {
    console.error(error)
    return []
  }
  return data
}
