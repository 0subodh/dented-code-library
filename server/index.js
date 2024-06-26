const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

const Book = require("./models/bookModel");

const PORT = process.env.PORT || 3000;

const app = express();

// middleware for handling CORS policy
app.use(cors());

// to parse the req.body we need this middleware
app.use(express.json());

// connecting to MongoDB database
mongoose
  .connect(process.env.MONGODB_STRING)
  .then(console.log("Connected to Database"))
  .catch((err) => console.log(err));

// http routes, two parameters: path, callback
app.get("/", (req, res) => {
  res.send("Hello from the express server");
});

// route to save new book
app.post("/books", async (req, res) => {
  console.log("route to create new book");
  try {
    const newBook = {
      // to parse req.body we used middleware express.json()
      title: req.body.title,
      author: req.body.author,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// route to get all books from database
app.get("/books", async (req, res) => {
  console.log("route to get all books");
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (err) {
    console.log(err.message);
  }
});

// route to get book by specific id
app.get("/books/:id", async (req, res) => {
  console.log("route to get book by specific id");
  try {
    console.log("I am inside get book by id route");
    const id = req.params.id;
    console.log("id", id);
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/", (req, res) => {
  console.log("I am inside home delete route");
  res.send("DELETE Request Called");
});

// route to delete a book by specific id
app.delete("/books/:id", async (req, res) => {
  console.log("route to delete a book by id");
  try {
    const id = req.params.id;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(204).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.listen(PORT, function () {
  console.log(`Express server listening on port ${PORT}`);
});
