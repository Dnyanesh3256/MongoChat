const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const Chat = require("./models/chat.js");

const app = express();

const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});