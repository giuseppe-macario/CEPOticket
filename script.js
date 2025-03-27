if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        if (registration.waiting) {
          if (confirm("È disponibile una nuova versione dell'app. Vuoi aggiornare?")) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
        }

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              if (confirm("È disponibile una nuova versione dell'app. Vuoi aggiornare?")) {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
              }
            }
          });
        });
      });

    let refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  });
}

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
