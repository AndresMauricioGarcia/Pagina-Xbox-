document.addEventListener('DOMContentLoaded', function() {
    var menuButtons = document.querySelectorAll('.menu-button');
    var submenuButtons = document.querySelectorAll('.submenu-button');

    // Ocultar todos los menús y submenús al inicio
    document.querySelectorAll('.menu-list, .submenu-list').forEach(function(list) {
        list.style.display = 'none';
    });

    // Función para ocultar todos los menús
    function hideAllMenus() {
        document.querySelectorAll('.menu-list').forEach(function(list) {
            list.style.display = 'none';
        });
        document.querySelectorAll('.submenu-list').forEach(function(list) {
            list.style.display = 'none';
        });
    }

    // Evento para los botones de menú principal
    menuButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Detener la propagación para evitar que se oculten los submenús
            var menuList = this.nextElementSibling;
            var isVisible = menuList.style.display === 'block';
            hideAllMenus(); // Ocultar todos los menús
            menuList.style.display = isVisible ? 'none' : 'block'; // Mostrar/ocultar el menú
        });
    });

    // Evento para los botones de submenú
    submenuButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevenir la acción por defecto
            event.stopPropagation(); // Detener la propagación para evitar que se oculten los submenús
            var submenuList = this.nextElementSibling;
            var isVisible = submenuList.style.display === 'block';
            // Ocultar todos los submenús antes de mostrar el clicado
            document.querySelectorAll('.submenu-list').forEach(function(list) {
                list.style.display = 'none';
            });
            submenuList.style.display = isVisible ? 'none' : 'block'; // Mostrar/ocultar el submenú
        });
    });

    // Cerrar menús si se hace clic fuera de ellos
    document.addEventListener('click', function(event) {
        if (!event.target.matches('.menu-button, .submenu-button')) {
            hideAllMenus();
        }
    });

    // Ocultar menú si se hace clic fuera de él
    document.addEventListener('click', function(event) {
        var isClickInsideMenu = event.target.closest('.menu');
        if (!isClickInsideMenu) {
            document.querySelectorAll('.menu-list').forEach(function(list) {
                list.style.display = 'none';
            });
        }
    });

    // Carrusel
    let slideIndex = 0;
    let autoSlideInterval;
    let isPaused = false;
    
    // Base64 encoded images for play and pause icons
    const playIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABj0lEQVR4nO2ZPUsDQRCGHyNRiAgJKJjGxiY2amE6u1Qi+QWCf8EqvY0/wNJSS1srsVEbsbGziDYWWihYGATFj6wszMJyaOVddMZ94Dj27vaOl73deXcGEolEIkMHGMEADugCyxgQ4uQ4BGZRipOjJ+cXYBMYQ6mQOrANfEj7FlgDhlAmJLAInEbXj4F5FArxlGQ07uSeH6VdYBJlQgJVYAt4k2cegHVgGGVCAg3gIHr2HFhCoZBAG7iO+uwD0ygU4qkAG8Cz9HuS9ijKhARmgL2o/xWwgkIhgRZw8RfcgfuhEE9ZVrNHederrHbjKBMSqEu86f+GO3A5Cgk0gbOMO5hDoZDYHdxn3MEEyoQEajJf3ot2B0ULCSwAJ0W6g0EJQSb9KnAj3/SLwg4wRQ4kIf/t16ppn+wmlt9mJiAeaQuI6i1K2YJpbH1h4/3WWO3G6lLbxqpiYavbjpIPfRkRVcmHhvZ0UFV7gq70Tcq0sKg8qCR24VE5D8yVFXpWCj3OQumta6EY2rFSnk4kEujlE4Rx1mgQiGC0AAAAAElFTkSuQmCC";
    const pauseIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAfUlEQVR4nO3XsQ3AIBAEQWpv+p1cAQ6O2MYzEhH64MVmrAUAe83N89R8zXGLvHVfY5HwIm3SCmm1SSuk1SatkFabtEJabdIKabVJK6TVJq2QVpu0Qlpt0vpqWnPKt8L8fREAWHEBbnI+0BRFWvcAAAAASUVORK5CYII";
    
    function moveSlide(n) {
        const slides = document.querySelectorAll('.carousel-item');
        slideIndex += n;
    
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
    
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
    
        updateCarousel();
    }
    
    function updateCarousel() {
        const slides = document.querySelectorAll('.carousel-item');
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === slideIndex) {
                slide.classList.add('active');
            }
        });
    
        const newTransform = -slideIndex * 100;
        document.querySelector('.carousel-inner').style.transform = `translateX(${newTransform}%)`;
        updateIndicators();
    }
    
    function updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === slideIndex) {
                indicator.classList.add('active');
            }
        });
    }
    
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            slideIndex = index;
            updateCarousel();
        });
    });
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            moveSlide(1);
        }, 3000); // Cambia cada 3 segundos
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    function togglePause() {
        const pauseButtonIcon = document.getElementById('pauseButtonIcon');
        if (isPaused) {
            startAutoSlide();
            pauseButtonIcon.src = pauseIcon;
        } else {
            stopAutoSlide();
            pauseButtonIcon.src = playIcon;
        }
        isPaused = !isPaused;
    }
    
    // Pausar y reanudar al pasar el mouse sobre el carrusel
    document.querySelector('.carousel').addEventListener('mouseenter', stopAutoSlide);
    document.querySelector('.carousel').addEventListener('mouseleave', () => {
        if (!isPaused) startAutoSlide();
    });
    
    // Asignar funciones a los botones prev y next
    document.querySelector('.prev').addEventListener('click', function() {
        moveSlide(-1);
    });
    
    document.querySelector('.next').addEventListener('click', function() {
        moveSlide(1);
    });
    
    // Iniciar el carrusel automáticamente
    updateCarousel();
    startAutoSlide();
    

});
