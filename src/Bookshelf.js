import React from "react";
import "./App.css";
import Book from "./BookTemplate";
import ToggleShelfs from "./ToggleShelfes";
import Empty from "./Empty.js";

// let staticBookData = [
//     {
//         cover: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")',
//         title: "To Kill a Mockingbird",
//         author: "Harper Lee",
//     },
//     {
//         cover: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")',
//         title: "Ender's Game",
//         author: "Orson Scott Card",
//     },
// ];
const Bookshelf = ({ books, title, updateBook }) => {
    let specificBooks=[];
    if (books.length) {
        specificBooks = books.filter((book) => book.shelf === title);
    }
    return (
        <>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    {specificBooks.length === 0 ? (
                        <Empty />
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
