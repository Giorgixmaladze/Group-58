import { useState } from 'react'

// 1) გამოიყენეთ useMemo კაუჭი, იმისათვის რომ მოახდინოთ 




// ამ ფუნქციის მიერ დაბრუნებული მნიშვნელობის ქეშირეება, რადგან ძვირიანი გამოთვლა თავიდან არ გაეშვას


// ახსენით კომენტარებით რა არის expensive calculation, რას აკეთებს useMemo, რა არის ქეშირება 





// Expensive calculation -> ოპერაცია ან ქმედება რომელიც დიდ დროს ანდომებს და აქვეითებს ჩვენი პროგრამის სიჩქარეს

// useMemo კაუჭის საშუალებით ვინახავთ წინა მნიშვნელობას სანამ დამოკიდებულებების მასივში ჩვენს მიერ გადაცემული მონაცემი არ შეიცვლება,ეს ხელს უწყობს ჩვენი საიტის ოპტიმიზაციას

// ქეშირება -> მონაცემის წინა მნიშვნელობის შენახვა იქამდე სანამ არ შეიცვლება ამავე მონაცემის მნიშვნელობა

function App() {


  const [n, setN] = useState(0)
  const [text, setText] = useState("")

  function findPrimesUpTo(n) {
    const primes = [];
    for (let i = 2; i <= n; i++) {
      let isPrime = true;
      for (let j = 2; j <= Math.sqrt(i); j++) {
        if (i % j === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) primes.push(i);
      console.log("re-calculations", primes);
      return primes;

    }

    useMemo(() =>findPrimesUpTo(n),[n])


    return (
      <>
        <input type="number" name="num" placeholder='enter the number...' onChange={(e) => setN(e.target.value)} />
        <input type="text" onChange={(e) => setText(e.target.value)} />
      </>
    )
  }
}
export default App
