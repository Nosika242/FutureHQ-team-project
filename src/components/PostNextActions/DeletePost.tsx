import React, { useState } from 'react'
import axios from 'axios'


interface Post {
  id: number
  title?: string
  text?: string
  image?: string
}

interface DeletePostProps {
  post: Post
}
const DeletePost: React.FC<DeletePostProps> = ({ post }) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!post?.id) {
      alert('Post ID not found.')
      return
    }

    const confirmDelete = window.confirm('Are you sure you want to delete thi post?')
    if (!confirmDelete) return
    setLoading(true)
    try {
      await axios.delete(`https://titusukpono.pythonanywhere.com/articles/${post.id}`)
      alert('Post deleted successfully!')
      window.location.reload()
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete post.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-500 font-semibold hover:underline disabled:opacity-50 max-md:text-[12px]"
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>

    </div>
  )
}

export default DeletePost
