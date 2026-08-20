const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const blogs = document.querySelectorAll(".blog-details");

blogs.forEach(function(blog) {

    if (blog.classList.contains(id)) {
        blog.style.display = "block";
    } else {
        blog.style.display = "none";
    }

});


const forms = document.querySelectorAll(".needs-validation");
forms.forEach(function (form) {

    form.addEventListener("submit", function (event) {

        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        form.classList.add("was-validated");

    });

});

const loginForm = document.forms["loginForm"];
const successMessage = document.getElementById("successMessage");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    if (!loginForm.checkValidity()) {
        e.stopPropagation();
        loginForm.classList.add("was-validated");
        return;
    }

    // البيانات صحيحة
    successMessage.style.display = "flex";

    // تختفي بعد 2 ثانية
    setTimeout(function () {
        successMessage.style.display = "none";
    }, 2000);

});




