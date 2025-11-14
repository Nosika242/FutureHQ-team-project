import React, { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

import axios from 'axios'
import Modal from '../Modal'

interface Post {
  id: number
  title: string
  text: string
  image?: string
}

interface EditPostProps {
  post: Post;
}

interface EditPostData {
  title: string;
  text: string;
  image: File | null;
  preview: string | null;
}

const EditPost: React.FC<EditPostProps> = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<EditPostData>({
    title: post?.title || '',
    text: post?.text || '',
    image: null,
    preview: post?.image || null,
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

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = new FormData()
      data.append('title', formData.title)
      data.append('text', formData.text)
      if (formData.image) data.append('image', formData.image)

      await axios.patch(
        `https://titusukpono.pythonanywhere.com/articles/${post.id}`,
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      alert('Post Updated Successfully')
      setIsOpen(false)
      window.location.reload()
    } catch (error: any) {
      alert('Failed to Update')
      console.error('failed to update', error?.response?.data || error)
    } finally {
      setLoading(false)
    }
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
            placeholder='Upload Image'
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border rounded p-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#00A58E] text-white px-4 py-2 rounded hover:bg-[#008f7a] disabled:opacity-50"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </Modal>
    </>
  )
}

export default EditPost
