const borrowService = require("../services/borrowService");
const { borrowBookSchema, returnBookSchema } = require("../helper/validations");
const { sendResponse } = require("../helper/responsesMessage");
const bookService = require("../services/bookService");

exports.borrowBook = async (req, res) => {
  try {
    const { bookID } = req.body;
    let details = req.details;
    req.body.userID = details.id;
    const book = await bookService.getBookById(bookID);
    console.log(book)
    if (!book) return sendResponse(res, false, 404, "Book not found");

    const borrow = await borrowService.borrowBook(req.body);
    return sendResponse(res, true, 201, "Book borrowed successfully", borrow);
  } catch (error) {
    return sendResponse(res, false, 500, error.message);
  }
};

exports.returnBook = async (req, res) => {
  try {
  
    let {userID ,bookID} =req.body
   
    const borrow = await borrowService.returnBook({userID ,bookID});
    if (!borrow) return sendResponse(res, false, 404, "Book not found");
    return sendResponse(res, true, 200, "Book returned successfully", borrow);
  } catch (error) {
    return sendResponse(res, false, 500, error.message);
  }
};

exports.getAllBorrowedBooks = async (req, res) => {
  try {
    const borrowedBooks = await borrowService.getAllBorrowedBooks();
    return sendResponse(
      res,
      true,
      200,
      "Borrowed books retrieved successfully",
      borrowedBooks
    );
  } catch (error) {
    return sendResponse(res, false, 500, error.message);
  }
};
