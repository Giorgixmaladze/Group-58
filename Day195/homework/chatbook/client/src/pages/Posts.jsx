import { useContext, useEffect } from "react"
import { PostContext } from "../context/PostContext"
import Nav from "../components/Nav"

const Posts = () => {
    const {posts,getAllPosts} = useContext(PostContext)


    useEffect(() =>{
        getAllPosts()
    },[])
    return(
        <div>
            <Nav/>
            <h1>All Posts:</h1>
            <ul>
                {
                    posts.map((post,i) =>{
                        return (<li key={i}>
                            <h2>{post.title}</h2>
                            <p>{post.author}</p>
                            <p>{post.content}</p>
                            <p>{post.likesCount}</p>
                        </li>)
                    })
                }
            </ul>
        </div>
    )
}

export default Posts