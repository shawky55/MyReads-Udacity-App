import { search, update } from "./BooksAPI";
import { useState, useEffect } from "react";
import Book from "./BookTemplate";

const Search = ({ toggleSearchPage, updateBook, identifyBooks }) => {
    const [query, setQuery] = useState("");
    const [searchResult, setSerchResult] = useState([]);
    // const [localShelf, setLocalShelf] = useState([]);

    const updateSearchResult = (res) => {
        let identiyBooks=identifyBooks();
        if (searchResult) {
            let filterdResult = res?.map((book) => {
                if (identiyBooks.has(book.id)) {
                    return identiyBooks.get(book.id);
                } else {
                    return book;
                }
            });
            setSerchResult(filterdResult);
        }
    };
    useEffect(async () => {
        let response = await search(query);
        if (!response) {
            setSerchResult([]);
        }
        if (query) {
            updateSearchResult(response);
        }

        // return () => {
        //     setSerchResult((prev) => []);
        // };
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
                    <a
                        className="close-search"
                        onClick={() => toggleSearchPage()}>
                        Close
                    </a>
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
