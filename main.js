// Base de datos simulada de gatitos pequeños y gatas adultas en adopción
const catsData = [
  // Gatitos Pequeños
  {
    id: 1,
    name: "Pelusa",
    category: "gatitos",
    gender: "Hembra",
    age: "2.5 Meses",
    sterilized: false,
    vaccinated: true,
    dewormed: true,
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80",
    description: "Muy juguetona, curiosa y cariñosa. Rescatada en Buga. Busca un hogar con mallas de seguridad."
  },
  {
    id: 2,
    name: "Simba",
    category: "gatitos",
    gender: "Macho",
    age: "3 Meses",
    sterilized: false,
    vaccinated: true,
    dewormed: true,
    image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80",
    description: "Un gatito atigrado lleno de energía. Le encanta ronronear y compartir con otros gatitos."
  },
  {
    id: 3,
    name: "Nube",
    category: "gatitos",
    gender: "Hembra",
    age: "2 Meses",
    sterilized: false,
    vaccinated: true,
    dewormed: true,
    image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=600&q=80",
    description: "Tímida al principio pero muy dulce una vez toma confianza. Ideal para un hogar tranquilo."
  },

  // Gatas Adultas Esterilizadas
  {
    id: 4,
    name: "Micaela",
    category: "gatas-adultas",
    gender: "Hembra",
    age: "2 Años",
    sterilized: true,
    vaccinated: true,
    dewormed: true,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80",
    description: "Gata tricolor tranquila y amorosa. Se entrega 100% esterilizada y vacunada. Le encanta dormir al sol."
  },
  {
    id: 5,
    name: "Luna",
    category: "gatas-adultas",
    gender: "Hembra",
    age: "3 Años",
    sterilized: true,
    vaccinated: true,
    dewormed: true,
    image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=80",
    description: "Rescatada y recuperada en la fundación. Es experta en dar afecto y busca una familia consciente."
  },
  {
    id: 6,
    name: "Kiara",
    category: "gatas-adultas",
    gender: "Hembra",
    age: "1.5 Años",
    sterilized: true,
    vaccinated: true,
    dewormed: true,
    image: "https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=600&q=80",
    description: "Joven, esterilizada y muy limpia. Acostumbrada a vivir en interiores protegidos."
  }
];

// Elementos del DOM
const catsGrid = document.getElementById('catsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

const adoptModal = document.getElementById('adoptModal');
const closeModal = document.getElementById('closeModal');
const modalCatName = document.getElementById('modalCatName');
const selectedCatInput = document.getElementById('selectedCatInput');
const adoptionForm = document.getElementById('adoptionForm');

// Función para renderizar las tarjetas de gatos
function renderCats(filter = 'todos') {
  catsGrid.innerHTML = '';

  const filteredCats = filter === 'todos' 
    ? catsData 
    : catsData.filter(cat => cat.category === filter);

  if (filteredCats.length === 0) {
    catsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No hay felinos disponibles en esta categoría actualmente.</p>`;
    return;
  }

  filteredCats.forEach(cat => {
    const isKitten = cat.category === 'gatitos';
    const categoryLabel = isKitten ? 'Gatito Pequeño' : 'Gata Adulta';

    const card = document.createElement('div');
    card.className = 'cat-card';
    card.innerHTML = `
      <div class="cat-image-wrapper">
        <img src="${cat.image}" alt="${cat.name}" class="cat-image">
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
          ${cat.sterilized ? '<span class="tag sterilized">✓ Esterilizada</span>' : '<span class="tag">Compromiso Esterilización</span>'}
          ${cat.vaccinated ? '<span class="tag">✓ Vacunado/a</span>' : ''}
          ${cat.dewormed ? '<span class="tag">✓ Desparasitado/a</span>' : ''}
        </div>
        <p class="cat-desc">${cat.description}</p>
        <button class="btn-adopt" onclick="openAdoptionModal('${cat.name}')">Solicitar Adopción</button>
      </div>
    `;
    catsGrid.appendChild(card);
  });
}

// Control de Filtros
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    renderCats(filter);
  });
});

// Menú Hamburguesa para Móviles
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Cerrar menú móvil al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

// Abrir Modal de Adopción
function openAdoptionModal(catName) {
  modalCatName.textContent = catName;
  selectedCatInput.value = catName;
  adoptModal.classList.add('active');
}

// Cerrar Modal
closeModal.addEventListener('click', () => {
  adoptModal.classList.remove('active');
});

adoptModal.addEventListener('click', (e) => {
  if (e.target === adoptModal) {
    adoptModal.classList.remove('active');
  }
});

// Manejo del Envío del Formulario
adoptionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const catName = selectedCatInput.value;
  const applicantName = document.getElementById('fullName').value;

  alert(`¡Muchas gracias ${applicantName}! Tu solicitud de adopción para ${catName} ha sido recibida por la Fundación RINKA. Nos pondremos en contacto contigo pronto.`);

  adoptionForm.reset();
  adoptModal.classList.remove('active');
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderCats('todos');
});


/* Botón para copiar el número de Nequi de RINKA */
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
                "Número de Nequi: " + nequiNumber.textContent;
        }
    });
}
