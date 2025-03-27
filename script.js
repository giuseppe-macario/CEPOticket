window.addEventListener('appinstalled', () => {
  setTimeout(() => {
    const email = prompt("Scrivi il tuo indirizzo email (sarà usato come mittente):");
    if (email && email.includes("@")) {
      localStorage.setItem("userEmail", email);
    }
  }, 500);
});

window.addEventListener("DOMContentLoaded", () => {
  const savedEmail = localStorage.getItem("userEmail");
  const emailInput = document.querySelector('input[name="email"]');
  if (savedEmail && emailInput) {
    emailInput.value = savedEmail;
  }

  document.querySelector("form").addEventListener("submit", function (e) {
    const email = emailInput.value.trim();
    const pattern = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)*difesa\.it$/;
    if (!pattern.test(email)) {
      e.preventDefault();
      alert("Inserisci un indirizzo email dell'organizzazione");
      emailInput.focus();
    }
  });
});
