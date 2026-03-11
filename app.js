// Book Class
class Book {
  constructor(id, title, author, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

// Library Class
class Library {
  constructor() {
    this.bookCount = 0;
    this.books = [];
    this.tableBody = document.getElementById("tableBody");
  }

  markRead(checkbox, id) {
    this.books.forEach((book) => {
      if (book.id === id) {
        book.read = true;
        checkbox.checked = true;
        checkbox.disabled = true;
      }
    });
  }

  addBook() {
    // Select inputs
    const titleVal = document.getElementById("titleInput").value;
    const authorVal = document.getElementById("authorInput").value;
    const readVal = document.getElementById("readCheckbox").checked;

    if (!titleVal || !authorVal) {
        alert("Please fill in both Title and Author");
        return;
    }

    // Create new book instance (using bookCount as a simple ID)
    const newBook = new Book(this.bookCount, titleVal, authorVal, readVal);
    
    // Add to library array
    this.books.push(newBook);

    // Create UI Elements
    const row = document.createElement("tr");
    row.setAttribute("id", `book-${newBook.id}`); // ID for the bonus removal logic

    const titleCell = document.createElement("td");
    titleCell.textContent = newBook.title;

    const authorCell = document.createElement("td");
    authorCell.textContent = newBook.author;

    const readCell = document.createElement("td");
    const readCheck = document.createElement("input");
    readCheck.type = "checkbox";
    readCheck.checked = newBook.read;
    readCheck.disabled = newBook.read;
    
    // Event listener for markRead
    readCheck.addEventListener("click", () => {
        this.markRead(readCheck, newBook.id);
    });
    readCell.appendChild(readCheck);

    // BONUS: Remove Button
    const removeCell = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
        this.removeBook(newBook.id);
    });
    removeCell.appendChild(removeBtn);

    // Append cells to row, then row to table
    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(readCell);
    row.appendChild(removeCell);
    this.tableBody.appendChild(row);

    // Finalize
    this.bookCount++;
    this.clearInputs();
  }

  // BONUS: Remove Method
  removeBook(id) {
    // Remove from books array
    this.books = this.books.filter((book) => book.id !== id);
    
    // Remove from UI
    const rowToRemove = document.getElementById(`book-${id}`);
    if (rowToRemove) {
        rowToRemove.remove();
    }
  }

  clearInputs() {
    document.getElementById("titleInput").value = "";
    document.getElementById("authorInput").value = "";
    document.getElementById("readCheckbox").checked = false;
  }
}

// Instantiate the Library
const myLibrary = new Library();

// Event Listener for the Add Book button
const addBookBtn = document.getElementById("addBookBtn");
addBookBtn.addEventListener("click", () => {
    myLibrary.addBook();
});