const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter the Title of Book'],
  },
  author: {
    type: String,
    required: [true, 'Please enter the name of Author'],
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
