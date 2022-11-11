const library = [];

const form = document.querySelector("form");
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
