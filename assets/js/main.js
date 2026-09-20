// main.js - used on every page

// 1. Highlight the link of the page you are on
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("#navbar-menu a[data-page]").forEach(function (link) {
  if (link.dataset.page === currentPage) {
    link.classList.remove("text-gray-700");
    link.classList.add("text-blue-700", "font-bold");
  }
});

// 2. Put the current year in the footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// 3. Search box on the Home page (filters the item cards)
const searchForm = document.getElementById("search-form");

if (searchForm) {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const keyword = document.getElementById("search-keyword").value.trim().toLowerCase();
    const category = document.getElementById("search-category").value;
    const cards = document.querySelectorAll("#items-list .item-card");
    let shown = 0;

    cards.forEach(function (card) {
      const textMatches = card.textContent.toLowerCase().includes(keyword);
      const categoryMatches = category === "all" || card.dataset.category === category;

      if (textMatches && categoryMatches) {
        card.classList.remove("hidden");
        shown++;
      } else {
        card.classList.add("hidden");
      }
    });

    // show the "no items" message only when nothing matched
    document.getElementById("no-results").classList.toggle("hidden", shown > 0);
  });
}
