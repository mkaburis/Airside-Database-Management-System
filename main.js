// File Name: main.js
// Airside - Tampa International Airport Database Management System
// COP 4710 Database Design (Spring 2020)
// Mihail Kaburis, Jose-Pablo Mantilla, Jody Rutter

const express = require("express");

const PORT = 1234;
const app = express();

app.get("/hello", (req, res) => {
    res.send("Hello world");
  });

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
