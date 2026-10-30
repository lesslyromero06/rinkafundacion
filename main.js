
/* =========================================================
   FUNDACIÓN RINKA
   Catálogo de adopción, navegación, formulario y donaciones
   ========================================================= */


/* 1. BASE DE DATOS DE GATITOS EN ADOPCIÓN */

const catsData = [
  {
    id: 1,
    name: "Bomberito",
    category: "gatitos",
    gender: "Macho",
    age: "5 meses",
    sterilized: false,
    vaccinated: false,
    dewormed: true,
    image: "images/1.bomberito.jpg",
    description: "Muy jugueton, curioso y cariñoso. Rescatado en foco de Bomberos de Buga. Busca un hogar donde lo amen mucho"
  },
  {
    id: 2,
    name: "Huesos",
    category: "gatitos",
    gender: "Macho",
    age: "3 Meses",
    sterilized: false,
    vaccinated: false,
    dewormed: true,
    image: "images/2.huesos.jpg",
    description: "Un gatito gris muy tierno. Le encanta ronronear y compartir con otros gatitos. Nació en los techos y llegó a nosotros muy delgado, de ahí su nombre."
  },
  {
    id: 3,
    name: "NN3",
    category: "gatitos",
    gender: "Macho",
    age: "5 Meses",
    sterilized: false,
    vaccinated: false,
    dewormed: true,
    image: "images/3.mala-caroso.jpg",
    description: "Tímido al principio pero muy dulce una vez toma confianza. Ideal para un hogar tranquilo. Nació en los techos y fue un proceso su socialización, pero ya ha confiado más en los humanos"
  },
  {
    id: 4,
    name: "NN4",
    category: "gatitos",
    gender: "Macho",
    age: "2 meses",
    sterilized: false,
    vaccinated: false,
    dewormed: true,
    image: "images/4.vision-cabal.jpg",
    description: "Gato gris proveniente de los techos, amoroso y en búsqueda de un hogar que lo ame toda la vida"
  },
  {
    id: 5,
    name: "NN5",
    category: "gatitos",
    gender: "Hembra",
    age: "3 meses",
    sterilized: false,
    vaccinated: false,
    dewormed: true,
    image: "images/5.negra-alejandra.jpg",
    description: "Rescatada y recuperada en la fundación. Viene de una zona boscosa y busca un hogar con paciencia para confiar"
  },
  {
    id: 6,
    name: "NN6",
    category: "gatitos",
    gender: "Hembra",
    age: "2 meses",
    sterilized: false,
    vaccinated: false,
    dewormed: true,
    image: "images/6.fernanda1.jpg",
    description: "Nacio en los techos y desconfiaba de los humanos, pero el amor la ha hecho cambiar y ahora busca un lugar lleno de amor para ella"
  },
  {
    id: 7,
    name: "Princesa",
    category: "gatitos",
    gender: "Hembra",
    age: "4 meses",
    sterilized: false,
    vaccinated: false,
    dewormed: true,
    image: "images/7.princesa.jpg",
    description: "Una gatita proveniente de los techos de Alto Bonito. Es hermosa y busca una familia que le tenga paciencia para enseñarle lo que es el amor, ya que aun le cuesta confiar en los humanos"
  }
];


/* 2. ELEMENTOS DE LA PÁGINA */

const catsGrid = document.getElementById("catsGrid");
const filterBtns = document.querySelectorAll(".filter-btn");

const menuToggle = document.getElementById("menuToggle");
const navLinksLeft = document.getElementById("navLinksLeft");
const navLinksRight = document.getElementById("navLinksRight");

const adoptModal = document.getElementById("adoptModal");
const closeModal = document.getElementById("closeModal");
const modalCatName = document.getElementById("modalCatName");
const selectedCatInput = document.getElementById("selectedCatInput");
const adoptionForm = document.getElementById("adoptionForm");


/* 3. MOSTRAR EL CATÁLOGO DE GATITOS */

function renderCats(filter = "todos") {
  if (!catsGrid) return;

  catsGrid.innerHTML = "";

  const filteredCats = filter === "todos"
    ? catsData
    : catsData.filter(cat => cat.category === filter);

  if (filteredCats.length === 0) {
    catsGrid.innerHTML = `
      <p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted);">
        No hay felinos disponibles en esta categoría actualmente.
      </p>
    `;
    return;
  }

  filteredCats.forEach(cat => {
    const isKitten = cat.category === "gatitos";
    const categoryLabel = isKitten
      ? "Gatito Pequeño"
      : "Gata Adulta";

    const card = document.createElement("div");
    card.className = "cat-card";

    card.innerHTML = `
      <div class="cat-image-wrapper">
        <img
          src="${cat.image}"
          alt="${cat.name}"
          class="cat-image"
          loading="lazy"
        >
        <span class="cat-badge">${categoryLabel}</span>
      </div>

      <div class="cat-content">
        <div class="cat-title">
          <h3>${cat.name}</h3>
          <span class="cat-gender">${cat.gender}</span>
        </div>

        <div class="cat-details">
          <span>Edad: <strong>${cat.age}</strong></span>
        </div>

        <div class="cat-tags">
          ${
            cat.sterilized
              ? '<span class="tag sterilized">✓ Esterilizada</span>'
              : '<span class="tag">Compromiso Esterilización</span>'
          }

          ${
            cat.vaccinated
              ? '<span class="tag">✓ Vacunado/a</span>'
              : ""
          }

          ${
            cat.dewormed
              ? '<span class="tag">✓ Desparasitado/a</span>'
              : ""
          }
        </div>

        <p class="cat-desc">${cat.description}</p>

        <button
          type="button"
          class="btn-adopt"
          data-cat-name="${cat.name}"
        >
          Solicitar Adopción
        </button>
      </div>
    `;

    catsGrid.appendChild(card);
  });
}


