import { useState } from 'react'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Signup from './pages/Signup'
import AuthProvider from './context/AuthContext'
import PostProvider from './context/PostContext'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Posts from './pages/Posts'

function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <Routes>
            <Route path='/' element={<Signup/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/posts' element={<Posts />} />
          </Routes>
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  
      
    
  )
}

export default App
