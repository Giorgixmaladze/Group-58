import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const login = async (formObj) => {
        try {
            const res = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include", // allow server cookie (lt) to be set
                body: JSON.stringify(formObj)
            })

            const data = await res.json()
            console.log(data.status === "success" ? "Logged in" : data.message || "Login failed")
            setUser(data.data.user)
            console.log(data.data.user)
            navigate("/profile")
        } catch (err) {
            console.error(err)
        }
    }


    const signUp = async (formObj) => {
        try {
            const res = await fetch("http://localhost:3000/users/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include", // receive auth cookie after signup
                body: JSON.stringify(formObj)
            })
            const data = await res.json()
            console.log(data.data.user)
        } catch (err) {
            console.log(err)
        }

    }


    return (
        <AuthContext.Provider value={{ login, signUp, user }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider