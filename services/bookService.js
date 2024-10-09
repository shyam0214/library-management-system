const Book = require("../models/bookModel");
const buildBookFilter = (query) => {
  const { genre, year } = query;
  const filter = {};

  if (genre) {
    filter.genre = genre;
  }

  if (year) {
    filter.publishYear = year;
  }

  return filter;
};
const bookService = {
  createBook: async (data) => {
    return await Book.create(data);
  },

  getBookByISBN: async (ISBN) => {
    return await Book.findOne({ ISBN: ISBN });
  },

  getBooks: async (query, pagination) => {
    const { search, genre, year } = query;
    const filter = buildBookFilter(query);

    const authorFilter = {};
    if (search) {
      authorFilter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    let books = await Book.find(filter)
      .populate({
        path: "author",
        select: "name email",
        match: authorFilter,
      })
      .limit(pagination.limit)
      .skip(pagination.skip);
    const filteredBooks = books.filter((book) => book.author !== null);

    return filteredBooks;

  },

  getBookById: async (id) => {
    
    return await Book.findById(id).populate("author");
  },

  updateBook: async (id, data) => {
    return await Book.findByIdAndUpdate(id, data, { new: true });
  },

  deleteBook: async (id) => {
    return await Book.findByIdAndDelete(id);
  },
};

module.exports = bookService;
