import React, { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

import axios from 'axios'

interface NewPostProps {
  onClose: () => void;
}

interface PostData {
  title: string;
  text: string;
  image: File | null;
}

const AddPost: React.FC<NewPostProps> = ({ onClose }) => {
  const [postData, setPostData] = useState<PostData>({
    title: '',
    text: '',
    image: null
  })

  const [loading, setLoading] = useState(false)
  const { title, text, image } = postData

  const handleAddPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('text', text)
    if (image) formData.append('image', image)

    try {
      await axios.post('https://titusukpono.pythonanywhere.com/articles/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      alert('Post added successfully!')
      onClose()
      window.location.reload()
    } catch (error) {
      alert('Failed to add post')
      console.error('Failed to add post', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleAddPost} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">New Post</h2>

      <input
        type="text"
        value={title}
        onChange={(e) =>
          setPostData(prev => ({ ...prev, title: e.target.value }))
        }
        placeholder="Title"
        className="border rounded p-2"
        required
      />

      <textarea
        value={text}
        onChange={(e) =>
          setPostData(prev => ({ ...prev, text: e.target.value }))
        }
        placeholder="Write your post..."
        className="border rounded p-2 h-40"
        required
      />

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          className="w-full h-48 object-cover rounded border"
        />
      )}

      <input
        placeholder='Add File'
        type="file"
        accept="image/*"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPostData(prev => ({
            ...prev,
            image: e.target.files ? e.target.files[0] : null
          }))
        }
        className="border p-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-[#00A58E] text-white px-4 py-2 rounded hover:bg-[#008f7a] disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}

export default AddPost
