// 🧠 დავალება: ოპტიმიზაცია useMemo-ით
// შექმენი React კომპონენტი სახელად ExpensiveCalculator, რომელიც:

import { useMemo, useState } from "react"

// აქვს input ველი, სადაც მომხმარებელი შეიტანს რიცხვს.
// რიცხვის ცვლილებისას გამოითვლება ძალიან რთული ფუნქცია (მაგ., რიცხვის უზარმაზარი ფაქტორიალი ან დიდი ციკლი).
// ამ რთული ფუნქციის შედეგი გამოისახება ეკრანზე.
// გვერდით არის სხვა input ველი, რომელიც უბრალოდ ტექსტს იღებს და არ უნდა გამოიწვიოს რთული ფუნქციის თავიდან გამოთვლა.
// გამოიყენე useMemo, რომ რთული გამოთვლა შესრულდეს მხოლოდ მაშინ, როცა რიცხვი იცვლება.




const ExpensiveCalculator = () => {
    const [number, setNumber] = useState(0);

    const factorial = (num) => {
        let x = 1;
        for (let i = 1; i <= num; i++) {
            x *= i;
        }
        console.log("re-render");
        return x;
    };

    const result = useMemo(() => factorial(number), [number]);
    console.log(result);

    return (
        <div>
            <input 
                type="number"  
                onChange={(e) => setNumber(Number(e.target.value))}  
            />
            <input type="text" />
        </div>
    );
};

export default ExpensiveCalculator;
