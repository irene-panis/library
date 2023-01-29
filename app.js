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

var readButton = function(read, index) {
  if (read) {
    return `<button type='button' data-index=${index} id='checked' class='toggle'>Read</button>`;
  } else {
    return `<button type='button' data-index=${index} id='unchecked' class='toggle'>Unread</button>`;
  }
}


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

function initialize() {
  var hungergames = new Book("The Hunger Games", "Suzanne Collins", 384, true);
  var catchingfire = new Book("Catching Fire", "Suzanne Collins", 391, true);
  
  myLibrary.push(hungergames);
  myLibrary.push(catchingfire);
}

function iterate() {
  clearBooks();
  let i = 0;
	for (const book of myLibrary) {
  	var row = booklist.insertRow(-1);
    var del = row.insertCell(0);
    var cell1 = row.insertCell(1);
  	var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
  	var cell4 = row.insertCell(4);
    del.innerHTML += `<img class="delete" data-index=${i + 1} src='img/delete-icon.svg' height='22px' width='22px'>`;
    cell1.innerHTML += book.title;
    cell2.innerHTML += book.author;
    cell3.innerHTML += book.pages;
    cell4.innerHTML += readButton(book.read, i);
    i++;
  }
}

function clearBooks() {
  booklist.innerHTML = `<tr>
  <th><img id="invisible" src='img/delete-icon.svg' height='22px' width='22px'></th>
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

// ensures variables are updated with current values
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

function deleteBook(row) {
  booklist.deleteRow(row);
}

// toggle book.read boolean
function toggleRead(book) {
  book.read = !book.read;
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

// adds event listeners to delete buttons
document.addEventListener('click', (e) => {
  if (e.target.classList.contains("delete")) {
    booklist.deleteRow(e.target.dataset.index);
    myLibrary.splice(e.target.dataset.index - 1, 1);
    iterate(); // reassigns index values to rows after deletion
  };
});

// adds event listeners to read/unread toggle switch
document.addEventListener('click', (e) => {
  if (e.target.classList.contains("toggle")) {
    toggleRead(myLibrary[e.target.dataset.index]);
    iterate();
  };
});

initialize(); // add example books right off the bat
iterate(); // display example array