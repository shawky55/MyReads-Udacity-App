import React from "react";
import "./App.css";
import Book from "./BookTemplate";
import Alert from "./Alert.js";
const Bookshelf = ({ books, title, updateBook }) => {
    let specificBooks = [];
    if (books.length) {
        specificBooks = books.filter((book) => book.shelf === title);
    }
    return (
        <>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    {specificBooks.length === 0 ? (
                        <Alert
                            message={"There no Books Avaliable on the Shelf"}
                        />
                    ) : (
                        <ol className="books-grid">
                            {specificBooks.map((book) => {
                                return (
                                    <Book
                                        key={book.id}
                                        id={book.id}
                                        cover={book.imageLinks.thumbnail}
                                        title={book.title}
                                        shelf={book.shelf}
                                        book={book}
                                        updateBook={updateBook}
                                        author={book.authors[0]}
                                    />
                                );
                            })}
                        </ol>
                    )}
                </div>
            </div>
        </>
    );
};

export default Bookshelf;
