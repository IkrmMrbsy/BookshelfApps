document.addEventListener("DOMContentLoaded", function () {
  const unfinishedBooks = document.getElementById("unfinished-books");
  const finishedBooks = document.getElementById("finished-books");
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const yearInput = document.getElementById("year");
  const isCompleteInput = document.getElementById("isComplete");
  const addBookButton = document.getElementById("add-book");
  let books = [];

  addBookButton.addEventListener("click", function () {
    const title = titleInput.value;
    const author = authorInput.value;
    const year = parseInt(yearInput.value);
    const isComplete = isCompleteInput.checked;

    if (title && author && !isNaN(year)) {
      const book = {
        id: generateUniqueId(),
        title,
        author,
        year,
        isComplete,
      };

      books.push(book);
      saveBooksToLocalStorage();
      renderBooks();

      clearForm();
    }
  });

  loadBooksFromLocalStorage();

  function createBookListItem(book) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>Judul:</strong> ${book.title}<br><strong>Penulis:</strong> ${book.author}<br><strong>Tahun:</strong> ${book.year}`;

    const removeButton = document.createElement("button");
    removeButton.innerText = "Hapus";
    removeButton.addEventListener("click", function () {
      removeBook(book.id);
    });

    li.appendChild(removeButton);

    const toggleReadButton = document.createElement("button");
    const buttonText = book.isComplete ? "Belum Di Baca" : "Sudah Di Baca";
    toggleReadButton.innerText = buttonText;
    toggleReadButton.addEventListener("click", function () {
      toggleReadStatus(book.id);
    });

    li.appendChild(toggleReadButton);

    return li;
  }

  function clearForm() {
    titleInput.value = "";
    authorInput.value = "";
    yearInput.value = "";
    isCompleteInput.checked = false; // Reset isComplete checkbox
  }

  function removeBook(id) {
    books = books.filter((book) => book.id !== id);
    saveBooksToLocalStorage();
    renderBooks();
  }

  function toggleReadStatus(id) {
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex !== -1) {
      books[bookIndex].isComplete = !books[bookIndex].isComplete;
      saveBooksToLocalStorage();
      renderBooks();
    }
  }

  function saveBooksToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(books));
  }

  function loadBooksFromLocalStorage() {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    books = storedBooks;
    renderBooks();
  }

  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  function renderBooks() {
    unfinishedBooks.innerHTML = "";
    finishedBooks.innerHTML = "";
    books.forEach((book) => {
      if (book.isComplete) {
        finishedBooks.appendChild(createBookListItem(book));
      } else {
        unfinishedBooks.appendChild(createBookListItem(book));
      }
    });
  }
});
