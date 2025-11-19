import React, { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Modal from '../Modal'
import type { Post } from '../../types'

interface EditPostProps {
  post: Post
}

interface EditPostData {
  title: string
  text: string
  image: File | null
  preview: string | null
}

const EditPost: React.FC<EditPostProps> = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<EditPostData>({
    title: post?.title || '',
    text: post?.text || '',
    image: null,
    preview: post?.image || null,
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: EditPostData) => {
      const formDataObj = new FormData()
      formDataObj.append('title', data.title)
      formDataObj.append('text', data.text)
      if (data.image) formDataObj.append('image', data.image)

      return axios.patch(
        `https://titusukpono.pythonanywhere.com/articles/${post.id}`,
        formDataObj,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
    },
    onSuccess: (response) => {
      queryClient.setQueryData(['posts'], (oldPosts: Post[] | undefined) => {
        if (!oldPosts) return []
        return oldPosts.map((p) => (p.id === post.id ? response.data : p))
      })
      window.location.reload()
      alert('Post updated successfully!')
      setIsOpen(false)
    },
    onError: () => {
      alert('Failed to update post')
    },
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData(prev => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }))
    }
  }

  const handleEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-[#00A58E] font-semibold hover:underline cursor-pointer max-md:text-[13px]"
      >
        Edit
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleEdit} className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Edit Post</h2>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="border rounded p-2"
            required
          />

          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Write something..."
            className="border rounded p-2 h-40"
            required
          />

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Image</label>

            {formData.preview && (
              <img
                src={formData.preview}
                className="w-full h-48 object-cover rounded-md border"
                alt="Preview"
              />
            )}

            <input
              aria-label="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border rounded p-2"
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-[#00A58E] text-white px-4 py-2 rounded hover:bg-[#008f7a] disabled:opacity-50"
          >
            {mutation.isPending ? 'Updating...' : 'Save Changes'}
          </button>
        </form>
      </Modal>
    </>
  )
}

export default EditPost
