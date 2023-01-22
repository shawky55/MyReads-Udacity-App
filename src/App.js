import "./App.css";
import { useEffect, useState } from "react";
import { getAll, update } from "./BooksAPI";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Bookshelf from "./Bookshelf";
import Header from "./Header";
import Search from "./Search";
import Alert from "./Alert";
function App() {
    const [books, setBooks] = useState([]);
    const identifyBooks = () => {
        let map = new Map();
        books.forEach((book) => {
            map.set(book.id, book);
        });
        return map;
    };

    useEffect(() => {
        async function getBooks() {
            let data = await getAll();
            setBooks(data);
        }
        getBooks();
    }, []);

    const updateBook = async (book, shelf) => {
        let bookIdentifer = identifyBooks();
        let updatedShelfs = [];
        if (!bookIdentifer.has(book.id)) {
            book.shelf = shelf;
            updatedShelfs = [...books, book];
        } else if (shelf === "none") {
            updatedShelfs = books.filter((current) => current.id !== book.id);
        } else {
            updatedShelfs = books.map((current) => {
                if (current.id === book.id) {
                    current.shelf = shelf;
                }
                return current;
            });
        }
        setBooks(updatedShelfs);
        await update(book, shelf);
    };
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route
                        path="/search"
                        element={
                            <Search
                                updateBook={updateBook}
                                identifyBooks={identifyBooks}
                            />
                        }></Route>
                    <Route
                        path="/"
                        element={
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
                                <Link
                                    className="open-search-btn open-search"
                                    to="/search">
                                    Add a book
                                </Link>
                            </div>
                        }></Route>
                    <Route
                        path="*"
                        element={
                            <Alert message={"Page not Found"}></Alert>
                        }></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
