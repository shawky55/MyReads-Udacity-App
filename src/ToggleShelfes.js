const ToggleShelfs = ({ shelf, book, updateBook }) => {
    return (
        <div className="book-shelf-changer">
            <select
                defaultValue={shelf}
                onChange={(e) => {
                    console.log("changed")
                    updateBook(book, e.target.value);
                }}>
                <option disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    );
};

export default ToggleShelfs;
