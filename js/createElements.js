function createCard(book, img) {
  const div = document.createElement("div");
  div.setAttribute("class", "card");
  div.setAttribute("data-id", `${book.id}`);

  const bookImg = document.createElement("img");
  bookImg.setAttribute("src", `https://picsum.photos/id/${img}/150/200`);

  const author = document.createElement("h2");
  const title = document.createElement("p");
  const year = document.createElement("p");

  author.setAttribute("class", "author");
  title.setAttribute("class", "title");
  year.setAttribute("class", "year");

  author.setAttribute("data-id", `author-${book.id}`);
  title.setAttribute("data-id", `title-${book.id}`);
  year.setAttribute("data-id", `year-${book.id}`);

  author.textContent = book.author;
  title.textContent = book.title;
  year.textContent = book.year;

  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  const btns = document.createElement("div");

  editBtn.textContent = "Edit";
  deleteBtn.textContent = "Delete";

  btns.setAttribute("class", "btns");

  btns.appendChild(editBtn);
  btns.appendChild(deleteBtn);

  editBtn.setAttribute("id", `edit-${book.id}`);
  deleteBtn.setAttribute("id", `delete-${book.id}`);

  let editMode = false;

  editBtn &&
    editBtn.addEventListener("click", function () {
      editBtn.textContent = "Done";
      editMode = !editMode;
      [author, title, year].forEach((text) => {
        if (editMode) {
          text.setAttribute("contentEditable", true);
          text.focus();
        } else {
          text.removeAttribute("contentEditable");
        }
      });
      let editedBook = {
        "title": title.text,
        "author": author.textContent,
        "year": year.value,
      };
      if (editBtn.textContent === "Done") {
        fetch(`https://trello.vimlc.uz/books/${book.id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(editedBook),
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error("Hatolik");
            }
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            console.log("tugadi");
          });
        editBtn.textContent = "Edit";
      }
    });

  deleteBtn.addEventListener("click", () => {
    fetch(`https://trello.vimlc.uz/books/${book.id}`, {
      method: "DELETE"
    })
    .then(response => {
      if(response.status === 200){
        div.remove()
      }else {
        throw new Error('hatolik')
      }
    })
    .catch(error => {
      console.log(error.message)
    })
    .finally(() => {
      console.log("tugadi")
    })
  });

  const elements = [bookImg, author, title, year, btns];
  elements.forEach((element) => {
    div.appendChild(element);
  });

  return div;
}

export { createCard };
