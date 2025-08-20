document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 CV de Luis Ángel Villabona cargado correctamente!');

    // Inicializar tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Animación de las barras de habilidades
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, index * 200); // Animación escalonada
        });
    }

    // Animación de contadores de porcentajes
    function animateCounters() {
        const counters = document.querySelectorAll('.skill-percentage');
        counters.forEach((counter, index) => {
            const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
            const increment = target / 50; // Duración de animación
            let current = 0;
            
            setTimeout(() => {
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current) + '%';
                }, 40); // Actualizar cada 40ms para suavidad
            }, index * 100); // Animación escalonada
        });
    }

    // Animación smooth scroll para navegación
    function smoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Intersection Observer para activar animaciones cuando elementos son visibles
    function setupIntersectionObserver() {
        const options = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('skills-section')) {
                        animateSkillBars();
                        animateCounters();
                    }
                    entry.target.classList.add('animate-in');
                }
            });
        }, options);

        // Observar secciones principales
        const sections = document.querySelectorAll('.section, .skills-section');
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Efecto typing para el título principal
    function typewriterEffect() {
        const titleElement = document.querySelector('.typewriter-text');
        if (!titleElement) return;
        
        const text = titleElement.textContent;
        titleElement.textContent = '';
        titleElement.style.visibility = 'visible';
        
        let i = 0;
        const typeTimer = setInterval(() => {
            if (i < text.length) {
                titleElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeTimer);
                titleElement.classList.add('typing-complete');
            }
        }, 100);
    }

    // Inicializar todas las funciones
    smoothScroll();
    setupIntersectionObserver();
    
    // Pequeño delay para el efecto typewriter
    setTimeout(typewriterEffect, 500);
    
    // Añadir clase para elementos con fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 200);
    });

    console.log('✅ Todas las animaciones inicializadas');
});