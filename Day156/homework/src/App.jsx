import { useState } from 'react'
import Counter from './components/Counter'
import Greet from './components/Greet'
import { useCallback } from 'react'

//  შექმენით ერთი კომპონენტი სახელად Counter ამ კომპონენტს props - ად უნდა გადაეცეს ორი მნიშვნელობა, პირველი, ფუნქცია რომელიც count მდგომარეობას ზრდის ერთით, მეორე, მნიშვნელობა რომელიც იცვლება, Counter კომპონენტმა უნდა მიიღოს გადმოცემული მნიშვნელობები და გამოიტანოს ეკრანზე, შექმენით count მდგომარეობა, ღილაკზე დაჭერისას შექმნილი მდგომარეობის მნიშვნელობა უნდა დაპლიუსდეს ერთით, შექმენით მეორე კომპონენტი სახელად Greet ამასაც props - ის დახმარებით უნდა გადასცეთ მნიშვნელობა text, Greet კომპონენტმა უნდა მიიღოს ეს props - ი და გამოიტანოს გადმოცემული მნიშვნელობა ეკრანზე, შექმნილი increment ფუნქციისთვის გამოიყენეთ useCallBack რადგან არ შეიქმნას ხელახლა ფუნქცია და არ მოხდეს Greet კომპონენტის ხელახლა დარენდერება
function App() {
  const [count,setCount] = useState(0)

  const increment = useCallback(() =>{
    setCount(count + 1)
  },[])

  text = "Hello"

  return (
    <>
      <Counter func={increment} count = {count}/>
      <Greet text={text}/>
    </>
  )
}

export default App
