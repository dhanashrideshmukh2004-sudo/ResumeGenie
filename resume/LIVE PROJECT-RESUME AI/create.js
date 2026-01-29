// Account Creation Success Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add click animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Confetti effect on page load
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1001;
        `;

        document.body.appendChild(confettiContainer);

        // Create confetti pieces
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${['#2563eb', '#7c3aed', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                border-radius: 50%;
                animation: fall ${Math.random() * 3 + 2}s linear forwards;
            `;

            confettiContainer.appendChild(confetti);
        }

        // Add falling animation
        const fallStyle = document.createElement('style');
        fallStyle.textContent = `
            @keyframes fall {
                to {
                    top: 100vh;
                    transform: rotate(${Math.random() * 360}deg);
                }
            }
        `;
        document.head.appendChild(fallStyle);

        // Remove confetti after animation
        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
    }

    // Trigger confetti after a short delay
    setTimeout(createConfetti, 500);

    // Add hover effects to benefits list
    const benefitsList = document.querySelectorAll('.benefits-list li');
    benefitsList.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';

        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 1000 + (index * 100));
    });

    // Add typing effect to the success message
    const successMessage = document.querySelector('.success-message');
    const originalText = successMessage.textContent;
    successMessage.textContent = '';

    function typeWriter(text, element, speed = 50) {
        let i = 0;
        element.style.borderRight = '2px solid #2563eb';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 500);
            }
        }

        setTimeout(type, 800);
    }

    typeWriter(originalText, successMessage);

    // Add click tracking for analytics (placeholder)
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            console.log(`User clicked: ${buttonText}`);

            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add smooth scroll for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.success-card').forEach(el => {
        observer.observe(el);
    });

    // Add CSS for additional animations
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .animate-in {
            animation: slideInUp 0.8s ease forwards;
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .success-card {
            opacity: 0;
            transform: translateY(50px);
        }
    `;
    document.head.appendChild(animationStyle);

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && document.activeElement.classList.contains('btn')) {
            document.activeElement.click();
        }
    });

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll('.btn, .benefits-list li');
    focusableElements.forEach(element => {
        element.setAttribute('tabindex', '0');
    });
});

// Add window resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Adjust any dynamic sizing if needed
    const successCard = document.querySelector('.success-card');
    if (window.innerWidth <= 480) {
        successCard.style.padding = '1.5rem 1rem';
    } else if (window.innerWidth <= 768) {
        successCard.style.padding = '2rem 1.5rem';
    } else {
        successCard.style.padding = '3rem';
    }
});
