let myLibrary = [];
const newBookBtn = document.querySelector("#newBook");
const formNewBook = document.querySelector("#bookInput");
const bookTitleTable = document.querySelector("tbody");
const newInputtedTitle = document.querySelector("#inputTitle");
const newInputtedAuthor = document.querySelector("#inputAuthor");
const newInputtedPages = document.querySelector("#inputPages");
const newInputtedRead = document.querySelector("#inputRead");
const submitInputtedBook = document.querySelector("#submitInput");
const closeModel = document.querySelector(".close");

class BookCl {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

newBookBtn.addEventListener("click", function () {
  formNewBook.style.display = "flex";
  newInputtedTitle.value = "";
  newInputtedAuthor.value = "";
  newInputtedPages.value = "";
  newInputtedRead.checked = false;
});
closeModel.addEventListener("click", function () {
  formNewBook.style.display = "none";
});
window.addEventListener("click", function (e) {
  if (e.target == formNewBook) {
    formNewBook.style.display = "none";
  }
});
submitInputtedBook.addEventListener("click", function (e) {
  e.preventDefault();

  const newBook = new BookCl(
    newInputtedTitle.value,
    newInputtedAuthor.value,
    newInputtedPages.value,
    newInputtedRead.checked
  );
  if (
    newInputtedTitle.value === "" ||
    newInputtedAuthor.value === "" ||
    newInputtedPages.value === ""
  ) {
    document.querySelector(".display-error").style.display = "block";
  } else {
    if (newInputtedRead.checked) {
      newBook.read = "checked";
    } else {
      newBook.read = "unchecked";
    }

    addBookToLibrary(newBook);

    formNewBook.style.display = "none";
  }
});

const theHobbit = new BookCl("The Hobbit", "J R R Tolkien", 310, "checked");
const harryPotter = new BookCl(
  "Harry Potter and the Philosopher's Stone",
  "J K Rowling",
  223,
  true
);

function addBookToLibrary(newBook) {
  bookTitleTable.innerHTML += `<tr><td>${newBook.title}</td><td>${newBook.author}</td><td>${newBook.pages}</td><td><label class="switch">
        <input id="inputRead" type="checkbox" ${newBook.read} />
        <span class="slider round"></span>
      </label></td><td  class="row"><button onclick="removeBook(this)"class="removeBtn">Remove</button></td></tr>`;
  myLibrary.push(newBook);
}

function removeBook(book) {
  const row = book.parentNode.parentNode;

  row.remove();
}

addBookToLibrary(theHobbit);
addBookToLibrary(harryPotter);
