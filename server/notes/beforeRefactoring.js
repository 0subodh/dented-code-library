const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Book = require('./models/bookModel');

const PORT = 8000;

// to parse the req.body we need this middleware
app.use(express.json());

// connecting to MongoDB database
mongoose
  .connect(
    `mongodb+srv://subodh1:UlVokdLS6zg8WuND@cluster0.yqn0k.mongodb.net/books-library?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(console.log('Connected to Database'))
  .catch((err) => console.log(err));

// http routes, two parameters: path, callback
app.get('/', (req, res) => {
  res.send('Hello from the express server');
});

// route to save new book
app.post('/books', async (req, res) => {
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
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(400).json(books);
  } catch (err) {
    console.log(err.message);
  }
});

// route to get book by specific id
app.get('/books/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    res.status(400).json(book);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(PORT, function () {
  console.log(`Express server listening on port ${PORT}`);
});
