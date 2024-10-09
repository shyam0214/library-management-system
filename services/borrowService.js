const Borrow = require("../models/borrowModel");

const borrowService = {
  borrowBook: async (data) => {
    return await Borrow.create(data);
  },

  returnBook: async ({userID, bookID}) => {
    let data = await Borrow.findOneAndUpdate(
      { userID: userID, bookID: bookID },
      { returnDate: new Date(), isReturn: true }
    );
    // console.log(data);
    return data;
  },

  findBook: async (userID, bookID) => {
    console.log(userID, bookID)
    let data = await Borrow.findOne({ userID:"670619a66558abf67f3f3bd4",bookID:'67060cf27b9e251a8d46b5cb'});
    console.log(data);
    return data;
  },

  getAllBorrowedBooks: async () => {
    return await Borrow.find({isReturn:false})
      .populate({
        path: "userID",
        select: "name email",
      })
      .populate({
        path: "bookID",
        select: "title ISBN genre publishYear",
        populate: {
          path: "author",
          select: "name email",
        },
      });
  },

};

module.exports = borrowService;
