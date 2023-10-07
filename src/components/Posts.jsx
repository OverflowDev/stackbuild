import { useState } from "react"

import { Link } from "react-router-dom"
import Moment from "moment"

import EditPost from "./EditPost"
import DeletePost from "./DeletePost"

function Posts({post}) {

    const {
        id,
        likes,
        tags,
        text,
        publishDate,
        image
    } = post

      // Edit 
    const [updatePostModal, setUpdatePostModal] = useState(false)
    const handleUpdateClose = () => setUpdatePostModal(false)
    // Delete 
    const [DeletePostModal, setDeletePostModal] = useState(false)
    const handleDeleteClose = () => setDeletePostModal(false)


  return (
    <div className="h-full rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
        <img className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100" src={image} alt="blog" />
        <div className="p-6">
            <div className="flex items-center justify-between mb-6 mt-2">
                <div className="flex items-center space-x-2">
                {/* Edit Button  */}
                <button 
                    onClick={(e) => {
                        e.stopPropagation()
                        setUpdatePostModal(true)
                    }}
                    className="bg-blue-500 px-2 py-1 rounded-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                </button>
                {/* Delete button  */}
                <button 
                    onClick={(e) => {
                    e.stopPropagation()
                    setDeletePostModal(true)
                    }}
                    className="bg-blue-100 px-2 py-1 rounded-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-red-400 w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
                </div>
            </div>
            <div className="flex items-center space-x-3 ">
                {tags.map((tag, index) => (
                <h1 key={index} className=" text-sm font-sm text-gray-50 mb-3 px-2 py-1 bg-blue-500 rounded-full">
                    {tag}
                </h1>
                ))}
            </div>
            <div>
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-600 text-end">{Moment(publishDate).format('MMMM DD, YYYY, hh:mm:ss A')}</h2>
            </div>
            <p className="leading-relaxed mb-3">{text}</p>
            <div className="flex justify-between  items-center flex-wrap">
                <button className="bg-red-200 hover:scale-105 drop-shadow-md px-4 py-1 rounded-lg flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                </svg>
                {likes}
                </button>
                <Link to={`post/${id}`} className="bg-gradient-to-r from-cyan-400 to-blue-400 hover:scale-105 drop-shadow-md px-4 py-1 rounded-lg">Read more</Link>
            </div>
        </div>

        <EditPost onClose={handleUpdateClose} visible={updatePostModal}  postId={id} post={post}/>
        <DeletePost onClose={handleDeleteClose} visible={DeletePostModal} postId={id} />
    </div>
  )
}

export default Posts