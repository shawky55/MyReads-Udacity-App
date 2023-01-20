import "./App.css";
import { useEffect, useState } from "react";
import { search } from "./BooksAPI";
import Bookshelf from "./Bookshelf";
import { initailBooks } from "./initailbook";
import Header from "./Header";
import * as BookApi from './BooksAPI.js'
function App() {

    const [showSearchPage, setShowSearchpage] = useState(false);
    const [books, setBooks] = useState([]);
    const updateBook = (book, shelf) => {
        if (shelf === "none") {
            setBooks((prev) => books.filter((cbook) => cbook.id !== book.id));
        }else{
            setBooks((prev) => {
                return books.map((cbook) => {
                    if (cbook.id === book.id) {
                        cbook.shelf = shelf;
                    }
                    return cbook;
                });
            });
            BookApi.update(book,shelf);
        }
    };
        useEffect(() => {
            BookApi.getAll().then((data) => {
                setBooks(data);
            });
        },[]);
console.log(books[0])
    return (
        <div className="app">
            {showSearchPage ? (
                <div className="search-books">
                    <div className="search-books-bar">
                        <a
                            className="close-search"
                            onClick={() => setShowSearchpage(!showSearchPage)}>
                            Close
                        </a>
                        <div className="search-books-input-wrapper">
                            <input
                                type="text"
                                placeholder="Search by title, author, or ISBN"
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid"></ol>
                    </div>
                </div>
            ) : (
                <div className="list-books">
                    <Header header={"My Reads"} />
                    <div className="list-books-content">
                        <div>
                            <Bookshelf
                                updateBook={updateBook}
                                title={"currentlyReading"}
                                initailBooks={books}
                            />
                            <Bookshelf
                                updateBook={updateBook}
                                initailBooks={books}
                                title={"wantToRead"}></Bookshelf>
                            <Bookshelf
                                updateBook={updateBook}
                                initailBooks={books}
                                title={"read"}></Bookshelf>
                        </div>
                    </div>
                    <div className="open-search">
                        <a onClick={() => setShowSearchpage(!showSearchPage)}>
                            Add a book
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
