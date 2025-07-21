import { useState } from "react"
const useTheme = () =>{
    const [dark,setDark] = useState(false)
    
    const toggleDark = () =>{
        setDark(!dark)
    }
    return [dark,toggleDark]

}

export default useTheme