document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("searchBook");
    const searchTitleInput = document.getElementById("searchBookTitle");
    const unfinishedBooks = document.getElementById("unfinished-books");
    const finishedBooks = document.getElementById("finished-books");
  
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault(); 
  
      const searchTitle = searchTitleInput.value.toLowerCase(); 
  
      const unfinishedBookList = Array.from(unfinishedBooks.children);
      searchBooks(unfinishedBookList, searchTitle);
  
      const finishedBookList = Array.from(finishedBooks.children);
      searchBooks(finishedBookList, searchTitle);
    });
  
    function searchBooks(bookList, searchTitle) {
      bookList.forEach((book) => {
        const bookTitle = book.textContent.toLowerCase();
        if (bookTitle.includes(searchTitle)) {
          book.style.display = "block"; 
        } else {
          book.style.display = "none"; 
        }
      });
    }
  });
  