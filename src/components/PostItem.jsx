import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Moment from "moment"

import EditPost from "./EditPost"
import DeletePost from "./DeletePost"

import PostContext from "../context/PostContext/PostContext"

function PostItem() {

    const params = useParams()

    const {post, fetchPost} = useContext(PostContext)


    useEffect(() => {
      fetchPost(params.id)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])

    // const {
    //   id,
    //   image,
    //   text,
    //   publishDate,
    //   tags,
    //   likes
    // } = post

      // Edit 
      // const [updatePostModal, setUpdatePostModal] = useState(false)
      // const handleUpdateClose = () => setUpdatePostModal(false)
      // // Delete 
      // const [DeletePostModal, setDeletePostModal] = useState(false)
      // const handleDeleteClose = () => setDeletePostModal(false)
      

  return (
    <div className="md:px-24 px-8 mt-8">
      <div className="h-full rounded-xl shadow-blue-700 bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
        <img className="lg:h-96 md:h-36 w-full object-cover object-center scale-110 transition-all ease-in-out duration-400 hover:scale-100" src={post.image} alt="blog" />
        <div className="p-6">

        <div className="flex items-center space-x-3 mt-4">
          {post.tags?.map((tag, index) => (
          <h1 key={index} className=" text-sm font-sm text-gray-50 mb-3 px-2 py-1 bg-blue-500 rounded-full">
              {tag}
          </h1>
          ))}
        </div>
        <div>
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-600 text-end">{Moment(post.publishDate).format('MMMM DD, YYYY, hh:mm:ss A')}</h2>
        </div>
        <p className="leading-relaxed mb-3">{post.text}</p>
        <div className="flex justify-between  items-center flex-wrap">
            <button className="bg-red-200 hover:scale-105 drop-shadow-md px-4 py-1 rounded-lg flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
            </svg>
            {post.likes}
            </button>
        </div>
        </div>

        {/* <EditPost onClose={handleUpdateClose} visible={updatePostModal}  postId={params.id} post={post}/>
        <DeletePost onClose={handleDeleteClose} visible={DeletePostModal} postId={params.id} /> */}
    </div>
    </div>
  )
}

export default PostItem