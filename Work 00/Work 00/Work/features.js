// Feature card interaction handling
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');

    // Add click ripple effect
    featureCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Add clicked class for ripple animation
            this.classList.add('clicked');
            
            // Remove class after animation
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 600);

            // Get the feature type from data attribute
            const feature = this.getAttribute('data-feature');
            
            // Handle feature selection
            handleFeatureSelection(this, feature);
        });

        // Keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Enhanced hover effect with mouse tracking
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `translateY(-8px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        observer.observe(card);
    });
});

// Handle feature selection with visual feedback
function handleFeatureSelection(card, feature) {
    // Add loading state
    card.style.opacity = '0.7';
    card.style.pointerEvents = 'none';

    // Navigate to the feature page
    setTimeout(() => {
        navigateToFeature(feature);
    }, 300);
}

// Navigation function (implement based on your routing)
function navigateToFeature(feature) {
    // Map features to their corresponding HTML pages
    const featurePages = {
        'academic-profile': 'Academic Profile.html',
        'career-path': 'Career Path Recommendation.html',
        'skill-gap': 'SkillGap.html',
        'learning-roadmap': 'Roadmap.html',
        'projects': 'Internships.html',
        'resume': 'resume_redirection.html'
    };
    
    const page = featurePages[feature];
    if (page) {
        window.location.href = page;
    }
}

// Add smooth scroll behavior for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Performance optimization: Debounce resize events
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Handle responsive adjustments if needed
    }, 250);
});

// Add loading animation on page load
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Track user engagement (optional analytics)
function trackFeatureClick(feature) {
    // Implement your analytics tracking here
    // Example: gtag('event', 'feature_select', { feature_name: feature });
}

// Add aria-labels for better accessibility
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        const title = card.querySelector('h3').textContent;
        card.setAttribute('aria-label', `Select ${title}`);
    });
});