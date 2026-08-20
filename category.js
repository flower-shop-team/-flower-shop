const products = [
    { id: 1, name: "Angel's Wing", price: 25, oldPrice: null, rating: 4.8, year: 2024, category: ["Flower"], image: "images/1.jpeg" },
    { id: 2, name: "Areca Palm", price: 259, oldPrice: 299, rating: 4.5, year: 2024, category: ["Cactus", "Pothos"], image: "images/2.jpeg" },
    { id: 3, name: "Arrowroot", price: 14, oldPrice: null, rating: 4.5, year: 2024, category: ["Flower"], image: "images/3.jpeg" },
    { id: 4, name: "Bird of Paradise", price: 199, oldPrice: null, rating: 4.8, year: 2024, category: ["Cactus"], image: "images/4.jpeg" },
    { id: 5, name: "Candelabra Aloe", price: 95, oldPrice: null, rating: 4.5, year: 2024, category: ["Aloe Vera", "Flower"], image: "images/5.jpeg" },
    { id: 6, name: "Fiddle Leaf Fig", price: 129, oldPrice: 149, rating: 4.8, year: 2024, category: ["Flower"], image: "images/6.jpeg" },
    { id: 7, name: "Fiddle Leaf Fig", price: 19, oldPrice: null, rating: 4.8, year: 2024, category: ["Aloe Vera"], image: "images/7.jpeg" },
    { id: 8, name: "Golden Pothos", price: 59, oldPrice: 69, rating: 4.8, year: 2024, category: ["Pothos"], image: "images/8.jpeg" },
    { id: 9, name: "Homalomena", price: 49, oldPrice: 59, rating: 4.5, year: 2024, category: ["Aloe Vera"], image: "images/9.jpeg" },
    { id: 10, name: "Japanese Holly", price: 79, oldPrice: null, rating: 4.8, year: 2024, category: ["Flower"], image: "images/10.jpeg" },
    { id: 11, name: "Nerve Plant", price: 25, oldPrice: null, rating: 4.5, year: 2024, category: ["Aloe Vera"], image: "images/11.jpeg" },
    { id: 12, name: "Snake Plant", price: 249, oldPrice: null, rating: 4.8, year: 2024, category: ["Cactus", "Flower"], image: "images/12.jpeg" }
];

const categoryCards = document.querySelectorAll(".category-card");

const categoryProductsSection = document.getElementById("categoryProductsSection");

const categoryProductsContainer = document.getElementById("categoryProductsContainer");

const selectedCategoryTitle = document.getElementById("selectedCategoryTitle");

const showAllBtn = document.getElementById("showAllBtn");

categoryCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const selectedCategory = this.dataset.category;

        categoryCards.forEach(function (c) {
            c.classList.remove("active");
        });

        this.classList.add("active");

        const filteredProducts = products.filter(function (product) {
            return product.category.includes(selectedCategory);
        });

        selectedCategoryTitle.textContent = `${selectedCategory} Products (${filteredProducts.length})`;

        categoryProductsSection.classList.remove("d-none");

        displayCategoryProducts(filteredProducts);

    });

});

function displayCategoryProducts(productsArray) {

    categoryProductsContainer.innerHTML = "";

    if (productsArray.length === 0) {

        categoryProductsContainer.innerHTML = `<p class="text-muted">No products found in this category.</p>`;

        return;

    }

    productsArray.forEach(function (product) {

        categoryProductsContainer.innerHTML += `
            <div class="col-md-6 col-lg-4">
                <div class="card product-card h-100">
                    <img src="${product.image}" class="product-image" alt="${product.name}">
                    <div class="card-body d-flex flex-column">
                        <h5>${product.name}</h5>
                        <p class="product-price">$${product.price}</p>
                        <button class="add-to-cart mt-auto">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;

    });

}

showAllBtn.addEventListener("click", function () {

    window.location.href = "shop.html";

});