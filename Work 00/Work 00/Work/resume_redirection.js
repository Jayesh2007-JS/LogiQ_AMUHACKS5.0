// Resume Redirection Page - JavaScript

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeCountdown();
    initializeFeatureInteractions();
    initializeNotificationSystem();
    initializeParticles();
});

// Countdown Timer Logic
function initializeCountdown() {
    // Set launch date (example: 30 days from now)
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);
    
    // Create countdown section
    const countdownHTML = `
        <div class="countdown-section">
            <h4><i class="fas fa-clock"></i> Estimated Launch Countdown</h4>
            <div class="countdown-timer">
                <div class="countdown-item">
                    <span class="countdown-value" id="days">00</span>
                    <span class="countdown-label">Days</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value" id="hours">00</span>
                    <span class="countdown-label">Hours</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value" id="minutes">00</span>
                    <span class="countdown-label">Minutes</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value" id="seconds">00</span>
                    <span class="countdown-label">Seconds</span>
                </div>
            </div>
        </div>
    `;
    
    // Insert countdown before status footer
    const statusFooter = document.querySelector('.status-footer');
    if (statusFooter) {
        statusFooter.insertAdjacentHTML('beforebegin', countdownHTML);
    }
    
    // Update countdown every second
    updateCountdown(launchDate);
    setInterval(() => updateCountdown(launchDate), 1000);
}

function updateCountdown(targetDate) {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance < 0) {
        // Countdown finished
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Feature Interactions
function initializeFeatureInteractions() {
    const featureItems = document.querySelectorAll('.features-list li');
    
    featureItems.forEach((item, index) => {
        // Add click interaction
        item.addEventListener('click', () => {
            // Remove active class from all items
            featureItems.forEach(i => i.classList.remove('active-feature'));
            
            // Add active class to clicked item
            item.classList.add('active-feature');
            
            // Show feature detail
            showFeatureDetail(index);
        });
        
        // Add hover sound effect (optional)
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('active-feature')) {
                item.style.transform = 'translateX(0) scale(1)';
            }
        });
    });
}

function showFeatureDetail(index) {
    const featureDetails = [
        {
            title: "Generate Structured Resumes",
            description: "Our AI analyzes your profile and creates a professionally structured resume tailored to your career goals and industry standards."
        },
        {
            title: "Role-Specific Customization",
            description: "Customize your resume for technical roles (Software Engineer, Data Scientist) or management positions (Product Manager, Business Analyst)."
        },
        {
            title: "Smart Highlighting",
            description: "Automatically highlights your most relevant skills, projects, and certifications based on job requirements and industry trends."
        },
        {
            title: "Quality Improvement",
            description: "Get real-time suggestions to improve resume quality, readability, and ATS compatibility with actionable recommendations."
        },
        {
            title: "Professional Export",
            description: "Export your resume in multiple formats (PDF, DOCX) with professional templates optimized for both ATS systems and human recruiters."
        }
    ];
    
    const detail = featureDetails[index];
    
    // Create or update detail popup
    let popup = document.getElementById('feature-popup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'feature-popup';
        popup.className = 'feature-popup';
        document.body.appendChild(popup);
    }
    
    popup.innerHTML = `
        <div class="popup-content">
            <button class="popup-close" onclick="closeFeaturePopup()">
                <i class="fas fa-times"></i>
            </button>
            <div class="popup-icon">
                <i class="fas fa-lightbulb"></i>
            </div>
            <h3>${detail.title}</h3>
            <p>${detail.description}</p>
        </div>
    `;
    
    popup.classList.add('show');
}

function closeFeaturePopup() {
    const popup = document.getElementById('feature-popup');
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.remove();
        }, 300);
    }
    
    // Remove active class from all features
    document.querySelectorAll('.features-list li').forEach(item => {
        item.classList.remove('active-feature');
        item.style.transform = 'translateX(0) scale(1)';
    });
}

// Notification System
function initializeNotificationSystem() {
    // Add notification button
    const notificationHTML = `
        <button class="notify-btn" id="notifyBtn">
            <i class="fas fa-bell"></i>
            <span>Notify Me When Ready</span>
        </button>
    `;
    
    const backLink = document.querySelector('.back-link');
    if (backLink) {
        backLink.insertAdjacentHTML('beforebegin', notificationHTML);
    }
    
    // Add notification button click handler
    const notifyBtn = document.getElementById('notifyBtn');
    if (notifyBtn) {
        notifyBtn.addEventListener('click', showNotificationForm);
    }
}

