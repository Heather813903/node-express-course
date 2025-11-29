const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("greet", (name) => {
    console.log(`Hello, ${name}!`);
});

emitter.on("startAssignment", (title) => {
    console.log(`Starting assignment: "${title}"`);

    emitter.emit("completeAssignment", title);
});

emitter.on("completeAssignment", (title) => {
    console.log(`Assignment completed: "${title}"`);
});

emitter.on("timerReminder", (msg) => {
    console.log(msg);
});

emitter.emit("greet", "Heather");

emitter.emit("startAssignment", "EventEmitter Practice");

setInterval(() => {
    emitter.emit("timerReminder", "Remember to take breaks while coding!");
}, 3000);



