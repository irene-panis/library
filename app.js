let myLibrary = [];

const booklist = document.querySelector("table");
const bookForm = document.querySelector("form");
const addButton = document.getElementById("open-form");
const cancelButton = document.getElementById("cancel");
const submitButton = document.getElementById("submit-book");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

var hungergames = new Book("The Hunger Games", "Suzanne Collins", "200", true);
var catchingfire = new Book("Catching Fire", "Suzanne Collins", "300", true);

addBookToLibrary(hungergames);
addBookToLibrary(catchingfire);

function iterate() {
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

function openForm() {
  bookForm.style.display = "block";
}

function closeForm() {
  bookForm.style.display = "none";
}

function showButton() {
  addButton.style.display = "block";
}
function hideButton() {
  addButton.style.display = "none";
}

addButton.onclick = function() {
  hideButton();
  openForm();
}

cancelButton.onclick = function() {
  showButton();
  closeForm();
}

iterate();