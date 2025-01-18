function createCard(book, img) {
  const div = document.createElement("div");
  div.setAttribute("class", "card");
  div.setAttribute("data-id", `${book.id}`);

  const bookImg = document.createElement("img");
  bookImg.setAttribute("src", `https://picsum.photos/id/${img}/100/100`);

  const author = document.createElement("p");
  const title = document.createElement("p");
  const year = document.createElement("p");

  author.setAttribute("class", "editText");
  title.setAttribute("class", "editText");
  year.setAttribute("class", "editText");

  author.textContent = book.author;
  title.textContent = book.title;
  year.textContent = book.year;

  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  editBtn.textContent = "Edit";
  deleteBtn.textContent = "Delete";

  editBtn.setAttribute("id", `edit-${book.id}`);
  deleteBtn.setAttribute("id", `delete-${book.id}`);

  let editMode = false;

  editBtn &&
    editBtn.addEventListener("click", function () {
      editMode = !editMode;
      [author, title, year].forEach((text) => {
        if (editMode) {
          text.setAttribute("contentEditable", true);
          text.focus();
        } else {
          text.removeAttribute("contentEditable");
        }
      });
    });

  deleteBtn.addEventListener("click", () => {
    div.remove();
  });

  const elements = [bookImg, author, title, year, editBtn, deleteBtn];
  elements.forEach((element) => {
    div.appendChild(element);
  });

  return div;
}

export { createCard };
