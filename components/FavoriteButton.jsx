'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Toast from './Toast'

export default function FavoriteButton({ blogId }) {
    const [username, setUsername] = useState(null)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [showToast, setShowToast] = useState(false)

    // 🔹 Get username from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('user') // ✅ CORRECT KEY

        console.log('📦 Raw localStorage user:', stored)

        if (!stored) {
            console.log('❌ No user found in localStorage')
            return
        }

        try {
            const parsed = JSON.parse(stored)
            const uname = parsed?.user?.username

            console.log('👤 Username from localStorage:', uname)

            if (uname) {
                setUsername(uname)
            }
        } catch (err) {
            console.error('❌ Failed to parse localStorage user', err)
        }
    }, [])

    // 🔹 Check if blog is bookmarked
    useEffect(() => {
        if (!username) {
            console.log('⛔ Skipping bookmark check — no username')
            return
        }

        const checkBookmark = async () => {
            console.log('🔍 Checking bookmark:', username, blogId)

            const { data, error } = await supabase
                .from('bookmarks')
                .select('blog_id')
                .eq('username', username)
                .eq('blog_id', blogId)
                .maybeSingle()

            if (error) {
                console.error('❌ Bookmark check error:', error)
                return
            }

            console.log('⭐ Bookmark exists?', !!data)
            setIsBookmarked(!!data)
        }

        checkBookmark()
    }, [username, blogId])

    // 🔹 Toggle bookmark
    const toggleBookmark = async () => {
        console.log('⭐ Bookmark button clicked')

        if (!username) {
            console.log('⚠️ Not logged in')
            setShowToast(true)
            return
        }

        if (isBookmarked) {
            console.log('🗑 Removing bookmark')

            const { error } = await supabase
                .from('bookmarks')
                .delete()
                .eq('username', username)
                .eq('blog_id', blogId)

            if (!error) setIsBookmarked(false)
        } else {
            console.log('➕ Adding bookmark')

            const { error } = await supabase.from('bookmarks').insert({
                username,
                blog_id: blogId,
            })

            if (!error) setIsBookmarked(true)
        }
    }

    return (
        <>
            <button
                onClick={toggleBookmark}
                className={`px-5 py-2.5 border rounded-full text-sm font-medium
    flex items-center gap-2 transition
    ${isBookmarked
                        ? 'border-green-500 text-green-800 hover:bg-green-100'
                        : 'border-gray-500 text-gray-600 hover:bg-gray-100'
                    }
  `}
            >
                <Star
                    size={16}
                    className={isBookmarked ? 'fill-green-400 text-green-400' : ''}
                />
                {isBookmarked ? 'Starred' : 'Star'}
            </button>




            <Toast
                message="Please sign in to bookmark blogs"
                show={showToast}
                onClose={() => setShowToast(false)}
            />
        </>
    )
}
