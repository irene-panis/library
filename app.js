let myLibrary = [];

const booklist = document.querySelector("table");
const bookForm = document.querySelector("form");
const addButton = document.getElementById("open-form");
const cancelButton = document.getElementById("cancel");
const submitButton = document.getElementById("submit-book");
const errorMessage = document.getElementById("error-msg");

const titleBox = document.getElementById("title");
const authorBox = document.getElementById("author");
const pagesBox = document.getElementById("pages");

var bookTitle = document.getElementById("title").value;
var bookAuthor = document.getElementById("author").value;
var bookPages = document.getElementById("pages").value;
var bookRead = document.getElementById("read").checked;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  checkValues();
  var book = new Book(bookTitle, bookAuthor, bookPages, bookRead);
  myLibrary.push(book);
}

var hungergames = new Book("The Hunger Games", "Suzanne Collins", "200", true);
var catchingfire = new Book("Catching Fire", "Suzanne Collins", "300", true);

myLibrary.push(hungergames);
myLibrary.push(catchingfire);

function iterate() {
  clearBooks();
	for (const book of myLibrary) {
  	var row = booklist.insertRow(-1);
    var cell1 = row.insertCell(0);
  	var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
  	var cell4 = row.insertCell(3);
    cell1.innerHTML += book.title;
    cell2.innerHTML += book.author;
    cell3.innerHTML += book.pages;
    cell4.innerHTML += book.read;
  }
}

function clearBooks() {
  booklist.innerHTML = `<tr>
  <th>Title</th>
  <th>Author</th>
  <th>Pages</th>
  <th>Read?</th>
</tr>`;
}

function openForm() {
  bookForm.style.display = "block";
  addButton.style.display = "none";
}

function closeForm() {
  bookForm.style.display = "none";
  errorMessage.style.display = "none";
  addButton.style.display = "block";
  titleBox.classList.remove("error");
  authorBox.classList.remove("error");
  pagesBox.classList.remove("error");
  bookForm.reset();
}

function checkValues() {
  bookTitle = document.getElementById("title").value;
  bookAuthor = document.getElementById("author").value;
  bookPages = document.getElementById("pages").value;
  bookRead = document.getElementById("read").checked;
}

function isEmpty() {
  checkValues();
  if ((bookTitle === '')
  || (bookAuthor === '')
  || (bookPages === '')) {
    return true;
  } 
  return false;
}

function showError() {
  checkValues();
  if (bookTitle === '') {
    titleBox.classList.add("error");
  }
  if (bookAuthor === '') {
    authorBox.classList.add("error");
  }
  if (bookPages === '') {
    pagesBox.classList.add("error");
  }
}

function submitBook(event) {
  if (isEmpty()) {
    showError();
    errorMessage.style.display = "block";
  } else {
    addBookToLibrary();
    iterate();
    closeForm();
  }
  event.preventDefault();
}

addButton.addEventListener('click', openForm);
cancelButton.addEventListener('click', closeForm);
submitButton.addEventListener('click', submitBook);

titleBox.addEventListener('input', () => {
  titleBox.classList.remove("error");
});

authorBox.addEventListener('input', () => {
  authorBox.classList.remove("error");
});

pagesBox.addEventListener('input', () => {
  pagesBox.classList.remove("error");
});

iterate();