const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    faqItems.forEach(i => {
      if (i !== item) i.classList.remove('active');
    });
    item.classList.toggle('active');
  });
});

const form = document.getElementById('askForm');
const nameField = document.getElementById('nameField');
const emailField = document.getElementById('emailField');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (nameField.value.trim() === '' || emailField.value.trim() === '') {
    errorMessage.style.display = 'block';
  } else {
    errorMessage.style.display = 'none';
    alert('Form submitted successfully!');
    form.reset();
  }
});

// Wishlist
document.addEventListener("DOMContentLoaded", () => {
  // قراءة العدد المخزن أو البدء بـ 0
  let wishlistCount = parseInt(localStorage.getItem("wishlistCount")) || 0;
  updateWishlistBadge(wishlistCount);

  // الكود ده هيشتغل لما المستخدم يضغط على زر القلب في صفحة الـ Shop
  const wishlistButtons = document.querySelectorAll(".add-to-wishlist-btn"); // غيري الكلاس ده لو اسم زر القلب في الشوب مختلف عندك

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      wishlistCount++;
      localStorage.setItem("wishlistCount", wishlistCount);
      updateWishlistBadge(wishlistCount);
    });
  });
});

function updateWishlistBadge(count) {
  const badges = document.querySelectorAll(".wishlist-count");
  badges.forEach((badge) => {
    badge.textContent = count;
  });
}

 // Validation
document.getElementById('askForm').addEventListener('submit', function(e) {
    // Prevent the form from submitting by default to validate data first
    e.preventDefault();

    // Get input field elements and values
    const nameInput = document.getElementById('nameField');
    const emailInput = document.getElementById('emailField');
    const questionInput = document.getElementById('questionField');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const question = questionInput.value.trim();
    const errorMessage = document.getElementById('errorMessage');

    // Email format validation using Regular Expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    // Validate Name field specifically
    if (name === "") {
        nameInput.style.border = "2px solid red"; // Highlight Name field with red border
        isValid = false;
    } else {
        nameInput.style.border = ""; // Reset border if valid
    }

    // Validate Email field specifically
    if (email === "" || !emailRegex.test(email)) {
        emailInput.style.border = "2px solid red"; // Highlight Email field with red border
        isValid = false;
    } else {
        emailInput.style.border = ""; // Reset border if valid
    }

    // Validate Question field specifically
    if (question === "") {
        questionInput.style.border = "2px solid red";
        isValid = false;
    } else {
        questionInput.style.border = "";
    }

    // Check if the form is valid or not
    if (!isValid) {
        // Show the general error message if Name, Email, or Question fails
        errorMessage.style.display = "block";
        errorMessage.style.color = "red";
    } else {
        // Hide error message and proceed if all fields are valid
        errorMessage.style.display = "none";
        alert("Thank you! Your question has been sent successfully.");
        
        // Reset the form fields and borders after successful submission
        document.getElementById('askForm').reset();
        nameInput.style.border = "";
        emailInput.style.border = "";
        questionInput.style.border = "";
    }
});