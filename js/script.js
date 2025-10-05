// Обработка модального окна
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('order-modal');
  const closeBtn = document.querySelector('.close');
  const productDisplay = document.getElementById('product-display');
  const productInput = document.getElementById('modal-product');
  const orderButtons = document.querySelectorAll('.btn-small');
  
  // Открытие модального окна
  orderButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('h3').textContent;
      const productPrice = productCard.querySelector('.price').textContent;
      
      productDisplay.textContent = `${productName} - ${productPrice}`;
      productInput.value = `${productName} - ${productPrice}`;
      
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    });
  });
  
  // Закрытие модального окна
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  });
  
  // Закрытие при клике вне модального окна
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  });
  
  // Проверка и обработка hover-изображений
  function initHoverImages() {
    const hoverImages = document.querySelectorAll('.hover-image');
    
    hoverImages.forEach(img => {
      // Проверяем, существует ли изображение
      const tempImage = new Image();
      tempImage.onload = function() {
        // Изображение существует, всё хорошо
        console.log('Hover image loaded:', img.src);
      };
      tempImage.onerror = function() {
        // Изображение не существует, скрываем элемент
        console.warn('Hover image not found:', img.src);
        img.style.display = 'none';
        
        // Добавляем класс для основного изображения
        const mainImage = img.previousElementSibling;
        if (mainImage && mainImage.classList.contains('main-image')) {
          mainImage.style.transition = 'transform 0.4s ease';
          const productCard = img.closest('.product-card');
          productCard.addEventListener('mouseenter', function() {
            mainImage.style.transform = 'scale(1.05)';
          });
          productCard.addEventListener('mouseleave', function() {
            mainImage.style.transform = 'scale(1)';
          });
        }
      };
      tempImage.src = img.src;
    });
  }
  
  // Инициализация hover-эффектов
  initHoverImages();
});