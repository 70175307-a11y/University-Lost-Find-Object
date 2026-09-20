// form.js - validation for the Contact, Sign Up and Sign In forms

// ---------- helper functions ----------

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function showError(input, message) {
  clearError(input);
  input.classList.add("input-error");
  const p = document.createElement("p");
  p.className = "error-text";
  p.textContent = message;
  input.closest(".field").appendChild(p);
}

function clearError(input) {
  input.classList.remove("input-error");
  const oldMessage = input.closest(".field").querySelector(".error-text");
  if (oldMessage) {
    oldMessage.remove();
  }
}

// ---------- Contact form (sends to Formspree) ----------

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const fullName = document.getElementById("name");
    const email = document.getElementById("email");
    const reason = document.getElementById("reason");
    const message = document.getElementById("message");
    const successBox = document.getElementById("form-success");
    const errorBox = document.getElementById("form-error");
    let valid = true;

    [fullName, email, reason, message].forEach(clearError);
    successBox.classList.add("hidden");
    errorBox.classList.add("hidden");

    if (fullName.value.trim().length < 3) {
      showError(fullName, "Please enter your full name (at least 3 characters).");
      valid = false;
    }
    if (!isEmail(email.value)) {
      showError(email, "Please enter a valid email address.");
      valid = false;
    }
    if (reason.value === "") {
      showError(reason, "Please choose a reason.");
      valid = false;
    }
    if (message.value.trim().length < 10) {
      showError(message, "Message must be at least 10 characters.");
      valid = false;
    }

    if (!valid) {
      return;
    }

    // all fields are correct, so send the data to Formspree
    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        successBox.classList.remove("hidden");
        contactForm.reset();
      } else {
        errorBox.classList.remove("hidden");
      }
    } catch (error) {
      errorBox.classList.remove("hidden");
    }
  });
}

// ---------- Sign Up form ----------

const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullname");
    const email = document.getElementById("signup-email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const terms = document.getElementById("terms");
    let valid = true;

    [fullName, email, password, confirmPassword, terms].forEach(clearError);

    if (fullName.value.trim().length < 3) {
      showError(fullName, "Please enter your full name (at least 3 characters).");
      valid = false;
    }
    if (!isEmail(email.value)) {
      showError(email, "Please enter a valid email address.");
      valid = false;
    }
    if (password.value.length < 8 || !/\d/.test(password.value)) {
      showError(password, "Password must be at least 8 characters and include a number.");
      valid = false;
    }
    if (confirmPassword.value !== password.value) {
      showError(confirmPassword, "Passwords do not match.");
      valid = false;
    }
    if (!terms.checked) {
      showError(terms, "You must accept the terms to create an account.");
      valid = false;
    }

    if (valid) {
      // no server in this assignment, so go straight to the Sign In page
      window.location.href = "signin.html";
    }
  });
}

// ---------- Sign In form ----------

const signinForm = document.getElementById("signin-form");

if (signinForm) {
  signinForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("signin-email");
    const password = document.getElementById("signin-password");
    let valid = true;

    [email, password].forEach(clearError);

    if (!isEmail(email.value)) {
      showError(email, "Please enter a valid email address.");
      valid = false;
    }
    if (password.value === "") {
      showError(password, "Please enter your password.");
      valid = false;
    }

    if (valid) {
      window.location.href = "../../index.html";
    }
  });
}
