const bookService = require("../services/bookService");
const { createBookSchema, updateBookSchema } = require("../helper/validations");
const { getPagination } = require("../helper/pagination");
const { sendResponse } = require("../helper/responsesMessage");

exports.createBook = async (req, res) => {
  try {
    let { ISBN, title, publishYear, genre } = req.body;
    let details = req.details;
    if (details.role != "author") {
      return sendResponse(res, true, 400, "Your Account not authorized");
    }
    const validation = createBookSchema.validateAsync(req.body);
    const isbnFind = await bookService.getBookByISBN(ISBN);
    if (isbnFind)
      return sendResponse(
        res,
        true,
        400,
        "ISBN Number Already Exist Try Another "
      );
    req.body.author = details.id;
    const book = await bookService.createBook(req.body);
    return sendResponse(res, true, 201, "Book created successfully", book);
  } catch (error) {
    if (error.isJoi == true) {
      return sendResponse(
        res,
        false,
        400,
        error.details[0]?.message || "Invalid request data"
      );
    }
    return sendResponse(res, false, 500, error.message);
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { page, size } = req.query;
    const pagination = getPagination(page, size);
    console.log(pagination);
    const books = await bookService.getBooks(req.query, pagination);
    return sendResponse(res, true, 200, "Books retrieved successfully", books);
  } catch (error) {
    return sendResponse(res, false, 500, error.message);
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) return sendResponse(res, false, 404, "Book not found");
    return sendResponse(res, true, 200, "Book retrieved successfully", book);
  } catch (error) {
    return sendResponse(res, false, 500, error.message);
  }
};

exports.updateBook = async (req, res) => {
  try {
    let { ISBN, title, publishYear, genre } = req.body;
    let details = req.details;
    
    if (details.role != "author") {
      return sendResponse(res, true, 400, "Your Account not authorized");
    }

    const validate = updateBookSchema.validateAsync({
      ISBN,
      title,
      publishYear,
      genre,
    });
    let obj = {};
    if (ISBN) {
      const isbnFind = await bookService.getBookByISBN(ISBN);
      if (isbnFind)
        return sendResponse(
          res,
          true,
          400,
          "ISBN Number Already Exist Try Another "
        );
    }
    if (title) {
      obj.title = title;
    }
    if (publishYear) {
      obj.publishYear = publishYear;
    }
    if (genre) {
      obj.genre = genre;
    }

    const book = await bookService.updateBook(req.params.id, obj);
    if (!book) return sendResponse(res, false, 404, "Book not found");
    return sendResponse(res, true, 200, "Book updated successfully", book);
  } catch (error) {
    if (error.isJoi == true) {
      return sendResponse(
        res,
        false,
        400,
        error.details[0]?.message || "Invalid request data"
      );
    }
    return sendResponse(res, false, 500, error.message);
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await bookService.deleteBook(req.params.id);
    if (!book) return sendResponse(res, false, 404, "Book not found");
    return sendResponse(res, true, 200, "Book deleted successfully");
  } catch (error) {
    return sendResponse(res, false, 500, error.message);
  }
};
