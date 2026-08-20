const searchIcon = document.querySelector("#searchIcon");
const searchOverlay = document.querySelector("#searchOverlay");
const searchInput = document.querySelector("#searchInput");
const closeSearch = document.querySelector("#closeSearch");
const blogs = document.querySelectorAll(".content");


searchIcon.addEventListener("click", function () {
    searchOverlay.classList.add("show");
    searchInput.focus();
});
closeSearch.addEventListener("click", function () {
    searchOverlay.classList.remove("show");
});


searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const searchValue = searchInput.value.toLowerCase().trim();
        blogs.forEach(function (blog) {
            const text = blog.innerText.toLowerCase();
            if (text.includes(searchValue)) {
                blog.style.display = "flex";
            } else {
                blog.style.display = "none";
            }
        });
        searchOverlay.classList.remove("show");
    }
});