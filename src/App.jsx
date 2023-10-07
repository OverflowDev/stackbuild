import { useContext, useState } from "react"

import PostContext from "./context/PostContext/PostContext"

import Moment from "moment"
import { Toaster } from "react-hot-toast"

import CreatePost from "./components/CreatePost"
import Posts from "./components/Posts"

import Pagination from "./components/Pagination"

function App() {

  const {posts, loading, searchPosts} = useContext(PostContext)

  // Date 
  Moment.locale('en')

  const [createPostModal, setCreatePostModal] = useState(false)
  const handleModalClose = () => setCreatePostModal(false)

  // Pagination 
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(9)

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage

  const currentPosts = posts.slice(firstPostIndex, lastPostIndex)

  // Search 
  const [query, setQuery] = useState('');

  const handleSearchChange  = (e) => {
    e.preventDefault();
    const newQuery = e.target.value;
    setQuery(newQuery);
    searchPosts(newQuery);
  };

  // const handleInputChange = (e) => {
  //   const newQuery = e.target.value;
  //   setQuery(newQuery);
  // };


  return (
    <div className="md:px-24 px-8 mt-4">
      <Toaster />
      <div className="flex flex-wrap justify-between gap-6">
        <div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search by tags"
              className="rounded-l-md py-2 px-3 border-t border-b border-l text-gray-800 border-gray-300 bg-white rounded-md focus:outline-none"
              value={query}
              onChange={handleSearchChange}
            />
            <button
              type="submit"
              className="px-4 py-2 border border-gray-300 bg-white rounded-r-md text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              Search
            </button>
          </div>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation()
            setCreatePostModal(true)
          }}
          className="px-3 py-2 bg-blue-500 rounded-md text-white"
        >
          Create Post
        </button>
      </div>
      <div className="mt-12">
        {currentPosts.length !==0  ? (
          <div className=' mt-8 grid md:grid-cols-3 grid-cols-1 '>
            {currentPosts.map((post) => (
              <div key={post.id} className="p-4 md:w-11/12 h-full">
                  <Posts post={post}/>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-2xl font-semibold tracking-widest text-center">
            NO POST FOUND
          </h1>
        )}
      </div>

      {/* Pagination  */}
      <div className='static'>
        <Pagination 
            totalPosts={posts.length} 
            postsPerPage={postsPerPage} 
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            loading={loading}
            lastPostIndex={lastPostIndex}
        />
      </div>

      <CreatePost onClose={handleModalClose} visible={createPostModal} />


    </div>
  )
}

export default App