/* 4. FILTROS DEL CATÁLOGO */

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(button => {
      button.classList.remove("active");
    });

    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    renderCats(filter);
  });
});


/* 5. MENÚ DE NAVEGACIÓN PARA CELULARES */

if (menuToggle && navLinksLeft && navLinksRight) {

  // Abrir y cerrar los dos grupos de enlaces.
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinksLeft.classList.contains("show");

    navLinksLeft.classList.toggle("show", !isOpen);
    navLinksRight.classList.toggle("show", !isOpen);

    menuToggle.setAttribute(
      "aria-expanded",
      !isOpen ? "true" : "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      !isOpen ? "Cerrar menú" : "Abrir menú"
    );
  });

  // Cerrar el menú después de seleccionar una opción.
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinksLeft.classList.remove("show");
      navLinksRight.classList.remove("show");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
    });
  });

  // Cerrar el menú si se cambia a una pantalla de escritorio.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinksLeft.classList.remove("show");
      navLinksRight.classList.remove("show");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
    }
  });
}


/* 6. ABRIR EL FORMULARIO DE ADOPCIÓN */

function openAdoptionModal(catName) {
  if (!adoptModal || !modalCatName || !selectedCatInput) {
    return;
  }

  modalCatName.textContent = catName;
  selectedCatInput.value = catName;

  adoptModal.classList.add("active");
}


// Permitir que los botones del catálogo abran el formulario.
if (catsGrid) {
  catsGrid.addEventListener("click", event => {
    const adoptButton = event.target.closest(".btn-adopt");

    if (!adoptButton) return;

    const catName = adoptButton.getAttribute("data-cat-name");

    if (catName) {
      openAdoptionModal(catName);
    }
  });
}


/* 7. CERRAR EL FORMULARIO DE ADOPCIÓN */

if (closeModal && adoptModal) {
  closeModal.addEventListener("click", () => {
    adoptModal.classList.remove("active");
  });

  adoptModal.addEventListener("click", event => {
    if (event.target === adoptModal) {
      adoptModal.classList.remove("active");
    }
  });
}

// Permitir cerrar el formulario con la tecla Escape.
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && adoptModal) {
    adoptModal.classList.remove("active");
  }
});



/* 8. ENVÍO DEL FORMULARIO DE ADOPCIÓN POR WHATSAPP */

if (adoptionForm && selectedCatInput && adoptModal) {
  adoptionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const catName = selectedCatInput.value;
    const applicantName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const city = document.getElementById("city").value.trim();
    const housing = document.getElementById("housing").value;
    const hasMesh = document.getElementById("hasMesh").checked
      ? "Sí, cuenta con mallas o cerramientos de seguridad."
      : "No confirmado";
    const message = document.getElementById("message").value.trim();

    const whatsappMessage =
`🐾 NUEVA SOLICITUD DE ADOPCIÓN - FUNDACIÓN RINKA

🐱 Gatito de interés: ${catName}
👤 Nombre completo: ${applicantName}
📱 Teléfono: ${phone}
📍 Ciudad: ${city}
🏠 Tipo de vivienda: ${housing}
🪟 Seguridad en ventanas y balcones: ${hasMesh}

💚 Sobre su hogar y experiencia con mascotas:
${message || "No proporcionó información adicional."}`;

    const whatsappURL =
      "https://wa.me/573167497201?text=" +
      encodeURIComponent(whatsappMessage);

    window.open(whatsappURL, "_blank");

    alert(
      `Gracias, ${applicantName}. Se abrirá WhatsApp con tu solicitud. Recuerda pulsar Enviar para que RINKA la reciba.`
    );
  });
}



/* 9. BOTÓN PARA COPIAR EL NÚMERO DE NEQUI */

const copyNequiButton = document.getElementById("copyNequi");
const nequiNumber = document.getElementById("nequiNumber");
const copyMessage = document.getElementById("copyMessage");

if (copyNequiButton && nequiNumber && copyMessage) {
  copyNequiButton.addEventListener("click", async () => {
    const number = nequiNumber.textContent.replace(/\s/g, "");

    try {
      await navigator.clipboard.writeText(number);

      copyMessage.textContent =
        "¡Número copiado! Ya puedes pegarlo en Nequi.";

    } catch (error) {
      copyMessage.textContent =
        "Número de Nequi: " + nequiNumber.textContent +
        ". Si no se copió, puedes escribirlo manualmente.";
    }
  });
}


/* 10. INICIALIZAR EL CATÁLOGO */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    renderCats("todos");
  });
} else {
  renderCats("todos");
}


/* =========================================
   CERRAR PROMOCIÓN DE ESTERILIZACIÓN
========================================= */

const promoOverlay = document.getElementById("promoOverlay");
const promoClose = document.getElementById("promoClose");

if (promoOverlay && promoClose) {
  promoClose.addEventListener("click", () => {
    promoOverlay.style.display = "none";
  });
}
