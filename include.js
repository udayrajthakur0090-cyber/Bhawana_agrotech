
/* Shared header and footer loader for all Bhawana Agrotech pages */

document.addEventListener("DOMContentLoaded", function () {

    const headerPlaceholder = document.getElementById("header");
    const footerPlaceholder = document.getElementById("footer");

    if (headerPlaceholder) {

        fetch("header.html")
            .then(function (response) {
                if (!response.ok) throw new Error("Unable to load header.html");
                return response.text();
            })
            .then(function (html) {

                headerPlaceholder.innerHTML = html;

                /* Mobile Navigation */

                const menuToggle = document.getElementById("menuToggle");
                const navigation = document.getElementById("navigation");

                if (menuToggle && navigation) {

                    menuToggle.addEventListener("click", function () {

                        const isOpen = navigation.classList.toggle("active");

                        menuToggle.setAttribute("aria-expanded", String(isOpen));
                        menuToggle.textContent = isOpen ? "✕" : "☰";

                    });

                    /* Close mobile menu when normal links are clicked */

                    navigation.querySelectorAll("a:not(.nav_products_trigger)").forEach(function (link) {

                        link.addEventListener("click", function () {

                            navigation.classList.remove("active");

                            if (menuToggle) {
                                menuToggle.setAttribute("aria-expanded", "false");
                                menuToggle.textContent = "☰";
                            }

                        });

                    });

                    /* Our Products Mobile Dropdown */

                    const products = navigation.querySelector(".nav_products");
                    const productsTrigger = navigation.querySelector(".nav_products_trigger");

                    if (products && productsTrigger) {

                        productsTrigger.addEventListener("click", function (event) {

                            if (window.innerWidth <= 768) {

                                event.preventDefault();

                                products.classList.toggle("active");

                            }

                        });

                    }

                }

            })
            .catch(function (error) {
                console.error("Header loading error:", error);
            });
    }

    /* Footer Loader */

    if (footerPlaceholder) {

        fetch("footer.html")
            .then(function (response) {
                if (!response.ok) throw new Error("Unable to load footer.html");
                return response.text();
            })
            .then(function (html) {

                footerPlaceholder.innerHTML = html;

                const year = document.getElementById("bh_current_year");

                if (year) {
                    year.textContent = new Date().getFullYear();
                }

            })
            .catch(function (error) {
                console.error("Footer loading error:", error);
            });
    }

});
