import { useMemo, useState } from "react"
import useTheme from "../hooks/useTheme"
import findPrimesUpTo from "../utils/primes"
const Form = () => {
    const [dark, toggleDarkMode] = useTheme()
    const [n,setN] = useState(0)
    const nums = useMemo(() =>findPrimesUpTo(n),[n])


    return (
        <div className={`w-screen h-screen ${dark? 'bg-black':'bg-white'}`}>
            <input type="number" name="num" placeholder="Enter the num..." onChange={(e) => setN(e.target.value)} className={dark? "bg-white":"border border-black"} />
            <button onClick={toggleDarkMode} className={dark?"text-white":"text-black"}>{dark ? "Light mode" : "Dark mode"}</button>
        </div>

    )
}
export default Form