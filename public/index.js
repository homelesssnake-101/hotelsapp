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

