// Mobile Navigation Toggle and Theme Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // User Account Elements
    const userProfile = document.getElementById('userProfile');
    const userDropdown = document.getElementById('userDropdown');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    // Theme Toggle Functionality
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');

        // Update theme icon
        if (savedTheme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    function toggleTheme() {
        const isDark = document.body.classList.toggle('dark-mode');
        const newTheme = isDark ? 'dark' : 'light';

        // Update icon
        if (isDark) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }

        // Save theme preference
        localStorage.setItem('theme', newTheme);

        // Add animation effect
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    }

    // Initialize theme on page load
    initializeTheme();

    // Theme toggle event listener
    themeToggle.addEventListener('click', toggleTheme);

    // User Account Dropdown Functionality
    function toggleUserDropdown() {
        userDropdown.classList.toggle('show');

        // Update dropdown icon
        const dropdownIcon = userProfile.querySelector('.user-dropdown-icon');
        if (userDropdown.classList.contains('show')) {
            dropdownIcon.style.transform = 'rotate(180deg)';
        } else {
            dropdownIcon.style.transform = 'rotate(0deg)';
        }
    }

    // User profile click handler
    userProfile.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleUserDropdown();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!userProfile.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove('show');
            const dropdownIcon = userProfile.querySelector('.user-dropdown-icon');
            dropdownIcon.style.transform = 'rotate(0deg)';
        }
    });

    // Dropdown item click handlers
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            const action = this.getAttribute('href').substring(1); // Remove #

            switch(action) {
                case 'profile':
                    showNotification('Opening profile...', 'info');
                    // Add profile functionality here
                    break;
                case 'settings':
                    showNotification('Opening settings...', 'info');
                    // Add settings functionality here
                    break;
                case 'resumes':
                    showNotification('Loading your resumes...', 'info');
                    // Add resumes functionality here
                    break;
                case 'templates':
                    showNotification('Loading templates...', 'info');
                    // Add templates functionality here
                    break;
                case 'help':
                    showNotification('Opening help center...', 'info');
                    // Add help functionality here
                    break;
                case 'logout':
                    handleLogout();
                    break;
                default:
                    console.log('Unknown action:', action);
            }

            // Close dropdown
            userDropdown.classList.remove('show');
            const dropdownIcon = userProfile.querySelector('.user-dropdown-icon');
            dropdownIcon.style.transform = 'rotate(0deg)';
        });
    });

    // Handle logout
    function handleLogout() {
        showNotification('Signing you out...', 'warning');

        setTimeout(() => {
            // Clear user session
            localStorage.removeItem('user');
            localStorage.removeItem('theme');

            // Redirect to sign in page
            window.location.href = 'sign.html';
        }, 1500);
    }

    // Show notification function
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            z-index: 1002;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-size: 0.9rem;
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    function getNotificationIcon(type) {
        switch(type) {
            case 'success': return 'check-circle';
            case 'warning': return 'exclamation-triangle';
            case 'error': return 'times-circle';
            default: return 'info-circle';
        }
    }

    function getNotificationColor(type) {
        switch(type) {
            case 'success': return 'linear-gradient(135deg, #10b981, #059669)';
            case 'warning': return 'linear-gradient(135deg, #f59e0b, #d97706)';
            case 'error': return 'linear-gradient(135deg, #ef4444, #dc2626)';
            default: return 'linear-gradient(135deg, #2563eb, #1d4ed8)';
        }
    }

    // Mobile Navigation Toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = navToggle.contains(event.target);

        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Header scroll effect with responsive adjustments
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.style.background = document.body.classList.contains('dark-mode')
                ? 'rgba(15, 23, 42, 0.98)'
                : 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = document.body.classList.contains('dark-mode')
                ? 'rgba(15, 23, 42, 0.95)'
                : 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for anchor links
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

    // Add loading animation with responsive delays
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';

        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
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
    document.querySelectorAll('.hero-visual').forEach(el => {
        observer.observe(el);
    });

    // Keyboard navigation for theme toggle
    themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    });

    // Keyboard navigation for user profile
    userProfile.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleUserDropdown();
        }
    });

    // Add ripple effect to theme toggle
    themeToggle.addEventListener('click', function(e) {
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
            background: ${document.body.classList.contains('dark-mode') ? 'rgba(96, 165, 250, 0.3)' : 'rgba(37, 99, 235, 0.3)'};
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

    // Responsive navigation adjustments
    function handleResize() {
        const width = window.innerWidth;

        if (width > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }

        // Adjust hero section for very small screens
        const hero = document.querySelector('.hero');
        if (width <= 480) {
            hero.style.minHeight = 'calc(100vh - 60px)';
        } else if (width <= 768) {
            hero.style.minHeight = 'calc(100vh - 70px)';
        } else {
            hero.style.minHeight = 'calc(100vh - 70px)';
        }

        // Close dropdown on mobile
        if (width <= 768 && userDropdown.classList.contains('show')) {
            userDropdown.classList.remove('show');
            const dropdownIcon = userProfile.querySelector('.user-dropdown-icon');
            dropdownIcon.style.transform = 'rotate(0deg)';
        }
    }

    // Handle window resize
    window.addEventListener('resize', handleResize);
    handleResize(); // Call on initial load

    // Touch device optimizations
    if ('ontouchstart' in window) {
        // Add touch feedback for buttons
        const buttons = document.querySelectorAll('.btn, .theme-toggle, .user-profile');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });

            button.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    // Performance optimization: Throttle scroll events
    let ticking = false;

    function updateScrollEffects() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.style.background = document.body.classList.contains('dark-mode')
                ? 'rgba(15, 23, 42, 0.98)'
                : 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = document.body.classList.contains('dark-mode')
                ? 'rgba(15, 23, 42, 0.95)'
                : 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        ticking = false;
    }

    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    // Replace the scroll event listener with throttled version
    window.removeEventListener('scroll', header.scrollHandler);
    window.addEventListener('scroll', requestScrollUpdate);

    // Add orientation change handler
    window.addEventListener('orientationchange', function() {
        setTimeout(handleResize, 100);
    });

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll('.btn, .nav-link, .theme-toggle, .user-profile');
    focusableElements.forEach(element => {
        element.setAttribute('tabindex', '0');
    });

    // Add ARIA labels for screen readers
    navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    navToggle.setAttribute('aria-expanded', 'false');

    navToggle.addEventListener('click', function() {
        const isExpanded = navMenu.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded.toString());
    });

    // User profile ARIA attributes
    userProfile.setAttribute('aria-label', 'User account menu');
    userProfile.setAttribute('aria-expanded', 'false');
    userProfile.setAttribute('aria-haspopup', 'true');

    userProfile.addEventListener('click', function() {
        const isExpanded = userDropdown.classList.contains('show');
        this.setAttribute('aria-expanded', isExpanded.toString());
    });

    // Initialize user data from localStorage if available
    function initializeUserData() {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                const userNameElement = document.querySelector('.user-name');
                const dropdownUserName = document.querySelector('.dropdown-user-details h4');
                const dropdownUserEmail = document.querySelector('.dropdown-user-details p');

                if (userNameElement) userNameElement.textContent = user.name || 'John Doe';
                if (dropdownUserName) dropdownUserName.textContent = user.name || 'John Doe';
                if (dropdownUserEmail) dropdownUserEmail.textContent = user.email || 'john.doe@example.com';
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }

    // Initialize user data
    initializeUserData();

    console.log('AI Resume Builder - Home page loaded successfully!');
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInRight 0.8s ease forwards;
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .hero-visual {
        opacity: 0;
        transform: translateX(50px);
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(style);
