

function Pagination({totalPosts, postsPerPage, setCurrentPage, currentPage, loading, lastPostIndex}) {

    let pages = []

    for(let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
        pages.push(i)
    }

  return (
    <div>
        {loading ? 
            <h1>Loading...</h1>
            : 
            <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
                <div className="lg:w-3/5 w-full  flex items-center justify-between border-t dark:border-gray-200 border-gray-900">
                    <div className="flex items-center pt-3 dark:text-gray-200  hover:text-green cursor-pointer">
                        <button 
                            className="text-sm mr-3 font-medium leading-none flex items-center justify-center"
                            onClick={() => currentPage > 1 && setCurrentPage(--currentPage)}
                        >
                            <svg className="mr-2" width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Previous
                        </button>
                    </div>
                    <div className="lg:flex hidden">
                        {
                            pages.map((page, index) => {
                                return (
                                    <button 
                                        key={index} 
                                        className=
                                        {
                                            page === currentPage 
                                            ? "text-sm font-medium leading-none cursor-pointer text-blue-600 border-t border-blue-600 pt-3 mr-4 px-2"
                                            : "text-sm font-medium leading-none cursor-pointer hover:text-blue-500 border-t border-transparent hover:border-blue-600 pt-3 mr-4 px-2"
                                        }
                                        onClick={() => setCurrentPage(page)}
                                    >
                                            {page}
                                    </button>
                                )
                            })
                        }
                    </div>
                    <div className="flex items-center pt-3 dark:text-gray-200 text-gray-900 hover:text-green cursor-pointer">
                        {totalPosts < lastPostIndex ? '' 
                            :
                            <button 
                                className="text-sm font-medium leading-none mr-3 flex items-center justify-center"
                                onClick={() => setCurrentPage(++currentPage)}
                            >
                                Next
                                <svg className="ml-2" width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        }
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default Pagination