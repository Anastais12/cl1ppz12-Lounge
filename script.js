// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Animated Counter Function
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-target]');

        const observerOptions = {
            threshold: 0.7
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current).toLocaleString();
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target.toLocaleString();
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Navbar scroll effect
    function initNavbarEffects() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // Add/remove background opacity based on scroll
            if (currentScrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            } else {
                navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            }

            lastScrollY = currentScrollY;
        });
    }

    // Mobile menu toggle
    function initMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', () => {
                navLinks.classList.toggle('mobile-open');
                mobileToggle.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            const navLinkItems = navLinks.querySelectorAll('.nav-link');
            navLinkItems.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('mobile-open');
                    mobileToggle.classList.remove('active');
                });
            });
        }
    }

    // Fade in animation for elements
    function initFadeInAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Add fade-in effect to sections
        const fadeElements = document.querySelectorAll('.feature-card, .stat-card, .channel-category, .testimonial-card, .faq-item');
        fadeElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(element);
        });
    }

    // Parallax effect for gradient orbs
    function initParallaxEffect() {
        const orbs = document.querySelectorAll('.gradient-orb');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            orbs.forEach((orb, index) => {
                const multiplier = (index + 1) * 0.3;
                orb.style.transform = `translateY(${rate * multiplier}px) rotate(${scrolled * 0.1}deg)`;
            });
        });
    }

    // FAQ accordion functionality
    function initFaqAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            if (question && answer) {
                // Set initial state
                answer.style.maxHeight = 'none';
                answer.style.opacity = '1';

                // Add click listener for future enhancement
                question.addEventListener('click', () => {
                    // For now, just add a visual feedback
                    item.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        item.style.transform = 'scale(1)';
                    }, 150);
                });
            }
        });
    }

    // Add loading animation to buttons
    function initButtonEffects() {
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

        // Add ripple animation
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
    }

    // Typing effect for hero description
    function initTypingEffect() {
        const heroDescription = document.querySelector('.hero-description');

        if (heroDescription) {
            const text = heroDescription.textContent;
            heroDescription.textContent = '';

            let index = 0;
            const typeWriter = () => {
                if (index < text.length) {
                    heroDescription.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 30);
                }
            };

            // Start typing effect after a short delay
            setTimeout(typeWriter, 1000);
        }
    }

    // Theme Toggle Functionality
    function initThemeToggle() {
        const themeToggleBtn = document.querySelector('.theme-toggle-btn');
        const themeIcon = document.querySelector('.theme-icon');
        const root = document.documentElement;

        // Check for saved theme preference or default to 'dark'
        const savedTheme = localStorage.getItem('theme') || 'dark';
        root.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                const currentTheme = root.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

                root.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateThemeIcon(newTheme);

                // Add a smooth transition effect
                themeToggleBtn.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    themeToggleBtn.style.transform = 'scale(1)';
                }, 150);
            });
        }

        function updateThemeIcon(theme) {
            if (themeIcon) {
                themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
            }
        }
    }

    // Enhanced Discord Status Updates
    function initDiscordStatus() {
        const statusDot = document.querySelector('.status-dot');
        const memberCountElement = document.querySelector('.member-count');

        // Simulate real-time Discord activity
        function updateDiscordStatus() {
            if (memberCountElement) {
                const baseCount = 186;
                const variation = Math.floor(Math.random() * 20) - 10; // ±10
                const newCount = Math.max(150, Math.min(220, baseCount + variation));
                memberCountElement.textContent = `${newCount} online`;
            }

            // Occasionally change status indicator
            if (statusDot && Math.random() > 0.9) {
                statusDot.style.background = '#fbbf24'; // Yellow for away
                setTimeout(() => {
                    statusDot.style.background = 'var(--discord-green)';
                }, 2000);
            }
        }

        // Update every 15 seconds
        setInterval(updateDiscordStatus, 15000);

        // Initial call
        updateDiscordStatus();
    }

    // Team member hover effects
    function initTeamEffects() {
        const teamMembers = document.querySelectorAll('.team-member');

        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', () => {
                const statusBadge = member.querySelector('.status-badge');
                if (statusBadge) {
                    statusBadge.style.transform = 'scale(1.2) rotate(10deg)';
                }
            });

            member.addEventListener('mouseleave', () => {
                const statusBadge = member.querySelector('.status-badge');
                if (statusBadge) {
                    statusBadge.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }

    // Initialize all features
    initThemeToggle();
    initDiscordStatus();
    initTeamEffects();
    animateCounters();
    initSmoothScrolling();
    initNavbarEffects();
    initMobileMenu();
    initFadeInAnimations();
    initParallaxEffect();
    initFaqAccordion();
    initButtonEffects();
    initTypingEffect();

    // Add some extra interactivity

    // Random stats updates to simulate live activity
    function simulateLiveStats() {
        const onlineCounter = document.querySelector('.stat-card .stat-number[data-target="186"]');
        const messagesCounter = document.querySelector('.stat-card .stat-number[data-target="15420"]');

        setInterval(() => {
            if (onlineCounter) {
                const currentValue = parseInt(onlineCounter.textContent.replace(/,/g, ''));
                const variation = Math.floor(Math.random() * 10) - 5; // ±5
                const newValue = Math.max(180, Math.min(200, currentValue + variation));
                onlineCounter.textContent = newValue.toLocaleString();
            }

            if (messagesCounter) {
                const currentValue = parseInt(messagesCounter.textContent.replace(/,/g, ''));
                const variation = Math.floor(Math.random() * 50) + 10; // +10 to +60
                const newValue = currentValue + variation;
                messagesCounter.textContent = newValue.toLocaleString();
            }
        }, 30000); // Update every 30 seconds
    }

    // Start live stats simulation
    setTimeout(simulateLiveStats, 5000); // Start after 5 seconds

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }

        if (konamiCode.length === konamiSequence.length &&
            konamiCode.every((key, index) => key === konamiSequence[index])) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s infinite';

            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);

            setTimeout(() => {
                document.body.style.animation = '';
                style.remove();
            }, 10000);

            konamiCode = [];
        }
    });

});
