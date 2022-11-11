const library = [];

const form = document.querySelector("form");
const booksGrid = document.querySelector("#books");

form.addEventListener("submit", addBookToLibrary);

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

  form.reset();
}

function addBookToGrid() {
  for (const book of library) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");

    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const read = document.createElement("p");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    read.textContent = book.read ? "Read it" : "Haven't read it yet";

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);

    booksGrid.appendChild(bookCard);
  }
}
