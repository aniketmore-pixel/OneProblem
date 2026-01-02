// lib/queries/blogs.js
import { supabase } from '@/lib/supabaseClient';

/**
 * Get blogs by category slug
 */
export const getBlogsByCategory = async (slug) => {
  const { data: categoryData, error: categoryError } = await supabase
    .from('categories')
    .select('category_id')
    .eq('slug', slug)
    .single();

  if (categoryError || !categoryData) {
    console.error(categoryError);
    return [];
  }

  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('category_id', categoryData.category_id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return blogs;
};

/**
 * Get trending blogs
 */
export const getTrendingBlogs = async () => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('is_trending', true)
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
};

export const getBlogsByCategorySlug = async (slug) => {
  const { data, error } = await supabase
    .from('blogs')
    .select(`
      blog_id,
      title,
      slug,
      summary,
      featured_image,
      categories (
        name,
        slug
      )
    `)
    .eq('categories.slug', slug)

  if (error) {
    console.error(error)
    return []
  }

  return data
}

export const getBlogBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('blogs')
    .select(`
      blog_id,
      title,
      summary,
      featured_image,
      content,
      created_at,

      affiliate_1_title,
      affiliate_1_url,
      affiliate_2_title,
      affiliate_2_url,
      affiliate_3_title,
      affiliate_3_url,
      affiliate_4_title,
      affiliate_4_url,
      affiliate_5_title,
      affiliate_5_url,

      categories (
        name,
        slug
      )
    `)
    .eq('slug', slug)
    .single()

  if (error) {
    console.error(error)
    return null
  }

  return data
}


export const getAllBlogs = async () => {
  const { data, error } = await supabase
    .from('blogs')
    .select('slug, created_at, updated_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data
}