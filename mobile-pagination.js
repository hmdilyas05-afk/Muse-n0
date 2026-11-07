document.addEventListener("DOMContentLoaded", () => {
  // S'assure que le script s'exécute uniquement sur les smartphones ou s'adapte dynamiquement
  const pages = document.querySelectorAll("#book .m-page");
  if (!pages.length) return;

  let currentIndex = 0;
  const totalPages = pages.length;

  // Création dynamique de la barre de navigation mobile
  const navBar = document.createElement("nav");
  navBar.id = "mobile-nav-bar";
  navBar.setAttribute("aria-label", "Navigation mobile du journal");

  navBar.innerHTML = `
    <button id="mob-prev" aria-label="Page précédente">PAGE PRÉC.</button>
    <div id="mobile-nav-counter" aria-live="polite">Page 1 / ${totalPages}</div>
    <button id="mob-next" aria-label="Page suivante">PAGE SUIV.</button>
  `;

  document.body.appendChild(navBar);

  const btnPrev = document.getElementById("mob-prev");
  const btnNext = document.getElementById("mob-next");
  const counter = document.getElementById("mobile-nav-counter");

  function showPage(index) {
    if (index < 0 || index >= totalPages) return;
    currentIndex = index;

    // Masquer toutes les pages et n'afficher que la cible
    pages.forEach((page, i) => {
      if (i === currentIndex) {
        page.classList.add("active");
        // Remet le défilement interne de la page en haut lors du changement
        page.scrollTop = 0;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        page.classList.remove("active");
      }
    });

    // Mise à jour du compteur dynamique
    counter.textContent = `Page ${currentIndex + 1} / ${totalPages}`;

    // Gestion des états désactivés aux limites
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === totalPages - 1;
  }

  // Écouteurs d'événements pour les boutons
  btnPrev.addEventListener("click", () => {
    if (currentIndex > 0) {
      showPage(currentIndex - 1);
    }
  });

  btnNext.addEventListener("click", () => {
    if (currentIndex < totalPages - 1) {
      showPage(currentIndex + 1);
    }
  });

  // Gestion optionnelle du balayage horizontal (Swipe) sans bloquer le scroll vertical
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    // Seuil minimal de swipe horizontal (en pixels)
    const threshold = 50;
    if (window.innerWidth <= 767) {
      if (touchEndX + threshold < touchStartX) {
        // Swipe gauche -> Page suivante
        if (currentIndex < totalPages - 1) showPage(currentIndex + 1);
      } else if (touchEndX > touchStartX + threshold) {
        // Swipe droite -> Page précédente
        if (currentIndex > 0) showPage(currentIndex - 1);
      }
    }
  }

  // Initialisation à la première page
  showPage(0);

  // Sécurité en cas de redimensionnement de l'écran (passage de mobile à desktop et inversement)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 767) {
      // Sur grand écran, on retire la classe active pour laisser le CSS desktop s'exprimer
      pages.forEach(page => page.classList.remove("active"));
    } else {
      // Retour en mode mobile, on réactive la page courante
      showPage(currentIndex);
    }
  });
});