function showNotificationForm() {
    const formHTML = `
        <div class="notification-modal" id="notificationModal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeNotificationModal()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-icon">
                    <i class="fas fa-envelope"></i>
                </div>
                <h3>Get Notified</h3>
                <p>Enter your email to receive updates when the Resume Builder launches!</p>
                <form id="notificationForm" onsubmit="submitNotification(event)">
                    <input 
                        type="email" 
                        id="emailInput" 
                        placeholder="your.email@example.com" 
                        required
                    >
                    <button type="submit" class="submit-btn">
                        <i class="fas fa-paper-plane"></i>
                        Subscribe
                    </button>
                </form>
                <p class="privacy-note">
                    <i class="fas fa-lock"></i> We respect your privacy. No spam, ever.
                </p>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', formHTML);
    
    // Animate modal in
    setTimeout(() => {
        document.getElementById('notificationModal').classList.add('show');
    }, 10);
}

function closeNotificationModal() {
    const modal = document.getElementById('notificationModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function submitNotification(event) {
    event.preventDefault();
    
    const email = document.getElementById('emailInput').value;
    
    // Simulate API call
    console.log('Notification subscription:', email);
    
    // Show success message
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        // Clear existing content
        modalContent.innerHTML = '';
        
        // Create success message container
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        
        // Create success icon
        const successIcon = document.createElement('div');
        successIcon.className = 'success-icon';
        const iconElement = document.createElement('i');
        iconElement.className = 'fas fa-check-circle';
        successIcon.appendChild(iconElement);
        
        // Create heading
        const heading = document.createElement('h3');
        heading.textContent = "You're All Set!";
        
        // Create paragraph with email
        const paragraph = document.createElement('p');
        paragraph.textContent = "We'll notify you at ";
        const strongEmail = document.createElement('strong');
        strongEmail.textContent = email;
        paragraph.appendChild(strongEmail);
        paragraph.appendChild(document.createTextNode(" when the Resume Builder launches."));
        
        // Create button
        const button = document.createElement('button');
        button.className = 'close-success-btn';
        button.textContent = 'Got it!';
        button.onclick = closeNotificationModal;
        
        // Assemble the success message
        successMessage.appendChild(successIcon);
        successMessage.appendChild(heading);
        successMessage.appendChild(paragraph);
        successMessage.appendChild(button);
        
        // Add to modal
        modalContent.appendChild(successMessage);
    }
    
    // Store email in localStorage (for demo purposes)
    localStorage.setItem('notificationEmail', email);
}

// Particle Animation
function initializeParticles() {
    const particleCount = 20;
    const container = document.body;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation duration
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    container.appendChild(particle);
}

// Add CSS for dynamic elements
const dynamicStyles = `
<style>
.active-feature {
    background: rgba(99, 102, 241, 0.15) !important;
    border-left-color: var(--secondary) !important;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2) !important;
}

.feature-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.feature-popup.show {
    opacity: 1;
    visibility: visible;
}

.popup-content {
    background: white;
    padding: 3rem;
    border-radius: 20px;
    max-width: 500px;
    width: 90%;
    text-align: center;
    position: relative;
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.feature-popup.show .popup-content {
    transform: scale(1);
}

.popup-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text-secondary);
    cursor: pointer;
    transition: color 0.3s ease;
}

.popup-close:hover {
    color: var(--primary);
}

.popup-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.popup-icon i {
    font-size: 2.5rem;
    color: white;
}

.popup-content h3 {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.popup-content p {
    font-size: 1.05rem;
    color: var(--text-secondary);
    line-height: 1.7;
}

.notify-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.25rem 2.5rem;
    background: var(--gradient-success);
    color: white;
    border: none;
    border-radius: 14px;
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
    margin-bottom: 1.5rem;
}

.notify-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(16, 185, 129, 0.4);
}

.notify-btn i {
    font-size: 1.25rem;
    animation: ring 2s ease-in-out infinite;
}

@keyframes ring {
    0%, 100% { transform: rotate(0deg); }
    10%, 30% { transform: rotate(-10deg); }
    20%, 40% { transform: rotate(10deg); }
}

.notification-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.notification-modal.show {
    opacity: 1;
    visibility: visible;
}

.modal-content {
    background: white;
    padding: 3rem;
    border-radius: 20px;
    max-width: 500px;
    width: 90%;
    text-align: center;
    position: relative;
}

.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text-secondary);
    cursor: pointer;
}

.modal-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-icon i {
    font-size: 2.5rem;
    color: white;
}

.modal-content h3 {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.modal-content p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
}

#notificationForm {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

#emailInput {
    padding: 1rem 1.5rem;
    border: 2px solid var(--border-color);
    border-radius: 10px;
    font-size: 1rem;
    font-family: var(--font-primary);
    transition: border-color 0.3s ease;
}

#emailInput:focus {
    outline: none;
    border-color: var(--primary);
}

.submit-btn {
    padding: 1rem 2rem;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    font-size: 1.05rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
}

.submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
}

.privacy-note {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.success-message {
    padding: 2rem 0;
}

.success-icon {
    width: 100px;
    height: 100px;
    margin: 0 auto 1.5rem;
    background: linear-gradient(135deg, #10B981 0%, #06B6D4 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: successPop 0.5s ease;
}

@keyframes successPop {
    0% { transform: scale(0); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

.success-icon i {
    font-size: 3rem;
    color: white;
}

.close-success-btn {
    padding: 1rem 2.5rem;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    font-size: 1.05rem;
    cursor: pointer;
    margin-top: 1.5rem;
}

.particle {
    position: fixed;
    width: 4px;
    height: 4px;
    background: var(--primary);
    border-radius: 50%;
    opacity: 0.3;
    animation: float linear infinite;
    pointer-events: none;
    z-index: 0;
}

@keyframes float {
    0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
    }
    50% {
        opacity: 0.3;
    }
    100% {
        transform: translateY(-100vh) translateX(50px);
        opacity: 0;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', dynamicStyles);
