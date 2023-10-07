import { createContext, useReducer, useEffect, useState } from "react";

import PostReducer from './PostReducer'
import axiosPrivate from "../../api/Axios"


const PostContext = createContext()

const APP_ID = import.meta.env.VITE_APP_ID

export const PostProvider = ({children}) => {

    const initialState = {
        initialPosts: [],
        posts: [],
        post: [],
        error: null,
        loading: false,
        searchQuery: ''
    }

    const [state, dispatch] = useReducer(PostReducer, initialState)

    // Fetch all posts usinf useEffect 
    useEffect(() => {

      const fetchPosts = async () => {

        try {
            dispatch({ type: 'SET_LOADING', payload: true });

            const response = await axiosPrivate.get('/post', {
                headers: {
                    'app-id': APP_ID
                }
            })

            dispatch({ type: 'FETCH_SUCCESS', payload: response.data.data})
        } catch (error) {
            dispatch({ type: 'FETCH_ERROR', payload: error.message });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
      }


      fetchPosts()
    },[])

    // Fetch single post 
    const fetchPost = async (postId) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });

            const response = await axiosPrivate.get(`/post/${postId}`, {
                headers: {
                    'app-id': APP_ID
                }
            })

            dispatch({ type: 'FETCH_POST', payload: response.data})

        } catch (error) {
            dispatch({ type: 'FETCH_ERROR', payload: error.message });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }

    // Create Post 
    const addPost = async (postData) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });

            const response = await axiosPrivate.post('/post/create', 
                postData,
                {
                    headers: {
                        'app-id': APP_ID
                    }
                }
            )

            dispatch({ type: 'ADD_POST', payload: response.data})
            dispatch({ type: 'SET_LOADING', payload: false });

        } catch (error) {
            dispatch({ type: 'FETCH_ERROR', payload: error });
        }
    }

    // Update Post 
    const updatePost = async (updatedPostData, postId) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });

            await axiosPrivate.put(`/post/${postId}`, 
            updatedPostData,
                {
                    headers: {
                        'app-id': APP_ID
                    }
                }
            )

            dispatch({ type: 'UPDATE_POST', payload: postId})
            dispatch({ type: 'SET_LOADING', payload: false });
        } catch (error) {
            dispatch({ type: 'FETCH_ERROR', payload: error });
        }
    }

    // Delete Post 
    const deletePost = async (postId) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });

            await axiosPrivate.delete(`/post/${postId}`, 
                {
                    headers: {
                        'app-id': APP_ID
                    }
                }
            )

            dispatch({ type: 'DELETE_POST', payload: postId})
            dispatch({ type: 'SET_LOADING', payload: false });
        } catch (error) {
            dispatch({ type: 'FETCH_ERROR', payload: error });
        }
    }

    // Search posts
    const searchPosts = (query) => {
        dispatch({ type: 'SEARCH_POSTS', payload: query });
    }



    return <PostContext.Provider value={{ 
        ...state,
        fetchPost,
        addPost,
        updatePost,
        deletePost,
        searchPosts
     }}>
        {children}
    </PostContext.Provider>

}

export default PostContext