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