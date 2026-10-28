const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const cards = [...document.querySelectorAll(".video-card")];
const chips = [...document.querySelectorAll(".chip[data-category]")];
const emptyState = document.querySelector("#emptyState");
const grid = document.querySelector("#videoGrid");
const toast = document.querySelector("#toast");
let activeCategory = "All";
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function filterVideos() {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const categories = (card.dataset.category || "").split(" ");
    const matchesCategory = activeCategory === "All" || categories.includes(activeCategory);
    const matchesSearch = !query || (card.dataset.search + " " + card.innerText).toLowerCase().includes(query);
    const show = matchesCategory && matchesSearch;
    card.hidden = !show;
    if (show) visible++;
  });
  emptyState.hidden = visible !== 0;
  grid.hidden = visible === 0;
}

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  filterVideos();
  if (searchInput.value.trim()) showToast(`Search results for “${searchInput.value.trim()}”`);
});

searchInput.addEventListener("input", filterVideos);

chips.forEach(chip => chip.addEventListener("click", () => {
  activeCategory = chip.dataset.category;
  chips.forEach(item => item.classList.toggle("selected", item === chip));
  filterVideos();
}));

document.querySelector("#menuToggle").addEventListener("click", () => {
  document.body.classList.toggle("sidebar-expanded");
});

document.querySelector("#chipNext").addEventListener("click", () => {
  document.querySelector("#chips").scrollBy({left: 260, behavior: "smooth"});
});

document.querySelectorAll(".more-button").forEach(button => {
  button.addEventListener("click", () => showToast("More video options"));
});
document.querySelectorAll(".watch-btn").forEach(button => {
  button.addEventListener("click", () => showToast("Demo: sponsored video would open here."));
});
document.querySelectorAll(".download-btn").forEach(button => {
  button.addEventListener("click", () => showToast("Demo: download action is not connected."));
});
document.querySelector("#createBtn").addEventListener("click", () => showToast("Create menu — connect your upload flow here."));
document.querySelector(".mic").addEventListener("click", () => showToast("Voice search is not connected in this demo."));
document.querySelectorAll(".side-link").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    document.querySelectorAll(".side-link").forEach(item => item.classList.remove("active"));
    link.classList.add("active");
    const section = link.dataset.section;
    if (section !== "Home") showToast(`${section} page is a placeholder in this demo.`);
    else { activeCategory = "All"; chips.forEach(item => item.classList.toggle("selected", item.dataset.category === "All")); searchInput.value = ""; filterVideos(); }
  });
});
document.querySelector(".avatar").addEventListener("click", () => showToast("Account menu placeholder"));
document.querySelector(".external-arrow").addEventListener("click", () => showToast("Sponsored link placeholder"));

filterVideos();