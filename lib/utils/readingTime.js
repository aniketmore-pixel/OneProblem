export function calculateReadingTime(content) {
    if (!content) return null
  
    let text = ''
  
    // Case 1: content is already a string (HTML / markdown)
    if (typeof content === 'string') {
      text = content
    }
  
    // Case 2: content is an object or array (editor JSON)
    else if (typeof content === 'object') {
      text = JSON.stringify(content)
    }
  
    // Remove HTML tags
    text = text.replace(/<[^>]+>/g, '')
  
    // Count words
    const wordCount = text.trim().split(/\s+/).length
  
    if (wordCount === 0) return null
  
    const wordsPerMinute = 200
    const minutes = Math.ceil(wordCount / wordsPerMinute)
  
    return `${minutes} min read`
  }
  