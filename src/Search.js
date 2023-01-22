import { search } from "./BooksAPI";
import { useState, useEffect } from "react";
import Book from "./BookTemplate";
import { Link } from "react-router-dom";
const Search = ({ updateBook, identifyBooks }) => {
    const [query, setQuery] = useState("");
    const [searchResult, setSerchResult] = useState([]);
    const updateSearchResult = (res) => {
        let identiyBooks = identifyBooks();
        let filterdResult = res.map((book) => {
            if (identiyBooks.has(book.id)) {
                return identiyBooks.get(book.id);
            } else {
                return book;
            }
        });
        setSerchResult(filterdResult);
    };
    useEffect(() => {
        async function searchHanlder() {
            if (query) {
                let res = await search(query);
                if (res === undefined || res?.error) {
                } else {
                    updateSearchResult(res);
                }
            }
            return () => {
                setSerchResult([]);
            };
        }
        searchHanlder();
    }, [query]);
    const showSearchQuery = () => {
        return searchResult.map((book) => {
            return (
                <Book
                    key={book.id}
                    id={book.id}
                    cover={book.imageLinks?.thumbnail}
                    title={book.title}
                    shelf={book.shelf ? book.shelf : "none"}
                    book={book}
                    updateBook={updateBook}
                    author={book.author && book.authors[0]}
                />
            );
        });
    };
    return (
        <>
            {" "}
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">
                        Close
                    </Link>

                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title, author, or ISBN"
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResult.length ? showSearchQuery() : null}
                    </ol>
                </div>
            </div>
        </>
    );
};

export default Search;
