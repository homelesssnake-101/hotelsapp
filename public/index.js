const cards = document.querySelectorAll(".index-card");
console.log('index.js loaded');
cards.forEach((card) => {
  card.addEventListener("click", async (e) => {
    console.log("clicked");
    const cardElement = e.target.closest(".card");
    const title = cardElement.querySelector(".card-title").textContent;
    
    
    window.location.href = `/listings/${title}`;
  });
});

const category = document.querySelectorAll(".category");
category.forEach((category) => {
  category.addEventListener("click", async (e) => {
    console.log("clicked");
    let paragraph = category.querySelector("p");
    let categoryName = paragraph.textContent;
    window.location.href = `/listings/category/${categoryName}`;
  });
});

