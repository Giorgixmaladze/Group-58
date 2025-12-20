import { Link } from "react-router-dom"

export const Nav = () => {
    return (
        <>
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/posts">Posts</Link>
        </nav>
        </>
    )
}

export default Nav;