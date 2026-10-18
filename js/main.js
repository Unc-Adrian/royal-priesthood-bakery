/* ==========================================================
   Royal Priesthood Bakery - main.js
   Used by all four pages. Each block checks that the element
   exists first, so the same file works everywhere.
   ========================================================== */

/* ---------- 1. MOBILE MENU (hamburger) ---------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
    // Show or hide the menu when the button is clicked
    navToggle.addEventListener("click", function () {
        // classList.toggle adds "open" if missing and removes it if present.
        // It returns true when the class was added.
        const isOpen = navLinks.classList.toggle("open");

        // Tell screen readers whether the menu is open
        navToggle.setAttribute("aria-expanded", isOpen);

        // Swap the icon: X when open, three lines when closed
        navToggle.textContent = isOpen ? "\u2715" : "\u2630";
    });

    // Close the menu after choosing a link (helpful on phones)
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.textContent = "\u2630";
        });
    });
}

/* ---------- 2. FOOTER YEAR ---------- */
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

/* ---------- 3. CONTACT FORM VALIDATION ---------- */
const form = document.getElementById("contactForm");

if (form) {
    // 3a. Grab the inputs, the error spans and the success box
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    var phoneInput = document.getElementById("phone");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    var phoneError = document.getElementById("phoneError");

    const successBox = document.getElementById("formSuccess");

    // 3b. One checking function per field.
    // Each returns an error message, or "" (empty text) when the value is fine.
    function checkName() {
        const value = nameInput.value.trim();   // trim() removes spaces at both ends
        if (value === "") {
            return "Please enter your name.";
        }
        if (value.length < 2) {
            return "Your name must be at least 2 characters.";
        }
        return "";
    }

    function checkEmail() {
        const value = emailInput.value.trim();
        if (value === "") {
            return "Please enter your email address.";
        }
        // Pattern: some text, an @, some text, a dot, some text. No spaces allowed.
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(value)) {
            return "Please enter a valid email, like name@example.com.";
        }
        return "";
    }

    function checkPhone() {
        var value = phoneInput.value.trim();
        if (value === "") {
            return "Please enter your phone number.";
        }
        if (isNaN(value) || value.length < 9) {
            return "Digits only, no spaces, at least 9 digits.";
        }
        return "";
    }

    function checkMessage() {
        const value = messageInput.value.trim();
        if (value === "") {
            return "Please write a message.";
        }
        if (value.length < 10) {
            return "Your message must be at least 10 characters.";
        }
        if (value.length > 500) {
            return "Please keep your message under 500 characters.";
        }
        return "";
    }

    // 3c. Show or clear an error for one field.
    // Returns true when the field is valid.
    function showError(input, errorSpan, message) {
        errorSpan.textContent = message;                       // write the message (or clear it)
        input.classList.toggle("invalid", message !== "");     // red border on or off
        input.setAttribute("aria-invalid", message !== "");    // for screen readers
        return message === "";
    }

    // 3d. A list that pairs each input with its error span and checker
    const fields = [
        { input: nameInput, errorSpan: nameError, check: checkName },
        { input: emailInput, errorSpan: emailError, check: checkEmail },
        { input: messageInput, errorSpan: messageError, check: checkMessage },
        { input: phoneInput, errorSpan: phoneError, check: checkPhone}
    ];

    // 3e. Live feedback: check when the user leaves a field (blur),
    // and re-check while typing only if the field is already marked invalid.
    fields.forEach(function (field) {
        field.input.addEventListener("blur", function () {
            showError(field.input, field.errorSpan, field.check());
        });

        field.input.addEventListener("input", function () {
            if (field.input.classList.contains("invalid")) {
                showError(field.input, field.errorSpan, field.check());
            }
        });
    });

    // 3f. When the form is submitted
    form.addEventListener("submit", function (event) {
        event.preventDefault();      // stop the page from reloading
        successBox.hidden = true;    // hide any old success message

        let allValid = true;
        let firstInvalid = null;

        // Check every field, so ALL errors appear at once
        fields.forEach(function (field) {
            const ok = showError(field.input, field.errorSpan, field.check());
            if (!ok) {
                allValid = false;
                if (firstInvalid === null) {
                    firstInvalid = field.input;   // remember the first problem
                }
            }
        });

        if (!allValid) {
            firstInvalid.focus();   // move the cursor to the first problem
            return;                 // stop here: do not show success
        }

        // All fields are valid.
        // On a real site you would send the data to a server here.
        // For this assignment we show a success message and clear the form.
var whatsappNumber = "263718208389";
var text = "Hello Royal Priesthood Bakery! My name is " + nameInput.value.trim() + ". My phone number is " + phoneInput.value.trim() + ".\n" + messageInput.value.trim();
var link = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(text);
window.open(link, "_blank");
successBox.textContent = "Thank you, " + nameInput.value.trim() + "! WhatsApp is opening with your message ready to send.";
successBox.hidden = false;
form.reset();
    });
}

/* ---------- Product tabs ---------- */
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });
        panels.forEach(p => {
            p.classList.remove('active');
            p.hidden = true;
        });

        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        const panel = document.getElementById('panel-' + tab.dataset.tab);
        if (panel) {
            panel.classList.add('active');
            panel.hidden = false;
        }
    });
});