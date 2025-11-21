import React, { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import  axios from 'axios'
import type { AxiosResponse } from 'axios'

interface NewPostProps {
  onClose: () => void
}

interface PostData {
  title: string
  text: string
  image: File | null
}


const addPost = async (postData: PostData): Promise<AxiosResponse> => {
  const formData = new FormData()
  formData.append('title', postData.title)
  formData.append('text', postData.text)
  if (postData.image) formData.append('image', postData.image)

  return axios.post(
    'https://titusukpono.pythonanywhere.com/articles/',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
}

const AddPost: React.FC<NewPostProps> = ({ onClose }) => {
  const [postData, setPostData] = useState<PostData>({
    title: '',
    text: '',
    image: null,
  })

  const queryClient = useQueryClient() 

  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      window.location.reload()
      alert('Post added successfully!')
      onClose()
    },
    onError: () => {
      alert('Failed to add post')
    },
  })

  const handleAddPost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate(postData)
  }

  return (
    <form onSubmit={handleAddPost} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">New Post</h2>

      <label htmlFor="title" className="font-medium">Title</label>
      <input
        id="title"
        type="text"
        value={postData.title}
        onChange={(e) =>
          setPostData((prev) => ({ ...prev, title: e.target.value }))
        }
        placeholder="Enter your post title"
        className="border rounded p-2"
        required
      />


      <label htmlFor="text" className="font-medium">Post Content</label>
      <textarea
        id="text"
        value={postData.text}
        onChange={(e) =>
          setPostData((prev) => ({ ...prev, text: e.target.value }))
        }
        placeholder="Write your post..."
        className="border rounded p-2 h-40"
        required
      />

      {postData.image && (
        <img
          src={URL.createObjectURL(postData.image)}
          alt="Preview"
          className="w-full h-48 object-cover rounded border"
        />
      )}

      <label htmlFor="image" className="font-medium">Upload Image</label>
      <input
        id="image"
        type="file"
        accept="image/*"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPostData((prev) => ({
            ...prev,
            image: e.target.files ? e.target.files[0] : null,
          }))
        }
        className="border p-2"
      />

      <button
        type="submit"
        disabled={mutation.isPending} 
        className="bg-[#00A58E] text-white px-4 py-2 rounded hover:bg-[#008f7a] disabled:opacity-50"
      >
        {mutation.isPending ? 'Submitting...' : 'Submit'}
      </button>

      {mutation.isError && (
        <p className="text-red-500">There was an error submitting your post.</p>
      )}
    </form>
  )
}

export default AddPost
