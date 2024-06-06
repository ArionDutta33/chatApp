
const io = require("socket.io")(8000, { cors: { origin: "*" } })
const users = {};

io.on("connection", (socket) => {

    socket.on("new-user-joined", (name) => {
        console.log("new user joined", name)

        users[socket.id] = name;
        socket.broadcast.emit("user-joined", name)
    });
    socket.on("send", message => {
        socket.broadcast.emit("recieve", { message: message, name: users[socket.id] })
    });
    socket.on("disconnect", message => {
        socket.broadcast.emit("left", users[socket.id])
        delete users[socket.id];
    });
})
//new user joined is not predefined ur widh name it whatever you want
//user joined is a event
//event is emmited to all others except the one that joined
//io  overall connections socket.on particular connection
//node server handling socket io connections