// 2) შექმენით input რომელშიც მომხამრებელმა უნდა შეიტანოს ტექსტი, უნდა გქონდეთ ღილაკი Light/Dark — როდესაც მომხმარებელი დააჭერს ღილაკს უნდა შეიცვალოს უკანა ფონი და უნდა შეიცვალოს ღილაკში არსებული ტექსტი theme - ის მიხედვით, გამოიყენეთ useState text - ისთვის და isDarkMode - ისთვის, გამოიყენეთ ერთი useMemo ჰუკი, რომელიც ითვლის ტექსტის სიგრძეს და აბრუნებს შედეგს, თუ ტექსტი 20-ზე ნაკლები სიმბოლოსგან შედგება გამოიტანეთ Short text, თუ ტექსტი 20–50 სიმბოლოსგან შედგება Medium text, თუ 50 ზე მეტი სიმბოლოსგან შედგება - Long text, ეს უნდა დაიმახსოვროს useMemo - მ მხოლოდ მაშინ, როცა text შეიცვლება
// თემის შეცვლამ არ უნდა გამოიწვიოს ხელახალი დარენდერება, გამოიტანეთ ეკრანზე ტექსტის სიმბოლოების დათვლის შედეგი,
// theme: light/dark

import { useMemo, useState } from "react"
import useTheme from "../hooks/useTheme"


const Form = () => {
    const [dark,toggleDark] = useTheme()
    const [text,setText] = useState("")
    

    const myfunc = (st) =>{
        if(st.length < 20){
            console.log("Short text")
        }else if(st.length < 50){
            console.log("Medium text")
        }else{
            console.log("Long text")
        }
    } 

    useMemo(() =>myfunc(text),[text])

    return (

        <div className={`w-screen h-screen ${dark?"bg-black":"bg-white"}`}>

            <input type="text" name="text" onChange={(e) => setText(e.target.value) } className={dark ?"bg-white": "border border-black"} placeholder="Enter the text..." />
            <button onClick={toggleDark} className={dark?"bg-white":"bg-black text-white"}>{dark?"Light Mode":"Dark Mode"}</button>
        </div>

    )
}


export default Form