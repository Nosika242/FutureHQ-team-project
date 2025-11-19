import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import type { Post } from '../../types'

interface DeletePostProps {
  post: Post
}

const DeletePost: React.FC<DeletePostProps> = ({ post }) => {
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return axios.delete(`https://titusukpono.pythonanywhere.com/articles/${id}`)
    },
    onSuccess: () => {
      queryClient.setQueryData(['posts'], (oldPosts: Post[] | undefined) =>
        oldPosts ? oldPosts.filter((p) => p.id !== post.id) : []
      )
      window.location.reload()
      alert('Post deleted successfully!')
    },
    onError: () => {
      alert('Failed to delete post.')
    },
  })

  const handleDelete = () => {
    if (!post?.id) {
      alert('Post ID not found.')
      return
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this post?')
    if (!confirmDelete) return

    setLoading(true)
    deleteMutation.mutate(post.id, {
      onSettled: () => setLoading(false),
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading || deleteMutation.isPending}
      className="text-red-500 font-semibold hover:underline disabled:opacity-50 max-md:text-[12px]"
    >
      {loading || deleteMutation.isPending ? 'Deleting...' : 'Delete'}
    </button>
  )
}

export default DeletePost
