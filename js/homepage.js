import { createCard } from "./createElements.js";

// createCards

const booksContainer = document.querySelector(".books");

fetch("https://trello.vimlc.uz/books").then((response) => {
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error("Hatolik");
  }
}).then(data => {
    console.log(data)
}).catch(error => {
    console.log(error.message)
}).finally(() => {
    console.log('Tugadi')
})
