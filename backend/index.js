const express = require("express");
require("dotenv").config();
const path = require("path");

const connectDb = require("./config/db");

const { notFound, errorHandler } = require("./middlewares/errorHandlers");

// Routers
const userRoutes = require("./routes/userRoutes");
const chatsRoutes = require("./routes/chatsRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

const port = process.env.PORT;

// Middlewares
connectDb(); // connecting to database
app.use(express.json()); // accept the data in json format

// Routes
app.use("/api/user", userRoutes);
app.use("/api/chats", chatsRoutes);
app.use("/api/message", messageRoutes);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

// Error handlers
app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () =>
  console.log(`Server is running on the port ${port}`)
);

// connecting with the socket
const io = require("socket.io")(server, {
  pingTimeOut: 60000, // the connection exist till 1 min
  cors: {
    origin: "http://localhost:3000", //Connecting with the frontend with
  },
});

//  connection receiving from the frontend
io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined the room:", room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not found");

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
