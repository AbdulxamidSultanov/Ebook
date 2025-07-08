import { createCard } from "./createElements.js";
import { valideInput, valideYear } from "./validate.js";

// createCards

const booksContainer = document.querySelector(".books");

fetch("https://trello.vimlc.uz/books")
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Hatolik");
    }
  })
  .then((data) => {
    let counter = 1;
    data.forEach((book) => {
      let card = createCard(book, counter);
      booksContainer.append(card);
      counter++;
    });
  })
  .catch((error) => {
    console.log(error.message);
  })
  .finally(() => {
    console.log("Tugadi");
  });

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    const searchByAuthor = document.querySelector("#byAuthor");
    const searchByYear = document.querySelector("#byYear");
    const searchByTitle = document.querySelector("#byTitle");

    function filterCards() {
      const author = searchByAuthor.value.trim().toLowerCase();
      const year = searchByYear.value.trim().toLowerCase();
      const title = searchByTitle.value.trim().toLowerCase();

      const cards = document.querySelectorAll(".card");

      cards.forEach((card) => {
        const cardAuthor = card.children[1].textContent.toLowerCase();
        const cardYear = card.children[3].textContent.toLowerCase();
        const cardTitle = card.children[2].textContent.toLowerCase();

        const matchesAuthor = author === "" || cardAuthor.includes(author);
        const matchesYear = year === "" || cardYear === year;
        const matchesTitle = title === "" || cardTitle.includes(title);

        if (matchesAuthor && matchesYear && matchesTitle) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    }

    searchByAuthor.addEventListener("input", filterCards);
    searchByYear.addEventListener("input", filterCards);
    searchByTitle.addEventListener("input", filterCards);
  }, 500);
});

const addBook = document.getElementById("addBook");
const addAuthor = document.getElementById("addAuthor");
const addTitle = document.getElementById("addTitle");
const addYear = document.getElementById("addYear");

addBook &&
  addBook.addEventListener("click", function () {
    const book = {
      title: addTitle.value,
      author: addAuthor.value,
      year: addYear.value,
    };

    fetch("https://trello.vimlc.uz/books", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error("Hatolik");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        console.log("tugadi");
      });
  });

// window.location.assign(`${window.location.origin}/pages/homepage.html`);

// validations

const byYear = document.querySelector("#byYear");
const isYear = document.querySelector("#isYear")
const adYear = document.querySelector("#addYear");
const searchYear = document.querySelector("#searchYear")

const byAuthor = document.querySelector('#byAuthor')
const isAuthor = document.querySelector('#isAuthor')
const adAuthor = document.querySelector('#addAuthor')
const searchAuthor = document.querySelector("#searchAuthor")

const byTitle = document.querySelector('#byTitle')
const isTitle =document.querySelector('#isTitle')
const adTitle = document.querySelector('#addTitle')
const searchTitle = document.querySelector("#searchTitle")

byYear.addEventListener("input", function () {
  byYear.value = byYear.value.replace(/[^0-9]/g, "");
});

adYear.addEventListener("input", function () {
  addYear.value = addYear.value.replace(/[^0-9]/g, "");
});

valideInput(byAuthor, isAuthor)
valideInput(adAuthor, searchAuthor)
valideInput(byTitle, isTitle)
valideInput(adTitle, searchTitle)
valideYear(byYear, isYear)
valideYear(adYear, searchYear)