import { useContext, useState } from "react"
import PostContext from "../context/PostContext/PostContext"

import toast, {Toaster} from 'react-hot-toast'


function CreatePost({onClose, visible}) {

  const {loading, addPost} = useContext(PostContext)

  const handleOnClose = (e) => {
    if(e.target.id === 'container') onClose()
  }

  const userId = JSON.parse(localStorage.getItem('user'))

  const [formData, setFormData] = useState({
    text: '',
    image: '',
    likes: '',
    tags: [],
    owner: userId?.id
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    addPost(formData)

    toast.success('Post created successfully')
    
    onClose()

    setFormData({
      text: '',
      image: '',
      likes: 0,
      tags: [],
      owner: userId.id
    });
  }


  if(!visible) return null



  return (
    <div className="z-10 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      onClick={handleOnClose}
      id='container'
    >
      <Toaster />
    <div className="bg-white rounded-md md:mx-auto w-full mx-3 md:max-w-[550px]">
      {/* Close button  */}
      <button
        onClick={onClose}
        className="flex-shrink-0 flex items-center justify-start h-12 w-12 px-2 rounded-full sm:mx-0 sm:h-10 sm:w-10"
      >
        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <form 
        onSubmit={handleFormSubmit}
        className="py-4 px-9"
      >
        {/* Tags  */}
        <div className="mb-2">
          <label
            htmlFor="title"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Tags
          </label>
          <input
            required
            name='tags'
            value={formData.tags.join(', ')}
            onChange={(e) => 
              setFormData({
                ...formData,
                tags: e.target.value.split(',').map((tag) => tag.trim())
              })
            }
            type="text"
            placeholder="Tags (dog, animal)"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>


        {/* Content -- Text  */}
        <div className="mb-2">
          <label
            htmlFor="content"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Content
          </label>
          <textarea
            type='text'
            value={formData.text}
            name='text'
            onChange={handleInputChange}
            rows="3"
            placeholder="Post Content -- Max 50 character"
            className="w-full rounded py-3 px-[14px] text-gray-800 text-base border border-gray-700 resize-none outline-none focus-visible:shadow-none focus:border-primary"
          ></textarea>
        </div>

        {/* Likes  */}
        <div className="mb-2">
          <label
            htmlFor="location"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Likes
          </label>
          <input
            required
            name='likes'
            onChange={handleInputChange}
            value={formData.likes}
            type="number"
            placeholder="Likes"
            className="apperance-none w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>


        {/* Image  */}
        <div className="mb-4 ">
          <label
            htmlFor="image2"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Image Link
          </label>
          <input 
            type="text" 
            name='image' 
            value={formData.image} 
            onChange={handleInputChange}
            placeholder="https://Image-link"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        {/* Button  */}
        <div>
          <button
            type='submit'
            className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
          >
            {loading ? "Posting...": 'Create Post'}
          </button>
          <br />
        </div>


      </form>

    </div>
</div>
  )
}

export default CreatePost