const library = [];

const modal = document.querySelector("#modal");
const form = document.querySelector("form");
const booksGrid = document.querySelector("#books");
const addBtn = document.querySelector("#add-btn");
const closeBtn = document.querySelector("#close-btn");

form.addEventListener("submit", addBookToLibrary);
addBtn.addEventListener("click", e => modal.style.display = "block");
closeBtn.addEventListener("click", closeForm);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
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

  addBookToGrid();
}

function addBookToGrid() {
  const book = library[library.length - 1];

  const bookCard = document.createElement("div");
  bookCard.classList.add("book");
  bookCard.dataset.index = library.length - 1;

  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const read = document.createElement("p");

  title.textContent = `Title: ${book.title}`;
  author.textContent = `Author: ${book.author}`;
  pages.textContent = `Number of pages: ${book.pages}`;
  read.textContent = book.read ? "Read it" : "Haven't read it yet";

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(read);

  booksGrid.appendChild(bookCard);
}

function closeForm() {
  modal.style.display = "none";
  form.reset();
}
