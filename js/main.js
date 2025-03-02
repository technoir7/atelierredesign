/**
 * Atelier School of Classical Realism
 * Main JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initMobileMenu();
    initScrollEffects();
    initGallery();
    initTestimonialSlider();
    initFadeInAnimations();
    initContactForm();
    initCalendarFilter();
    enhanceHeaderInteraction();
    initImageHoverEffects();
});

/**
 * Mobile menu toggle functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            menu.classList.toggle('active');
            
            // Prevent body scrolling when menu is open
            if (menu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menu.contains(event.target) && !menuToggle.contains(event.target) && menu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Handle touch events properly on iOS
        menu.addEventListener('touchstart', function(e) {
            e.stopPropagation();
        }, { passive: true });
    }
}

/**
 * Scroll effects for header and smooth scrolling
 */
function initScrollEffects() {
    const header = document.querySelector('.site-header');
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.padding = '0.75rem 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '2rem 0';
                header.style.boxShadow = 'none';
            }
        });
    }
    
    // Smooth scroll for anchor links
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if it's open
            const menu = document.querySelector('.menu');
            const menuToggle = document.querySelector('.menu-toggle');
            if (menu && menu.classList.contains('active')) {
                menu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Gallery functionality
 */
function initGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    if (!galleryGrid) return;
    
    // Sample gallery items (replace with your actual images)
    const galleryItems = [
        { image: 'images/gallery1.jpg', caption: 'Student Work - Figure Drawing' },
        { image: 'images/gallery2.jpg', caption: 'Student Work - Still Life' },
        { image: 'images/gallery3.jpg', caption: 'Faculty Work - Portrait' },
        { image: 'images/gallery4.jpg', caption: 'Student Work - Landscape' },
        { image: 'images/gallery5.jpg', caption: 'Student Work - Sculpture' },
        { image: 'images/gallery6.jpg', caption: 'Faculty Work - Master Copy' },
        { image: 'images/gallery7.jpg', caption: 'Student Work - Portrait' },
        { image: 'images/gallery8.jpg', caption: 'Student Work - Figure Painting' }
    ];
    
    // Generate gallery items
    galleryItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item fade-in';
        
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.caption}">
            <div class="gallery-overlay">
                <div class="gallery-caption">
                    <h4>${item.caption}</h4>
                </div>
            </div>
        `;
        
        galleryGrid.appendChild(galleryItem);
    });
}

/**
 * Testimonial slider functionality
 */
function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = testimonialSlider ? testimonialSlider.querySelectorAll('.testimonial') : [];
    
    if (testimonials.length <= 1) return;
    
    let currentIndex = 0;
    
    // Hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
        if (index > 0) {
            testimonial.style.display = 'none';
        }
    });
    
    // Create navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'testimonial-nav prev';
    prevButton.innerHTML = '&larr;';
    prevButton.setAttribute('aria-label', 'Previous testimonial');
    
    const nextButton = document.createElement('button');
    nextButton.className = 'testimonial-nav next';
    nextButton.innerHTML = '&rarr;';
    nextButton.setAttribute('aria-label', 'Next testimonial');
    
    testimonialSlider.appendChild(prevButton);
    testimonialSlider.appendChild(nextButton);
    
    // Add event listeners to buttons
    prevButton.addEventListener('click', function() {
        testimonials[currentIndex].style.display = 'none';
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        testimonials[currentIndex].style.display = 'block';
    });
    
    nextButton.addEventListener('click', function() {
        testimonials[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % testimonials.length;
        testimonials[currentIndex].style.display = 'block';
    });
    
    // Auto-rotate testimonials
    setInterval(function() {
        testimonials[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % testimonials.length;
        testimonials[currentIndex].style.display = 'block';
    }, 8000); // Change testimonial every 8 seconds
}

/**
 * Fade-in animations on scroll
 */
function initFadeInAnimations() {
    const elements = document.querySelectorAll('.section-header, .about-content, .program-card, .instructor-card, .calendar-card, .contact-wrapper');
    
    // Add initial classes
    elements.forEach(element => {
        element.classList.add('fade-in');
        element.style.opacity = "0";
    });
    
    // Create the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If element is in view
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    });
    
    // Observe each element
    elements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Calendar filtering functionality
 */
function initCalendarFilter() {
    const calendarCards = document.querySelectorAll('.calendar-card');
    
    calendarCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 25px 50px rgba(168,131,76,0.2)';
            
            // Enhance the gold section
            const goldSection = this.querySelector('div:first-child');
            if (goldSection) {
                goldSection.style.background = '#8a6b3d';
                goldSection.style.transition = 'all 0.3s ease';
            }
            
            // Enhance the image
            const imageContainer = this.querySelector('div:nth-child(2) > div:first-child');
            if (imageContainer) {
                imageContainer.style.borderColor = '#a8834c';
                imageContainer.style.transition = 'all 0.3s ease';
            }
            
            // Enhance the title
            const title = this.querySelector('h4');
            if (title) {
                title.style.color = '#a8834c';
                title.style.transition = 'all 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
            
            // Reset the gold section
            const goldSection = this.querySelector('div:first-child');
            if (goldSection) {
                goldSection.style.background = '#a8834c';
            }
            
            // Reset the image
            const imageContainer = this.querySelector('div:nth-child(2) > div:first-child');
            if (imageContainer) {
                imageContainer.style.borderColor = 'rgba(168,131,76,0.3)';
            }
            
            // Reset the title
            const title = this.querySelector('h4');
            if (title) {
                title.style.color = '#1d2327';
            }
        });
    });
}

/**
 * Contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('inquiry-form');
    
    if (!contactForm) return;
    
    // Update form action based on selected interest
    const interestSelect = document.getElementById('interest');
    if (interestSelect) {
        interestSelect.addEventListener('change', function() {
            const selectedInterest = this.value;
            
            // Map interests to appropriate email addresses
            let targetEmail = 'dnshardy@yahoo.com,cantolin4@gmail.com'; // Default to both
            
            if (selectedInterest === 'drawing') {
                targetEmail = 'dnshardy@yahoo.com'; // David Hardy
            } else if (selectedInterest === 'anatomy' || selectedInterest === 'sculpture') {
                targetEmail = 'cantolin4@gmail.com'; // Charlie Antolin
            } else if (selectedInterest === 'workshop') {
                targetEmail = 'dnshardy@yahoo.com'; // David Hardy for workshops
            }
            
            // Update the form action
            contactForm.action = `mailto:${targetEmail}`;
        });
    }
    
    contactForm.addEventListener('submit', function(e) {
        // For mailto: links in modern browsers, we don't need to prevent default
        // as they should open the user's email client
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const interest = document.getElementById('interest').value;
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        let isValid = true;
        
        if (name === '') {
            showError('name', 'Please enter your name');
            isValid = false;
        } else {
            clearError('name');
        }
        
        if (email === '') {
            showError('email', 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError('email');
        }
        
        if (message === '') {
            showError('message', 'Please enter your message');
            isValid = false;
        } else {
            clearError('message');
        }
        
        // If form is valid, allow the mailto: link to work
        if (!isValid) {
            e.preventDefault();
        } else {
            // Provide feedback that form is being submitted
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.textContent = 'Opening Email Client...';
            
            // Reset button text after a delay
            setTimeout(function() {
                submitButton.textContent = 'Submit Inquiry';
            }, 3000);
        }
    });
    
    // Helper functions for form validation
    function showError(inputId, message) {
        const inputElement = document.getElementById(inputId);
        const errorElement = document.getElementById(`${inputId}-error`);
        
        inputElement.classList.add('error');
        
        if (!errorElement) {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.id = `${inputId}-error`;
            error.textContent = message;
            inputElement.parentNode.appendChild(error);
        } else {
            errorElement.textContent = message;
        }
    }
    
    function clearError(inputId) {
        const inputElement = document.getElementById(inputId);
        const errorElement = document.getElementById(`${inputId}-error`);
        
        if (inputElement) {
            inputElement.classList.remove('error');
        }
        
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Enhanced JavaScript for premium interactions

function enhanceHeaderInteraction() {
    const header = document.querySelector('.site-header');
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    // Add premium scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll to sections
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const menu = document.querySelector('.menu');
                const menuToggle = document.querySelector('.menu-toggle');
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
}

function initImageHoverEffects() {
    // Implementation of initImageHoverEffects function
} 