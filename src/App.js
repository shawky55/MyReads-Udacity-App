import "./App.css";
import { useEffect, useState } from "react";
import { search } from "./BooksAPI";
import Bookshelf from "./Bookshelf";
import Header from "./Header";
import * as BookApi from "./BooksAPI.js";
import Search from "./Search";
function App() {
    const [showSearchPage, setShowSearchpage] = useState(false);
    const [books, setBooks] = useState([]);
    const toggleSearchPage = () => {
        setShowSearchpage(!showSearchPage);
    };
    const identifyBooks = () => {
        let map = new Map();
        books.forEach((book) => {
            map.set(book.id, book);
        });
        return map;
    };
    useEffect(async () => {
        let data = await BookApi.getAll();
        setBooks(data);
    }, []);
    const updateBook = async (book, shelf) => {
        let bookIdentifer = identifyBooks();
        if (!bookIdentifer.has(book.id)) {
            //in case add book from library
            setBooks((prev) => [book, ...prev]);
        } else {
            //in case move book in local shlefs
            let updateBooks = books.map((current) => {
                if (current.id === book.id) {
                    current.shelf = shelf;
                }
                return current;
            });
            setBooks((prev) => [...updateBooks]);
        }
    await BookApi.update(book, shelf);
    };
    return (
        <div className="app">
            {showSearchPage ? (
                <Search
                    toggleSearchPage={toggleSearchPage}
                    updateBook={updateBook}
                    identifyBooks={identifyBooks}></Search>
            ) : (
                <div className="list-books">
                    <Header header={"My Reads"} />
                    <div className="list-books-content">
                        <div>
                            <Bookshelf
                                updateBook={updateBook}
                                title={"currentlyReading"}
                                books={books}
                            />
                            <Bookshelf
                                updateBook={updateBook}
                                books={books}
                                title={"wantToRead"}></Bookshelf>
                            <Bookshelf
                                updateBook={updateBook}
                                books={books}
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
