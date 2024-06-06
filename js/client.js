const socket = io("http://localhost:8000")
const form = document.getElementById("send-container")
const messaggeInput = document.getElementById("messageInp")
const messagesContainer = document.querySelector(".container")
var audio = new Audio("ting.mp3")
const append = (message, position) => {
    const messageElemement = document.createElement("div")
    messageElemement.innerHTML = message
    messageElemement.classList.add("message")
    messageElemement.classList.add(position)
    messagesContainer.append(messageElemement)
    if (position === "left") {
        audio.play()
    }
}
form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("clicked")
    const message = messaggeInput.value
    append(`You: ${message}`, "right")
    socket.emit("send", message)
    messaggeInput.value = ""
})

const name = prompt("Enter your name to join")
socket.emit("new-user-joined", name)

socket.on("user-joined", (name) => {
    append(`${name} joined the chat`, "right")
})
socket.on("recieve", (data) => {
    append(`${data.name}: ${data.message}`, "left")
})
socket.on("left", name => {
    append(`${name} left the chat`, "left")
})