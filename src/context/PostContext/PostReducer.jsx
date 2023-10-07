const PostReducer = (state, action) => {

    // Fetch Posts 
    if(action.type === 'FETCH_SUCCESS') {
        return {
            ...state,
            posts: action.payload,
            initialPosts: action.payload,
            error: null
        }
    }

    // Fetch Single Post
    if(action.type === 'FETCH_POST') {
        return {
            ...state,
            post: action.payload,
            error: null
        }
    }

    // Add Post
    if(action.type === 'ADD_POST') {
        return {
            ...state,
            posts: [...state.posts, action.payload],
            error: null
        }
    }

    // Update Post
    if(action.type === 'UPDATE_POST') {
        const updatedPosts = state.posts.map((post) => 
            post.id === action.payload.id ? action.payload : post
        )
        return {
            ...state,
            posts: updatedPosts,
            error: null
        }
    }

    // Delete Post
    if(action.type === 'DELETE_POST') {
        const filteredPosts = state.posts.filter( 
            (post) => post.id !== action.payload
        )
        return {
            ...state,
            posts: filteredPosts,
            error: null
        }
    }
    // Search Post
    if(action.type === 'SEARCH_POSTS') {
        const query = action.payload.trim().toLowerCase();
        const filteredPosts = state.initialPosts.filter(post =>
            post.tags.some(tag => tag.toLowerCase().includes(query))
        );

        const newPosts = query === '' ? state.initialPosts : filteredPosts

        return {
            ...state,
            // searchQuery: action.payload,
            posts: newPosts
        };
    }

    // Fetch Error 
    if(action.type === 'FETCH_ERROR') {
        return {
            ...state,
            error: action.payload,
        }
    }

    // Loading
    if(action.type === 'SET_LOADING') {
        return {
            ...state,
            loading: action.payload,
        };
    }

    return state
}

export default PostReducer