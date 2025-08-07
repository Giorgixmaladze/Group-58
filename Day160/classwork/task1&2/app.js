// events - არის ჩაშენებული მოდული node ში რომელიც საშუალებას გაძლევს მოახდინო კომუნიკაცია სხვადასხვა ნაწილებს შორის, მოვლენებზე დაყრდნობით


// გვაქვს events ში ორი მხარე -> ერთი მხარე არის emmiter ანუ მოვლენის გამომწვევი მხარე,ხოლო მეორე არის მსმენელი მხარე, ანუ ის რაც მოვლენის მოხდენის შემდეგ ამოქმედდება.



const events = require("events")

const myEvents = new events.EventEmitter()

myEvents.on("click",()=>{
    console.log("Clicked!")
})



myEvents.on("submit",(name,lastname) =>{
    console.log(`New user: ${name} ${lastname}`)
})



myEvents.emit("click")

myEvents.emit("submit","Giorgi","Khmaladze")



// .on(event,listener) -> აკავშირებს კონკრეტულ მოვლენას მის listener ფუნქციასთან

// .emit(event,**data) -> იწვევს მოვლენას და საჭიროების შემთხვევაში გადასცემს მონაცემს listener ფუნქციას
