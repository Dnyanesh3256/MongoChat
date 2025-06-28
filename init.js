const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/mongochat")
}

main()
    .then((res) => {
        console.log("Connection successful!!");
    })

    .catch((err) => {
        console,log("Something went wrong!!");
    });

let allChats = [
    {
        from: "neha",
        to: "preeti",
        message: "send me notes for the exam.",
        created_at: new Date()
    },
    {
        from: "rohit",
        to: "mohit",
        message: "teach me JS callbacks.",
        created_at: new Date()
    },
    {
        from: "amit",
        to: "sumit",
        message: "all the best!",
        created_at: new Date()
    },
    {
        from: "tony",
        to: "peter",
        message: "I am Ironman!!",
        created_at: new Date()
    },
    {
        from: "anita",
        to: "ramesh",
        message: "bring me some fruits.",
        created_at: new Date()
    }
];

Chat.insertMany(allChats);