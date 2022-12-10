const library = [];

const mainBody = document.querySelector("#main");
const modalForm = document.querySelector("#modal-form");
const form = document.querySelector("form");
const booksGrid = document.querySelector("#books");
const addButton = document.querySelector("#add-btn");
const closeButton = document.querySelector("#close-btn");

form.addEventListener("submit", addBookToLibrary);
addButton.addEventListener("click", openForm);
closeButton.addEventListener("click", closeForm);

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  changeReadStatus() {
    this.read = !this.read;
  }
}

function addBookToLibrary(e) {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = +document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;

  const book = new Book(title, author, pages, read);
  library.push(book);

  closeForm();
  addBookToGrid(book);
}

function addBookToGrid(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book");

  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const read = addReadButton(book);
  const deleteButton = addDeleteButton();

  title.textContent = `Title: ${book.title}`;
  author.textContent = `Author: ${book.author}`;
  pages.textContent = `Number of pages: ${book.pages}`;

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(read);
  bookCard.appendChild(deleteButton);

  booksGrid.appendChild(bookCard);

  updateIndex();
}

function openForm() {
  modalForm.style.display = "block";
  mainBody.style.filter = "blur(2px) grayscale(50%)";
}

function closeForm() {
  modalForm.style.display = "none";
  mainBody.style.filter = null;
  form.reset();
}

function addReadButton(book) {
  const readButton = document.createElement("button");

  readButton.classList.add("read-btn");
  assignReadStatus(book, readButton);

  readButton.addEventListener("click", () => {
    book.changeReadStatus();
    assignReadStatus(book, readButton);
  })

  return readButton;
}

function assignReadStatus(book, readButton) {
  if (book.read) {
    readButton.textContent = "Read";
    readButton.classList.add("complete");
  } else {
    readButton.textContent = "Didn't read yet";
    readButton.classList.remove("complete");
  }
}

function addDeleteButton() {
  const deleteButton = document.createElement("button");

  deleteButton.textContent = "delete";
  deleteButton.classList.add("delete-btn");

  deleteButton.addEventListener("click", () => {
    const bookElement = deleteButton.parentElement;
    const bookIndex = bookElement.dataset.index;

    bookElement.remove();
    library.splice(bookIndex, 1);

    updateIndex();
  });

  return deleteButton;
}

function updateIndex() {
  const bookElements = booksGrid.children;

  for (let i = 0; i < bookElements.length; ++i) {
    bookElements[i].dataset.index = i;
  }
}

const ulysses = new Book("Ulysses", "James Joyce", 732, false);
addBookToGrid(ulysses);
