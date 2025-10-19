// Immediate loading - no delay
document.addEventListener('DOMContentLoaded', function() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('hidden');
    }
});

// Mobile Navigation Toggle - Simplified
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Close mobile menu when clicking on links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navMenu = document.getElementById('navMenu');
    
    if (navLinks && navMenu) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
});

// FAQ Toggle Function - Fixed
function toggleFAQ(element) {
    if (!element) return;
    
    const answer = element.nextElementSibling;
    const icon = element.querySelector('.faq-icon');
    
    if (!answer || !icon) return;
    
    // Close all other FAQ items first
    const allAnswers = document.querySelectorAll('.faq-answer');
    const allIcons = document.querySelectorAll('.faq-icon');
    
    allAnswers.forEach((item, index) => {
        if (item !== answer && item.classList.contains('active')) {
            item.classList.remove('active');
            if (allIcons[index]) {
                allIcons[index].textContent = '+';
            }
        }
    });
    
    // Toggle current FAQ
    answer.classList.toggle('active');
    icon.textContent = answer.classList.contains('active') ? '−' : '+';
}

// Form Submission for Advice Corner - Fixed
function submitAdvice(event) {
    if (event) {
        event.preventDefault();
    }
    
    const usernameField = document.getElementById('username');
    const emailField = document.getElementById('email');
    const adviceField = document.getElementById('advice');
    
    if (!usernameField || !emailField || !adviceField) {
        alert('Form fields not found. Please refresh the page and try again.');
        return;
    }
    
    const username = usernameField.value.trim();
    const email = emailField.value.trim();
    const advice = adviceField.value.trim();
    
    // Validation
    if (!username || !email || !advice) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Create mailto link
    const subject = encodeURIComponent(`Advice from ${username} - The Void`);
    const body = encodeURIComponent(`Username: ${username}\nEmail: ${email}\n\nAdvice:\n${advice}\n\n---\nSent from The Void Community Website`);
    const mailtoLink = `mailto:looneyahsan@gmail.com?subject=${subject}&body=${body}`;
    
    try {
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset form
        const form = document.getElementById('adviceForm');
        if (form) {
            form.reset();
        }
        
        // Success message
        alert('Thank you for your advice! Your email client should open now.');
        
    } catch (error) {
        alert('There was an error opening your email client. Please try again.');
        console.error('Email error:', error);
    }
}

// Initialize FAQ functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            // Add click event listener
            question.addEventListener('click', function() {
                toggleFAQ(this);
            });
            
            // Initialize icon
            const icon = question.querySelector('.faq-icon');
            if (icon && !icon.textContent) {
                icon.textContent = '+';
            }
        });
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('navMenu');
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    
    if (navMenu && navbar && !navbar.contains(event.target)) {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
});

// Smooth scroll for anchor links - Simplified
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Simple notification system
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMsg = document.querySelector('.temp-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create message element
    const msgDiv = document.createElement('div');
    msgDiv.className = 'temp-message';
    msgDiv.textContent = message;
    msgDiv.style.cssText = `
        position: fixed;
        top: 70px;
        right: 20px;
        background: ${type === 'error' ? '#ff4444' : '#44ff44'};
        color: #000000;
        padding: 10px 15px;
        border-radius: 4px;
        z-index: 10000;
        font-size: 14px;
        max-width: 300px;
    `;
    
    document.body.appendChild(msgDiv);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (msgDiv.parentNode) {
            msgDiv.remove();
        }
    }, 3000);
}

// Error handling for the entire page
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Prevent form submission errors
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Let the specific form handler deal with submission
            if (this.id === 'adviceForm') {
                e.preventDefault();
                submitAdvice(e);
            }
        });
    });
});

// Simple page ready check
function pageReady() {
    console.log('The Void website loaded successfully');
}

// Call when everything is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', pageReady);
} else {
    pageReady();
}