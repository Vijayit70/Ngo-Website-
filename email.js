// Initialize EmailJS
(function () {
  emailjs.init("jbqRkjAE1b--EVKbH"); // 🔑 Replace with your EmailJS Public Key
})();

const contactForm = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");
const loadingText = document.getElementById("loadingText");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Set current time
  document.getElementById("timeField").value = new Date().toLocaleString();

  // UI updates for sending state
  sendBtn.disabled = true;
  sendBtn.textContent = "Sending...";
  loadingText.style.display = "block";

  // Send the form via EmailJS
  emailjs.sendForm("service_pfqx1dp", "template_fspjhbj", this)
    .then(function () {
      alert("✅ Message sent successfully!");
      contactForm.reset();
    })
    .catch(function (error) {
      console.error("Email send failed:", error);
      alert("❌ Failed to send message. Please try again later.");
    })
    .finally(function () {
      // Reset UI back to normal
      sendBtn.disabled = false;
      sendBtn.textContent = "Send Message";
      loadingText.style.display = "none";
    });
});
