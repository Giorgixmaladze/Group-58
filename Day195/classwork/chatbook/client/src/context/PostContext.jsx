import { createContext, useEffect, useContext } from "react"
import { useState } from "react"
import { AuthContext } from "./AuthContext"

export const PostContext = createContext()

const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext)


    const getAllPosts = async() =>{
        try{
            setPosts([])
            const res = await fetch(`http://localhost:3000/posts`,{
                credentials:"include"
            })
            if (!res.ok) {
                throw new Error("Failed to fetch posts")
            }
            const data = await res.json()
            setPosts(data)
            console.log(data)


        }catch(err){
            console.error(err)
        }
    }

    const getPostsByUser = async (userId) => {
        if (!userId) return
        
        try {
            const res = await fetch(`http://localhost:3000/posts/${userId}`, {
                credentials: "include"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch posts")
            }

            const data = await res.json()
            setPosts(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (user?._id) {
            getPostsByUser(user._id)
        }
    }, [user?._id])


    const createPost = async (formObj) => {
        try {
            const res = await fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(formObj)
            })

            if (!res.ok) {
                throw new Error("Failed to create post")
            }

            const newPost = await res.json()
            
  
            setPosts(prevPosts => [...prevPosts, newPost])
            
            return newPost
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    return (
        <PostContext.Provider value={{ posts, getPostsByUser, createPost,getAllPosts }}>
            {children}
        </PostContext.Provider>
    )
}
export default PostProvider