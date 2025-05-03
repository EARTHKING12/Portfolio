document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    
    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }
    
    // Animate section titles
    function animateSectionTitles() {
        const titles = document.querySelectorAll('.section-title');
        
        titles.forEach(title => {
            title.classList.add('animated');
        });
    }
    
    // Animate navigation items
    function animateNavItems() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animated');
            }, 100 * index);
        });
    }
    
    // Animate project cards
    function animateProjectCards() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            card.classList.add('animated');
        });
    }
    
    // Animate on page load
    setTimeout(() => {
        animateNavItems();
        animateSectionTitles();
    }, 300);
    
    // Animate on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skills-container')) {
                    animateSkillBars();
                }
                if (entry.target.classList.contains('projects-container')) {
                    animateProjectCards();
                }
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe elements
    document.querySelectorAll('.skills-container, .projects-container, .animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Animate timeline items
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const headings = document.querySelectorAll('.resume-heading');
        
        // Animate headings
        headings.forEach((heading, index) => {
            setTimeout(() => {
                heading.classList.add('animate');
            }, index * 300);
        });
        
        // Animate timeline items
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate');
            }, 500 + (index * 200));
        });
    }
    
    // Check if we're on the resume page and animate timeline
    if (document.querySelector('.resume-section')) {
        animateTimeline();
    }
});