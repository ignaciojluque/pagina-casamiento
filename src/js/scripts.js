document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const galleryItems = document.querySelectorAll('.gallery-container .gallery-item img');
    let currentIndex = 0;
  
    // Abre el modal con la imagen seleccionada
    window.openModal = function(index) {
      currentIndex = index; // Actualiza el índice actual con el de la imagen clickeada
      modal.style.display = 'flex';
      modalImage.src = galleryItems[currentIndex].src; // Usa la imagen clickeada
    };
  
    // Cierra el modal
    window.closeModal = function() {
      modal.style.display = 'none';
    };
  
    // Muestra la imagen anterior
    window.prevImage = function() {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      modalImage.src = galleryItems[currentIndex].src;
    };
  
    // Muestra la imagen siguiente
    window.nextImage = function() {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      modalImage.src = galleryItems[currentIndex].src;
    };
  
    // Cierra el modal al hacer clic fuera de la imagen
    window.onclick = function(event) {
      if (event.target === modal) {
        closeModal();
      }
    };
  });
  


const images = document.querySelectorAll('.gallery-item img');
const modal = document.getElementById('photoModal');
const modalImage = document.getElementById('modalImage');
let currentIndex = 0;

function openModal(index) {
    currentIndex = index;
    modal.style.display = 'flex';
    modalImage.src = images[currentIndex].src;
}

function closeModal() {
    modal.style.display = 'none';
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImage.src = images[currentIndex].src;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImage.src = images[currentIndex].src;
}

window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
};

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};



document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.querySelector(".lightbox-image");
    const lightboxDescription = document.querySelector(".lightbox-description");
    const lightboxClose = document.querySelector(".lightbox-close");
    const lightboxPrev = document.querySelector(".lightbox-prev");
    const lightboxNext = document.querySelector(".lightbox-next");
    const images = document.querySelectorAll(".participants-item img");
  
    let currentIndex = 0;
  
    // Abrir el lightbox
    const openLightbox = (index) => {
      const image = images[index];
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightboxDescription.textContent = image.getAttribute("data-description");
      currentIndex = index;
      lightbox.classList.add("lightbox-active");
    };
  
    // Cerrar el lightbox
    const closeLightbox = () => {
      lightbox.classList.remove("lightbox-active");
    };
  
    // Navegar a la imagen anterior
    const showPrevImage = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      openLightbox(currentIndex);
    };
  
    // Navegar a la imagen siguiente
    const showNextImage = () => {
      currentIndex = (currentIndex + 1) % images.length;
      openLightbox(currentIndex);
    };
  
    // Event listeners
    images.forEach((img, index) => {
      img.addEventListener("click", () => openLightbox(index));
    });
  
    lightboxClose.addEventListener("click", closeLightbox);
    lightboxPrev.addEventListener("click", showPrevImage);
    lightboxNext.addEventListener("click", showNextImage);
  
    // Cerrar el lightbox al hacer clic fuera de la imagen
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("intentionForm");
    const intentionInput = document.getElementById("intentionInput");
    const confirmationMessage = document.getElementById("confirmationMessage");
    const submitButton = document.getElementById("submitButton");
    const loadingSpinner = document.getElementById("loadingSpinner");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const intention = intentionInput.value.trim();
  
      if (!intention) {
        alert("Por favor, escribe una intención.");
        return;
      }
  
      // Ocultar el botón y mostrar la rueda giratoria
      submitButton.style.display = "none";
      loadingSpinner.style.display = "block";
  
      try {
        const response = await fetch("https://gxuknip9i1.execute-api.us-east-2.amazonaws.com/proxyapp/proxy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ intention }), // Enviar intención como objeto JSON
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const result = await response.json(); // Procesa la respuesta como JSON
  
        if (response.ok) {
          // Mostrar mensaje de confirmación con estilo
          confirmationMessage.textContent = "¡Gracias por enviar tu intención!";
          confirmationMessage.style.display = "block";
          intentionInput.value = ""; // Limpiar el campo
          loadingSpinner.style.display = "none"; // Ocultar la rueda
  
          // Hacer que el botón reaparezca después de 3 segundos
          setTimeout(() => {
            confirmationMessage.style.display = "none"; // Ocultar el mensaje
            submitButton.style.display = "block"; // Mostrar el botón
          }, 3000);
        } else {
          alert("Error en el servidor: " + (result.error || "Respuesta desconocida"));
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema al conectar con el servidor. " + error.message);
      } finally {
        // Asegurarse de que el spinner desaparezca en cualquier caso
        loadingSpinner.style.display = "none";
      }
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const solapa = document.querySelector('.indice-solapa');
    const linksContainer = document.querySelector('.indice-solapa-links');
    const tab = document.querySelector('.indice-solapa-tab');
  
    let isExpanded = false; // Estado de la solapa (expandida o no)
  
    // Función para expandir la solapa
    const expandSolapa = () => {
      linksContainer.style.display = 'block'; // Mostrar enlaces
      solapa.style.width = '250px'; // Expandir ancho
      solapa.style.height = 'auto'; // Ajustar altura
      tab.setAttribute('data-state', 'expanded'); // Cambiar a estado "expanded"
      isExpanded = true; // Marcar como expandida
    };
  
    // Función para comprimir la solapa
    const resetSolapa = () => {
      linksContainer.style.display = 'none'; // Ocultar enlaces
      solapa.style.width = '40px'; // Ancho inicial
      solapa.style.height = '40px'; // Altura inicial
      tab.setAttribute('data-state', 'default'); // Cambiar a estado "default"
      isExpanded = false; // Marcar como comprimida
    };
  
    // Alternar entre expandir y comprimir la solapa al hacer clic
    tab.addEventListener('click', () => {
      if (isExpanded) {
        resetSolapa();
      } else {
        expandSolapa();
      }
    });
  
    // Manejar clic en los enlaces
    linksContainer.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault(); // Prevenir comportamiento predeterminado del enlace
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
  
        // Scroll suave hacia la sección correspondiente
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
  
        // Comprimir la solapa después de hacer clic
        resetSolapa();
      }
    });
  });
  