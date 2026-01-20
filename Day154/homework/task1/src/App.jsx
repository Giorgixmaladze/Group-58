import { useState } from 'react'
import Form from './components/form'
// პირველი <input> უნდა იყოს რიცხვის (n) შესაყვანი ველი, მეორე - Light/Dark theme - ის switch - ი, დაწერეთ ფუნქცია findPrimesUpTo(n), რომელიც აბრუნებს მარტივი რიცხვების მასივს 2–დან n–მდე, შექმენით React კომპონენტი
//გამოიყენეთ ერთი useMemo ჰუკი prime რიცხვების გამოსათვლელად, დამოკიდებულებების მასივში მიუთითეთ მხოლოდ n, რადგან ფუნქცია გაეშვას მხოლოდ მაშინ როდესაც n შეიცვლება ეკრანზე გამოიტანეთ primes რიცხვების მასივი და  დაარწმუნეთ, რომ light/dark theme შეცვლის დროს არ ხდება findPrimesUpTo – ის ხელახლა re-ender - ი

// function findPrimesUpTo(n) {
//   const primes = [];
//   for (let i = 2; i <= n; i++) {
//     let isPrime = true;
//     for (let j = 2; j <= Math.sqrt(i); j++) {
//       if (i % j === 0) {
//         isPrime = false;
//         break;
//       }
//     }
//     if (isPrime) primes.push(i);
//   }
//   return primes;
// }
function App() {


  return (
      
    
      <Form />
      
    
  )
}

export default App
