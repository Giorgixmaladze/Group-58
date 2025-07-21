import { useState } from "react"

const useTheme = () =>{
    const [dark,setDark] = useState(false)

    const toggleDarkMode = () =>{
        setDark(!dark)
        console.log("fhgdh")
    }

    return[dark,toggleDarkMode]
}
export default useTheme