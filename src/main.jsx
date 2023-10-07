import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import Navbar from './layouts/Navbar.jsx'

import { AuthProvider } from './context/AuthContext'
import Register from './auth/Register.jsx'
import AuthMiddleware from './middleware/AuthMiddleware.jsx'
import { PostProvider } from './context/PostContext/PostContext.jsx'
import PostItem from './components/PostItem.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <PostProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<App />}/>
          <Route path='/register' exact element={
            <AuthMiddleware>
              <Register />
            </AuthMiddleware>
          }/>
          <Route path='/post/:id' element={<PostItem />} />
        </Routes>
      </Router>

    </PostProvider>
    </AuthProvider>
  </React.StrictMode>,
)
