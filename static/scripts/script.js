const library = [];

const modalForm = document.querySelector("#modal-form");
const form = document.querySelector("form");
const booksGrid = document.querySelector("#books");
const addButton = document.querySelector("#add-btn");
const closeButton = document.querySelector("#close-btn");

form.addEventListener("submit", addBookToLibrary);
addButton.addEventListener("click", e => modalForm.style.display = "block");
closeButton.addEventListener("click", closeForm);

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
  addBookToGrid(book);
}

function addBookToGrid(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book");

  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const read = document.createElement("p");
  const deleteButton = document.createElement("button");

  deleteButton.classList.add("delete-btn");

  title.textContent = `Title: ${book.title}`;
  author.textContent = `Author: ${book.author}`;
  pages.textContent = `Number of pages: ${book.pages}`;
  read.textContent = book.read ? "Read it" : "Haven't read it yet";
  deleteButton.textContent = "Delete";

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(read);
  bookCard.appendChild(deleteButton);

  booksGrid.appendChild(bookCard);

  addDeleteButton(deleteButton);
  updateIndex();
}

function closeForm() {
  modalForm.style.display = "none";
  form.reset();
}

function addDeleteButton(deleteButton) {
  deleteButton.addEventListener("click", () => {
    const bookElement = deleteButton.parentElement;
    const bookIndex = bookElement.dataset.index;

    bookElement.remove();
    library.splice(bookIndex, 1);

    updateIndex();
  });
}

function updateIndex() {
  const bookElements = booksGrid.children;

  for (let i = 0; i < bookElements.length; ++i) {
    bookElements[i].dataset.index = i;
  }
}
