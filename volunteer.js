document.getElementById("volunteerFormElement").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = this;
  const submitBtn = form.querySelector("button[type='submit']");
  const originalText = submitBtn.textContent;

  // Remove previous alerts
  const existingAlert = form.querySelector(".alert");
  if (existingAlert) existingAlert.remove();

  // Get form data
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();

  // ✅ Gmail validation
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!gmailRegex.test(email)) {
    showAlert(form, "Please enter a valid Gmail address (example@gmail.com).", "danger");
    return;
  }

  // ✅ Phone validation (10-digit, numbers only)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    showAlert(form, "Please enter a valid 10-digit phone number.", "danger");
    return;
  }

  // Disable button & show spinner
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Sending...`;

  const interests = Array.from(document.querySelectorAll('input[name="interest"]:checked'))
    .map(i => i.value)
    .join(", ");
  const availability = Array.from(document.querySelectorAll('input[name="availability"]:checked'))
    .map(i => i.value)
    .join(", ");

  const templateParams = {
    name: form.name.value,
    email: email,
    phone: phone,
    city: form.city.value,
    interest: interests,
    availability: availability,
    why: form.why.value,
    skills: form.skills.value
  };

  try {
    await emailjs.send(
      'service_mvptrmo',
      'template_na6ic44',
      templateParams,
      'jbqRkjAE1b--EVKbH'
    );

    showAlert(form, "✅ Thank you! You’ve successfully signed up as a volunteer. We’ll contact you soon.", "success");
    form.reset();
    submitBtn.innerHTML = `✅ Submitted!`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }, 3000);

  } catch (error) {
    console.error("EmailJS Error:", error);
    showAlert(form, "❌ Oops! Something went wrong. Please try again.", "danger");
    submitBtn.innerHTML = `❌ Try Again`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }, 3000);
  }
});

// ✅ Helper function for showing alert messages
function showAlert(form, message, type) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type} mt-4 fade show`;
  alert.innerHTML = message;
  form.appendChild(alert);
  setTimeout(() => alert.remove(), 3000);
}
