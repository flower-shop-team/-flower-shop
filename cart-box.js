document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector("#cart-icon");
  const cart = document.querySelector(".cart-box-nav");
  const cartClose = document.querySelector("#cart-close");

  // Navbar cart
  const navCartContent = document.querySelector(".cart-box-nav .cart-content");
  const navTotal = document.querySelector(".cart-box-nav .total-price");

  // Shopping cart page
  const shoppingCartItems = document.querySelector("#shopping-cart-items");
  const cartSubtotal = document.querySelector("#cart-subtotal");
  const cartTotal = document.querySelector("#cart-total");

  // Coupon
  const couponInput = document.querySelector("#coupon-input");
  const applyCouponButton = document.querySelector("#apply-coupon");
  // Checkout
  const orderItemsBody = document.querySelector("#checkout-items");
  const orderSubtotalEl = document.querySelector("#checkout-subtotal");
  const orderTotalEl = document.querySelector("#checkout-total");
  const checkoutForm = document.querySelector("#checkout-form");
  // Modal
  const orderModalOverlay = document.querySelector("#order-modal-overlay");
  const orderModalClose = document.querySelector("#order-modal-close");

  // getting cart from local storage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  // let discount = Number(localStorage.getItem("cartDiscount")) || 0;

  // put items into array / json-formatted string
  function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  // open cart
  if (cartIcon && cart) {
    cartIcon.addEventListener("click", (event) => {
      event.preventDefault();
      cart.classList.add("active");
    });
  }

  // close cart
  if (cartClose && cart) {
    cartClose.addEventListener("click", () => {
      cart.classList.remove("active");
    });
  }

  // add products to cart
  const addCartButtons = document.querySelectorAll(".add-to-cart");

  addCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productCard = button.closest(".product-card");

      if (!productCard) return;

      const image = productCard.querySelector(".product-image");
      const title = productCard.querySelector(".card-title");
      const price = productCard.querySelector(".product-price");

      if (!image || !title || !price) return;

      const productName = title.textContent.trim();
      const productId =
        productCard.closest(".product-item").dataset.id || productName;
      const productImage = image.getAttribute("src");

      // get actual selling price
      const priceNumbers = price.textContent.match(/\d+(\.\d+)?/g);
      const productPrice = priceNumbers
        ? Number(priceNumbers[priceNumbers.length - 1])
        : 0;

      // check if product already exists in the cart
      const existingProduct = cartItems.find((item) => item.id === productId);

      if (existingProduct) {
        // already in cart -> just bump the quantity
        existingProduct.quantity++;
      } else {
        // new product -> add it
        cartItems.push({
          id: productId,
          name: productName,
          image: productImage,
          price: productPrice,
          quantity: 1,
        });
      }

      saveCart();
      renderNavbarCart();
      renderShoppingCart();

      // Open navbar cart
      if (cart) {
        cart.classList.add("active");
      }
    });
  });

  // render navbar cart
  function renderNavbarCart() {
    if (!navCartContent) return;

    navCartContent.innerHTML = "";

    cartItems.forEach((item) => {
      const cartBox = document.createElement("div");
      cartBox.classList.add("cart-box");
      cartBox.innerHTML = `
        <img
          src="${item.image}"
          alt="${item.name}"
          class="cart-img"
        />
        <div class="cart-details">
          <h2 class="cart-product-title">
            ${item.name}
          </h2>
          <span class="cart-price">
            $${item.price}
          </span>
          <div class="cart-quantity">
            <button class="nav-decrement">-</button>
            <span class="number">
              ${item.quantity}
            </span>
            <button class="nav-increment">+</button>
          </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
      `;

      navCartContent.appendChild(cartBox);

      // increment
      cartBox.querySelector(".nav-increment").addEventListener("click", () => {
        item.quantity++;

        saveCart();
        renderNavbarCart();
        renderShoppingCart();
      });

      // decrement
      cartBox.querySelector(".nav-decrement").addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--;

          saveCart();
          renderNavbarCart();
          renderShoppingCart();
        }
      });

      // remove
      cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);

        saveCart();
        renderNavbarCart();
        renderShoppingCart();
      });
    });

    // Navbar total
    const total = calculateSubtotal();

    if (navTotal) {
      navTotal.textContent = `$${total.toFixed(2)}`;
    }
  }

  // render shopping cart page
  function renderShoppingCart() {
    if (!shoppingCartItems) return;
    shoppingCartItems.innerHTML = "";
    cartItems.forEach((item) => {
      const row = document.createElement("tr");
      const subtotal = item.price * item.quantity;
      row.innerHTML = `
        <td class="remove">
          <button class="table-remove">
            <i class="ri-close-line"></i>
          </button>
        </td>
        <td class="photo">
          <img
            src="${item.image}"
            alt="${item.name}"
          >
        </td>
        <td class="name">
          ${item.name}
        </td>
        <td class="price">
          $${item.price.toFixed(2)}
        </td>
        <td class="quantity-cell">
          <div class="quantity">
            <button class="table-decrement">
              -
            </button>
            <span class="number">
              ${item.quantity}
            </span>
            <button class="table-increment">
              +
            </button>
          </div>
        </td>
        <td class="subtotal">
          $${subtotal.toFixed(2)}
        </td>
      `;

      shoppingCartItems.appendChild(row);

      // increase quantity
      row.querySelector(".table-increment").addEventListener("click", () => {
        item.quantity++;

        saveCart();
        renderShoppingCart();
        renderNavbarCart();
      });

      // decrease quantity
      row.querySelector(".table-decrement").addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--;

          saveCart();
          renderShoppingCart();
          renderNavbarCart();
        }
      });

      // Remove product
      row.querySelector(".table-remove").addEventListener("click", () => {
        cartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);

        saveCart();
        renderShoppingCart();
        renderNavbarCart();
      });
    });

    updateCartTotals();
    updateShippingProgress();
  }

  // calculate subtotal
  function calculateSubtotal() {
    let subtotal = 0;

    cartItems.forEach((item) => {
      subtotal += item.price * item.quantity;
    });
    return subtotal;
  }

  // render order summary (checkout page)
  function renderOrderSummary() {
    if (!orderItemsBody) return;
    orderItemsBody.innerHTML = "";

    if (cartItems.length === 0) {
      orderItemsBody.innerHTML = `
        <tr>
          <td colspan="2">Your cart is empty.</td>
        </tr>
      `;
    } else {
      cartItems.forEach((item) => {
        const row = document.createElement("tr");
        const lineTotal = item.price * item.quantity;

        row.innerHTML = `
          <td class="order-item-name">
            ${item.name}
            <span class="item-qty">&times; ${item.quantity}</span>
          </td>
          <td class="order-subtotal">$${lineTotal.toFixed(2)}</td>
        `;

        orderItemsBody.appendChild(row);
      });
    }
    const subtotal = calculateSubtotal();
    if (orderSubtotalEl) {
      orderSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    }
    if (orderTotalEl) {
      orderTotalEl.innerHTML = `<strong>$${subtotal.toFixed(2)}</strong>`;
    }
  }

  // update free shipping progress
  function updateShippingProgress() {
    const shippingProgress = document.querySelector("#shipping-progress");
    const shippingRemaining = document.querySelector("#shipping-remaining");
    const shippingMessage = document.querySelector("#shipping-message");
    const progress = document.querySelector(".progress");

    if (!shippingProgress || !shippingRemaining || !shippingMessage) return;

    const freeShippingTarget = 500;
    const subtotal = calculateSubtotal();

    // calculate percentage
    let percentage = (subtotal / freeShippingTarget) * 100;

    // don't get above 100%
    if (percentage > 100) {
      percentage = 100;
    }

    // calculate remaining amount
    const remaining = freeShippingTarget - subtotal;

    // update progress bar
    shippingProgress.style.width = `${percentage}%`;

    // update accessibility value
    if (progress) {
      progress.setAttribute("aria-valuenow", percentage);
    }

    // update text
    if (remaining > 0) {
      shippingRemaining.textContent = `$${remaining.toFixed(2)} more`;

      shippingMessage.innerHTML = `
      Add <strong id="shipping-remaining">
        $${remaining.toFixed(2)}
      </strong> more to get free shipping
    `;
    } else {
      shippingMessage.innerHTML = `
      <strong>You got free shipping!</strong>
    `;
    }
  }

  // update cart totals
  function updateCartTotals() {
    if (!cartSubtotal || !cartTotal) return;

    const subtotal = calculateSubtotal();

    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTotal.textContent = `$${subtotal.toFixed(2)}`;
  }

  // coupon
  if (applyCouponButton) {
    applyCouponButton.addEventListener("click", () => {
      alert("Coupons are currently unavailable.");
    });
  }

  // place order (checkout page)
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (cartItems.length === 0) {
        alert("Your cart is empty.");
        return;
      }
      if (orderModalOverlay) {
        orderModalOverlay.classList.add("active");
      }
    });
  }
  // close modal - X button
  if (orderModalClose && orderModalOverlay) {
    orderModalClose.addEventListener("click", () => {
      orderModalOverlay.classList.remove("active");
    });
  }
  // close modal - click outside the box
  if (orderModalOverlay) {
    orderModalOverlay.addEventListener("click", (event) => {
      if (event.target === orderModalOverlay) {
        orderModalOverlay.classList.remove("active");
      }
    });
  }

  // initial load
  renderNavbarCart();
  renderShoppingCart();
  renderOrderSummary();
});
