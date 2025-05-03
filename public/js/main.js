// Add this to your existing main.js file

// Scroll animation for projects
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add a slight delay between each card animation
                const index = Array.from(elements).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Enhanced animations for resume timeline
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease';
        item.style.transitionDelay = `${index * 0.2}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100);
    });
}

// Animate contact form elements
function animateContactForm() {
    const formElements = document.querySelectorAll('.contact-form .form-group, .contact-info-item');
    
    formElements.forEach((element, index) => {
        element.classList.add('animate-form-element');
        element.style.animationDelay = `${index * 0.15}s`;
    });
}

// Call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navbarMenu = document.querySelector('.navbar ul');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
        }
    });
    
    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item, .project-card');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Skill bar animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = targetWidth;
                bar.style.transition = 'width 1.5s ease-in-out';
            }, 200);
        });
    }
    
    // Run animation when resume section is in view
    const resumeSection = document.querySelector('.resume-section');
    if (resumeSection) {
        // Simple check if element is in viewport
        const isInViewport = function(elem) {
            const bounding = elem.getBoundingClientRect();
            return (
                bounding.top >= 0 &&
                bounding.left >= 0 &&
                bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };
        
        // Check on scroll
        let animated = false;
        window.addEventListener('scroll', function() {
            if (!animated && isInViewport(resumeSection)) {
                animateSkillBars();
                animated = true;
            }
        });
        
        // Initial check
        if (isInViewport(resumeSection)) {
            animateSkillBars();
            animated = true;
        }
    }
    
    // Theme toggle functionality - Fixed
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const body = document.body;
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark-theme') {
            body.classList.add('dark-theme');
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
        
        // Toggle theme with animation
        themeToggle.addEventListener('click', () => {
            // Add transition class for smooth color changes
            document.documentElement.classList.add('color-theme-in-transition');
            
            if (body.classList.contains('dark-theme')) {
                body.classList.remove('dark-theme');
                themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light-theme');
            } else {
                body.classList.add('dark-theme');
                themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark-theme');
            }
            
            // Remove transition class after transition completes
            setTimeout(() => {
                document.documentElement.classList.remove('color-theme-in-transition');
            }, 300);
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject')?.value || '';
            const message = document.getElementById('message').value;
            
            // Create data object to send to server
            const formData = {
                name,
                email,
                subject,
                message
            };
            
            try {
                // Send data to your server endpoint
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    alert('Message sent successfully!');
                    contactForm.reset();
                } else {
                    alert(result.message || 'Something went wrong. Please try again.');
                }
            } catch (err) {
                console.error('Error submitting form:', err);
                alert('An error occurred. Please try again later.');
            }
        });
    }
    
    // Initialize scroll animations
    handleScrollAnimations();
    
    // Check if we're on the resume page and animate timeline
    if (document.querySelector('.resume-section')) {
        animateTimeline();
    }
    
    // Check if we're on the contact page and animate form
    if (document.querySelector('.contact-section')) {
        animateContactForm();
    }
    
    // Add 3D tilt effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateY = (mouseX / (cardRect.width / 2)) * 5;
            const rotateX = -(mouseY / (cardRect.height / 2)) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
        });
    });
});