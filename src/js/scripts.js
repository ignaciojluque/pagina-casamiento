document.addEventListener('DOMContentLoaded', () => {
  const scrollArrow = document.querySelector('.flecha-continuar');

  window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
          scrollArrow.style.display = 'none';
      } else {
          scrollArrow.style.display = 'block';
      }
  });

  const gallery = document.querySelector('.gallery');
  const images = document.querySelectorAll('.gallery img');
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
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const intention = intentionInput.value.trim();
  
      if (!intention) {
        alert("Por favor, escribe una intención.");
        return;
      }
  
      try {
        console.log("Intentando enviar intención:", intention);
      
        const response = await fetch("https://gxuknip9i1.execute-api.us-east-2.amazonaws.com/proxyapp/proxy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ intention }), // Enviar intención como objeto JSON
        });
      
        console.log("Respuesta obtenida:", response);
      
        if (!response.ok) {
          console.error(`La respuesta no fue exitosa. Status: ${response.status}`);
          console.error(`Headers de la respuesta:`, Array.from(response.headers.entries()));
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        let result;
        try {
          result = await response.json(); // Procesa la respuesta como JSON
          console.log("Resultado JSON recibido:", result);
        } catch (jsonError) {
          console.error("Error al procesar la respuesta como JSON:", jsonError);
          throw new Error("La respuesta no es JSON válido.");
        }
      
        if (response.ok) {
          console.log("Respuesta exitosa, mostrando mensaje de confirmación.");
          confirmationMessage.style.display = "block";
          intentionInput.value = ""; // Limpiar el campo
          setTimeout(() => {
            confirmationMessage.style.display = "none";
          }, 3000);
        } else {
          console.error("Error en el servidor:", result.error || "Respuesta desconocida");
          alert("Error en el servidor: " + (result.error || "Respuesta desconocida"));
        }
      } catch (error) {
        console.error("Error capturado en el bloque catch:");
        console.error("Detalles del error:", error.message || error);
        console.error("Stack del error:", error.stack || "No disponible");
        alert("Hubo un problema al conectar con el servidor. Detalles: " + (error.message || "Error desconocido"));
      
      }
      
    });
  });
  