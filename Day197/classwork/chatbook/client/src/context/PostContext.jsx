import { createContext, useEffect, useContext } from "react"
import { useState } from "react"
import { AuthContext } from "./AuthContext"

export const PostContext = createContext()

const PostProvider = ({ children }) => {
    const [userPosts, setUserPosts] = useState([])
    const [allPost,setAllPosts] = useState([])
    const [updateId,setUpdateId] = useState(null)
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 2,
        totalCount: 0,
        limit: 5,

    })
    const { user } = useContext(AuthContext)


    const getAllPosts = async(page = 1, limit = 5) =>{
        try{
          
            const res = await fetch(`http://localhost:3000/posts?page=${page}&limit=${limit}`,{
                credentials:"include"
            })
            if (!res.ok) {
                throw new Error("Failed to fetch posts")
            }
            const data = await res.json()
            if (data.status === "success") {
                setAllPosts(data.data.posts)
                setPagination(data.data.pagination)
            }


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
            setUserPosts(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {

        console.log(user)
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
            
  
            setUserPosts(prevPosts => [...prevPosts, newPost])
            
            return newPost
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    const deletePost = async (postId) =>{
        try{
            await fetch(`http://localhost:3000/posts/${postId}`,{
                method:"DELETE",
                credentials:"include"
            })
            setUserPosts(userPosts.filter(post =>post._id !== postId))
            
        }catch(err){
            console.error(err)
        }
    }

    const editPost = async (data, postId) =>{
        try{
            const res = await fetch(`http://localhost:3000/posts/${postId}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify(data)
            })

            const post = await res.json()
            
            if(!res.ok){
                throw new error("Something was wrong")
            }

            const index = userPosts.findIndex(item => item._id === postId)
            const copiedArr = [...userPosts]
            copiedArr.splice(index,1,data)
            setUserPosts(copiedArr)
            
        }catch(err){
            console.error(err)
        }
    }

    return (
        <PostContext.Provider value={{allPost, userPosts, pagination, getPostsByUser, createPost, getAllPosts,deletePost,editPost,updateId,setUpdateId }}>
            {children}
        </PostContext.Provider>
    )
}
export default PostProvider