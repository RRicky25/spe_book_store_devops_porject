const logger = require("../../logger")
const Book = require("./book.model");

const postABook = async (req, res) => {
    try {
        const newBook = await Book({ ...req.body });
        await newBook.save();
        logger.info("Book Posted successfully", { bookId: newBook._id });
        res.status(200).send({ message: "Book posted successfully", book: newBook })
    } catch (error) {
        console.error("Error creating book", error);
        logger.error("Error creating book", { error: error.message });
        res.status(500).send({ message: "Failed to create book" })
    }
}

// get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        logger.info("Fetched all books", { count: books.length });
        res.status(200).send(books);

    } catch (error) {
        console.error("Error fetching books", error);
        logger.error("Error fetching books", { error: error.message });
        res.status(500).send({ message: "Failed to fetch books" });
    }
}

const getSingleBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            logger.warn("Book not found", { bookId: id });
            res.status(404).send({ message: "Book not Found!" });
            return;
        }
        logger.info("Fetched single book", { bookId: id });
        res.status(200).send(book);

    } catch (error) {
        console.error("Error fetching book", error);
        logger.error("Error fetching book", { error: error.message });
        res.status(500).send({ message: "Failed to fetch book" })
    }

}

// update book data
const UpdateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            logger.warn("Book not found for update", { bookId: id });
            res.status(404).send({ message: "Book is not Found!" });
            return;
        }
        logger.info("Book updated successfully", { bookId: id });
        res.status(200).send({
            message: "Book updated successfully",
            book: updatedBook
        });
    } catch (error) {
        console.error("Error updating a book", error);
        logger.error("Error updating a book", { error: error.message });
        res.status(500).send({ message: "Failed to update a book" })
    }
}

const deleteABook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            logger.warn("Book not found for deletion", { bookId: id });
            res.status(404).send({ message: "Book is not Found!" });
            return;
        }
        logger.info("Book deleted successfully", { bookId: id });
        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        });
    } catch (error) {
        console.error("Error deleting a book", error);
        logger.error("Error deleting a book", { error: error.message });
        res.status(500).send({ message: "Failed to delete a book" })
    }
};

module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    UpdateBook,
    deleteABook,
};