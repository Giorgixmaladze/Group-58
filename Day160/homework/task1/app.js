const events = require("events");

const myEvents = new events.EventEmitter();

myEvents.on("greet",(name) =>{
    console.log(`Hello ${name}`)
})

myEvents.emit("greet","Giorgi")