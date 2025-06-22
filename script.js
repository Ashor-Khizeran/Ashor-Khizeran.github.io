// Hamburger menu toggle script
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.getElementById('main-nav');
    const toggle = nav.querySelector('.nav-toggle');
    const menu = nav.querySelector('ul');

    toggle.addEventListener('click', function() {
        const expanded = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', expanded);
        if (expanded) {
            menu.style.display = 'flex';
        } else {
            menu.style.display = '';
        }
    });

    // Smooth scrolling for menu links
    menu.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', false);
            menu.style.display = '';
        });
    });

    // --- Project Filter Feature ---
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        // Example filter buttons (add these to your HTML)
        // <div id="project-filters">
        //   <button data-filter="all">All</button>
        //   <button data-filter="web">Web</button>
        //   <button data-filter="api">API</button>
        // </div>
        // <article data-category="web">...</article>
        // <article data-category="api">...</article>

        const filterContainer = document.getElementById('project-filters');
        if (filterContainer) {
            filterContainer.addEventListener('click', function(e) {
                if (e.target.tagName === 'BUTTON') {
                    const filter = e.target.getAttribute('data-filter');
                    document.querySelectorAll('#project-filters button').forEach(btn => btn.classList.remove('active'));
                    e.target.classList.add('active');
                    document.querySelectorAll('#projects article').forEach(article => {
                        if (filter === 'all' || article.dataset.category === filter) {
                            // Show the article if 'all' is selected or it's category matches the filter
                            article.style.display = '';
                        } else {
                            article.style.display = 'none';
                        }
                    });
                }
            });
        }
    }

    // --- Lightbox Effect for Project Images ---
    function createLightbox() {
        // Create modal elements if not already present
        if (document.getElementById('lightbox-modal')) return;
        const modal = document.createElement('div');
        modal.id = 'lightbox-modal';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center;
            z-index: 2000; display: none;
        `;
        const img = document.createElement('img');
        img.id = 'lightbox-img';
        img.style.cssText = 'max-width: 90vw; max-height: 80vh; border-radius: 8px; box-shadow: 0 4px 24px rgba(0,0,0,0.3);';
        modal.appendChild(img);

        // Close on click or ESC
        modal.addEventListener('click', () => { modal.style.display = 'none'; });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') modal.style.display = 'none';
        });

        document.body.appendChild(modal);
    }

    function enableProjectImageLightbox() {
        createLightbox();
        const modal = document.getElementById('lightbox-modal');
        const modalImg = document.getElementById('lightbox-img');
        // Select images inside #projects articles
        document.querySelectorAll('#projects article img').forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                modalImg.src = this.src;
                modalImg.alt = this.alt || '';
                modal.style.display = 'flex';
            });
        });
    }

    // Initialize lightbox after DOM is ready
    enableProjectImageLightbox();

    // --- Contact Form Validation ---
    // Contact form validation
    const contactForm = document.querySelector('#contact-form form');
    // Ensure the form exists before adding validation
    if (contactForm) {
        const nameInput = contactForm.querySelector('#contact-name');
        const emailInput = contactForm.querySelector('#contact-email');
        const messageInput = contactForm.querySelector('#contact-message');

        // Helper to show error
        function showError(input, message) {
            let error = input.parentElement.querySelector('.form-error');
            if (!error) {
                error = document.createElement('span');
                error.className = 'form-error';
                error.style.color = '#e74c3c';
                error.style.fontSize = '0.95em';
                error.style.marginTop = '4px';
                error.style.display = 'block';
                input.parentElement.appendChild(error);
            }
            error.textContent = message;
            input.setAttribute('aria-invalid', 'true');
        }

        // Helper to clear error
        function clearError(input) {
            let error = input.parentElement.querySelector('.form-error');
            if (error) error.textContent = '';
            input.removeAttribute('aria-invalid');
        }

        // Email validation regex
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        // Real-time validation
        nameInput.addEventListener('input', function() {
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required.');
            } else {
                clearError(nameInput);
            }
        });

        emailInput.addEventListener('input', function() {
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required.');
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address.');
            } else {
                clearError(emailInput);
            }
        });

        messageInput.addEventListener('input', function() {
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required.');
            } else {
                clearError(messageInput);
            }
        });

        // On submit
        contactForm.addEventListener('submit', function(e) {
            let valid = true;

            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required.');
                valid = false;
            }
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required.');
                valid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address.');
                valid = false;
            }
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required.');
                valid = false;
            }

            if (!valid) {
                e.preventDefault();
            }
        });
    }
});