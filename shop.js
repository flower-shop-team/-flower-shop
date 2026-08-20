const products = [
    {
        id: 1,
        name: "Angel's Wing",
        price: 25,
        oldPrice: null,
        rating: 4.8,
        year: 2024,
        category: ["Flower"],
        image: "images/1.jpeg"
    },
    {
        id: 2,
        name: "Areca Palm",
        price: 259,
        oldPrice: 299,
        rating: 4.5,
        year: 2024,
        category: ["Cactus", "Pothos"],
        image: "images/2.jpeg"
    },
    {
        id: 3,
        name: "Arrowroot",
        price: 14,
        oldPrice: null,
        rating: 4.5,
        year: 2024,
        category: ["Flower"],
        image: "images/3.jpeg"
    },
    {
        id: 4,
        name: "Bird of Paradise",
        price: 199,
        oldPrice: null,
        rating: 4.8,
        year: 2024,
        category: ["Cactus"],
        image: "images/4.jpeg"
    },
    {
        id: 5,
        name: "Candelabra Aloe",
        price: 95,
        oldPrice: null,
        rating: 4.5,
        year: 2024,
        category: ["Aloe Vera", "Flower"],
        image: "images/5.jpeg"
    },
    {
        id: 6,
        name: "Fiddle Leaf Fig",
        price: 129,
        oldPrice: 149,
        rating: 4.8,
        year: 2024,
        category: ["Flower"],
        image: "images/6.jpeg"
    },
    {
        id: 7,
        name: "Fiddle Leaf Fig",
        price: 19,
        oldPrice: null,
        rating: 4.8,
        year: 2024,
        category: ["Aloe Vera"],
        image: "images/7.jpeg"
    },
    {
        id: 8,
        name: "Golden Pothos",
        price: 59,
        oldPrice: 69,
        rating: 4.8,
        year: 2024,
        category: ["Pothos"],
        image: "images/8.jpeg"
    },
    {
        id: 9,
        name: "Homalomena",
        price: 49,
        oldPrice: 59,
        rating: 4.5,
        year: 2024,
        category: ["Aloe Vera"],
        image: "images/9.jpeg"
    },
    {
        id: 10,
        name: "Japanese Holly",
        price: 79,
        oldPrice: null,
        rating: 4.8,
        year: 2024,
        category: ["Flower"],
        image: "images/10.jpeg"
    },
    {
        id: 11,
        name: "Nerve Plant",
        price: 25,
        oldPrice: null,
        rating: 4.5,
        year: 2024,
        category: ["Aloe Vera"],
        image: "images/11.jpeg"
    },
    {
        id: 12,
        name: "Snake Plant",
        price: 249,
        oldPrice: null,
        rating: 4.8,
        year: 2024,
        category: ["Cactus", "Flower"],
        image: "images/12.jpeg"
    }
];


const productsContainer = document.getElementById("productsContainer");
const productsCount = document.getElementById("productsCount");
const pagination = document.getElementById("pagination");

const sortSelect = document.getElementById("sortSelect");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const filterBtn = document.getElementById("filterBtn");

const categoryButtons = document.querySelectorAll(".category-btn");

const productsPerPage = 6;

let currentPage = 1;

let selectedCategory = "all";

let minSelectedPrice = 0;
let maxSelectedPrice = 300;

let currentProducts = [...products];


function applyFilters() {

    let filteredProducts = products.filter(function(product) {

        const categoryMatch =
            selectedCategory === "all" ||
            product.category.includes(selectedCategory);

        const priceMatch =
            product.price >= minSelectedPrice &&
            product.price <= maxSelectedPrice;

        return categoryMatch && priceMatch;
    });


    if (sortSelect.value === "rating") {

        filteredProducts.sort(function(a, b) {
            return b.rating - a.rating;
        });

    }

    if (sortSelect.value === "high") {

        filteredProducts.sort(function(a, b) {
            return b.price - a.price;
        });

    }

    if (sortSelect.value === "low") {

        filteredProducts.sort(function(a, b) {
            return a.price - b.price;
        });

    }


    currentProducts = filteredProducts;

    currentPage = 1;

    showCurrentPage();
}


function displayProducts(productsArray) {

    productsContainer.innerHTML = "";

    productsCount.textContent = currentProducts.length;


    if (productsArray.length === 0) {

        productsContainer.innerHTML = `
            <p class="no-products">
                No products found.
            </p>
        `;

        pagination.innerHTML = "";

        return;
    }


    productsArray.forEach(function(product) {

        let oldPrice = "";

        if (product.oldPrice !== null) {

            oldPrice = `<del>$${product.oldPrice}</del>`;

        }


        productsContainer.innerHTML += `

            <div class="col-md-6 col-lg-4 product-item">

                <div class="card product-card h-100">

                    <img
                        src="${product.image}"
                        class="card-img-top product-image"
                        alt="${product.name}"
                    >

                    <div class="card-body">

                        <h5 class="card-title">
                            ${product.name}
                        </h5>

                        <p class="product-rating">
                            ★ ${product.rating}
                        </p>

                        <p class="product-price">
                            ${oldPrice}
                            $${product.price}
                        </p>

                        <div class="product-actions">

                            <button
                                class="add-to-cart"
                                onclick="addToCart(${product.id})"
                            >
                                Add to Cart
                            </button>

                            <button
                                class="add-to-wishlist"
                                onclick="addToWishlist(${product.id})"
                            >
                                ♡
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        `;
    });
}


function displayPagination() {

    pagination.innerHTML = "";

    const totalPages = Math.ceil(
        currentProducts.length / productsPerPage
    );


    for (let i = 1; i <= totalPages; i++) {

        const button = document.createElement("button");

        button.textContent = i;


        if (i === currentPage) {

            button.classList.add("active");

        }


        button.addEventListener("click", function() {

            currentPage = i;

            showCurrentPage();

        });


        pagination.appendChild(button);

    }
}


function showCurrentPage() {

    const start =
        (currentPage - 1) * productsPerPage;

    const end =
        start + productsPerPage;


    const productsToShow =
        currentProducts.slice(start, end);


    displayProducts(productsToShow);

    displayPagination();
}


/* SORT */

sortSelect.addEventListener("change", function() {

    applyFilters();

});


/* PRICE FILTER */

filterBtn.addEventListener("click", function() {

    const min = Number(minPrice.value);

    const max = Number(maxPrice.value);


    if (min > max) {

        alert(
            "Minimum price cannot be greater than maximum price."
        );

        return;
    }


    minSelectedPrice = min;

    maxSelectedPrice = max;


    applyFilters();

});


/* CATEGORIES */

categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        selectedCategory =
            button.dataset.category;


        categoryButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        applyFilters();

    });

});


/* CART */

function addToCart(productId) {

    const product = products.find(function(product) {

        return product.id === productId;

    });


    if (!product) {

        return;

    }


    console.log(
        "Product added to cart:",
        product
    );

}


/* WISHLIST */

function addToWishlist(productId) {

    const product = products.find(function(product) {

        return product.id === productId;

    });


    if (!product) {

        return;

    }


    console.log(
        "Product added to wishlist:",
        product
    );

}


/* INITIAL DISPLAY */

showCurrentPage();