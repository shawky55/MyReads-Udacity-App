import React from "react";
import "./App.css";
import ToggleShelfs from "./ToggleShelfes";

const Book = ({book, cover, title, author, shelf, updateBook }) => {
    return (
        <>
            <li>
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${cover})`,
                            }}></div>
                        <ToggleShelfs
                            updateBook={updateBook}
                            shelf={shelf}
                            book={book}></ToggleShelfs>
                    </div>

                    <div className="book-title">{title}</div>
                    <div className="book-authors">{author}</div>
                </div>
            </li>
        </>
    );
};

export default Book;
