const events = require("events");

const myEvents = new events.EventEmitter();


myEvents.on("userJoined",(name) =>{
    console.log(`User: ${name} has joined!`)
})


myEvents.emit("userJoined","Giorgi")