
/* =====================================
   CONTACT PAGE JAVASCRIPT
===================================== */

(function () {
    const contactForm = document.getElementById("con_contact_form");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("con_name").value.trim();
        const phone = document.getElementById("con_phone").value.trim();
        const email = document.getElementById("con_email").value.trim();
        const land = document.getElementById("con_land").value.trim();
        const interest = document.getElementById("con_interest").value;
        const message = document.getElementById("con_message").value.trim();

        if (!name || !phone || !email || !interest || !message) {
            alert("Please fill in all required fields.");
            return;
        }

        const phoneDigits = phone.replace(/\D/g, "");

        if (phoneDigits.length < 10 || phoneDigits.length > 15) {
            alert("Please enter a valid phone number.");
            return;
        }

        const whatsappMessage =
            "Hello Bhawana Agrotech,%0A%0A" +
            "*New Website Inquiry*%0A%0A" +
            "Name: " + encodeURIComponent(name) + "%0A" +
            "Phone: " + encodeURIComponent(phone) + "%0A" +
            "Email: " + encodeURIComponent(email) + "%0A" +
            "Farm Land Area: " + encodeURIComponent(land || "Not specified") + "%0A" +
            "Project Interest: " + encodeURIComponent(interest) + "%0A" +
            "Message: " + encodeURIComponent(message);

        const whatsappURL =
            "https://wa.me/917007871086?text=" + whatsappMessage;

        window.open(whatsappURL, "_blank", "noopener");

        contactForm.reset();
    });

})();
