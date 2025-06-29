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

app.get("/", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
});

app.get("/chats/new", (req, res) => {
    res.render("newChat.ejs");
});

app.post("/", (req, res) => {
    let { from, message, to } = req.body;

    let newChat = new Chat({
        from: from,
        message: message,
        to: to,
        created_at: new Date()
    });

    newChat.save()
        .then((res) => {
            console.log("Chat created successfully!!");
        })

        .catch((err) => {
            console.log("Something went wrong!!");
        });

    res.redirect("/");
});

app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("editChat.ejs", { chat });
});

app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let {message: newMessage} = req.body;

    let updatedChat = await Chat.findByIdAndUpdate(id, { message: newMessage }, { runValidators: true, new: true });

    console.log(updatedChat);

    res.redirect("/");
});

app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/");
});