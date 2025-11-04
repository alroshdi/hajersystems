// ===== Global Variables =====
let currentLang = 'en';
const githubUsername = 'alroshdi';

// Manual project definitions (fallback if GitHub API fails or for specific projects)
const manualProjects = [
    {
        name: 'TaxAuthorityProject',
        description: 'Tax Authority project - all individual work',
        language: 'JavaScript',
        html_url: 'https://github.com/alroshdi/TaxAuthorityProject'
    },
    {
        name: 'predict_sales_lstm',
        description: 'Sales Forecasting App - LSTM model + Streamlit UI + Upload & Visualization',
        language: 'Python',
        html_url: 'https://github.com/alroshdi/predict_sales_lstm'
    },
    {
        name: 'EcommerceSystem',
        description: 'E-commerce system built with modern technologies',
        language: 'PHP',
        html_url: 'https://github.com/alroshdi/EcommerceSystem'
    }
];

// ===== Language Switching =====
function toggleLanguage() {
    const html = document.documentElement;
    const langText = document.getElementById('langText');
    
    if (currentLang === 'en') {
        currentLang = 'ar';
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
        langText.textContent = 'English';
    } else {
        currentLang = 'en';
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        langText.textContent = 'العربية';
    }
    
    // Update all text elements
    updateLanguage();
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-en][data-ar]');
    elements.forEach(element => {
        element.textContent = currentLang === 'en' ? 
            element.getAttribute('data-en') : 
            element.getAttribute('data-ar');
    });
}

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// ===== Smooth Scrolling for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const navbar = document.getElementById('navbar');
            const navHeight = navbar ? navbar.offsetHeight : 70;
            
            // Calculate target position with proper offset
            const targetRect = target.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetPosition = scrollTop + targetRect.top - navHeight - 20; // Extra 20px padding
            
            // Stop any ongoing scroll animations by canceling smooth scroll
            if ('scrollBehavior' in document.documentElement.style) {
                document.documentElement.style.scrollBehavior = 'auto';
            }
            
            // Scroll immediately to cancel any ongoing animation
            window.scrollTo(0, window.pageYOffset);
            
            // Restore smooth scroll and animate to target
            setTimeout(() => {
                if ('scrollBehavior' in document.documentElement.style) {
                    document.documentElement.style.scrollBehavior = 'smooth';
                }
                window.scrollTo({
                    top: Math.max(0, targetPosition), // Ensure positive value
                    behavior: 'smooth'
                });
            }, 50);
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
});

// ===== Navbar Background on Scroll =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// ===== Scroll Reveal Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all slide-up elements
document.addEventListener('DOMContentLoaded', () => {
    const slideUpElements = document.querySelectorAll('.slide-up');
    slideUpElements.forEach(el => observer.observe(el));
});

// ===== Fetch GitHub Repositories =====
async function fetchGitHubRepos(username) {
    const projectsGrid = document.getElementById('projectsGrid');
    
    // Repositories to exclude
    const excludedRepos = ['hajeralroshdi.github.io', 'ai_workshop_app'];
    // Repositories to prioritize (always include if available)
    const prioritizedRepos = ['TaxAuthorityProject', 'predict_sales_lstm'];
    const maxProjects = 3;
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        
        const repos = await response.json();
        projectsGrid.innerHTML = '';
        
        // Separate prioritized and regular repositories
        const prioritizedProjects = [];
        const regularProjects = [];
        
        // First, try to find prioritized repos from GitHub
        repos.forEach(repo => {
            // Skip if repository is a fork or in excluded list
            if (repo.fork || excludedRepos.includes(repo.name)) {
                return;
            }
            
            // Prioritized repos can be included even without description
            if (prioritizedRepos.includes(repo.name)) {
                // Add fallback description if missing
                if (!repo.description) {
                    repo.description = 'A project showcasing technical skills and implementation.';
                }
                prioritizedProjects.push(repo);
            } else {
                // Regular repos need a description
                if (repo.description) {
                    regularProjects.push(repo);
                }
            }
        });
        
        // Add manual projects for prioritized repos that weren't found in GitHub API
        prioritizedRepos.forEach(repoName => {
            const foundInGitHub = prioritizedProjects.some(r => r.name === repoName);
            if (!foundInGitHub) {
                const manualProject = manualProjects.find(p => p.name === repoName);
                if (manualProject) {
                    prioritizedProjects.push(manualProject);
                }
            }
        });
        
        // Combine: prioritized first, then regular projects
        const selectedProjects = [...prioritizedProjects, ...regularProjects].slice(0, maxProjects);
        
        // If we don't have enough projects, add from manual list
        if (selectedProjects.length < maxProjects) {
            manualProjects.forEach(manualProject => {
                if (selectedProjects.length >= maxProjects) return;
                const alreadyAdded = selectedProjects.some(p => p.name === manualProject.name);
                if (!alreadyAdded) {
                    selectedProjects.push(manualProject);
                }
            });
        }
        
        // If still no projects, use manual projects as fallback
        if (selectedProjects.length === 0 && repos.length === 0) {
            manualProjects.slice(0, maxProjects).forEach(manualProject => {
                selectedProjects.push(manualProject);
            });
        }
        
        // Create project cards
        selectedProjects.forEach(repo => {
            const projectCard = createProjectCard(repo);
            projectsGrid.appendChild(projectCard);
        });
        
        // Observe new project cards for animation
        const projectCards = projectsGrid.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            observer.observe(card);
        });
        
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        
        // Use manual projects as fallback on error
        projectsGrid.innerHTML = '';
        const fallbackProjects = manualProjects.slice(0, maxProjects);
        
        if (fallbackProjects.length > 0) {
            fallbackProjects.forEach(project => {
                const projectCard = createProjectCard(project);
                projectsGrid.appendChild(projectCard);
            });
            
            // Observe project cards for animation
            const projectCards = projectsGrid.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                observer.observe(card);
            });
        } else {
            projectsGrid.innerHTML = `
                <div class="loading" data-en="Failed to load projects. Please try again later." data-ar="فشل تحميل المشاريع. يرجى المحاولة مرة أخرى لاحقاً.">Failed to load projects. Please try again later.</div>
            `;
            updateLanguage();
        }
    }
}

// ===== Create Project Card =====
function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Get language color
    const languageColors = {
        'Python': '#3776ab',
        'JavaScript': '#f1e05a',
        'Java': '#b07219',
        'C#': '#239120',
        'PHP': '#4F نسَخَ1',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Jupyter Notebook': '#DA5B0B'
    };
    
    const langColor = languageColors[repo.language] || '#87CEEB';
    
    card.innerHTML = `
        <div class="project-header" style="background: linear-gradient(135deg, ${langColor}, #E6E6FA);">
            <i class="fas fa-project-diagram"></i>
            <h3>${repo.name}</h3>
        </div>
        <div class="project-body">
            <p>${repo.description || 'No description available'}</p>
        </div>
        <div class="project-footer">
            <a href="${repo.html_url}" target="_blank" data-en="View on GitHub" data-ar="عرض على جيت هاب">
                View on GitHub <i class="fas fa-external-link-alt"></i>
            </a>
            ${repo.language ? `<span class="project-language"><i class="fas fa-circle" style="color: ${langColor}; font-size: 0.7rem;"></i> ${repo.language}</span>` : ''}
        </div>
    `;
    
    // Add hover effect to card
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    return card;
}

// ===== Skill Progress Bars Animation =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, Math.random() * 300);
    });
}

// ===== Initialize on Page Load =====
document.addEventListener('DOMContentLoaded', () => {
    // Fetch GitHub repositories
    fetchGitHubRepos(githubUsername);
    
    // Animate skill bars after a delay
    setTimeout(animateSkillBars, 500);
    
    // Update language for loading message
    updateLanguage();
    
    // Check for stored success message on page load
    const formStatus = document.getElementById('formStatus');
    const storedSuccessMessage = localStorage.getItem('formSubmitSuccess');
    if (storedSuccessMessage && formStatus) {
        // Update message based on current language
        const message = currentLang === 'en'
            ? 'Message sent successfully to Hajer Systems!'
            : 'تم إرسال الرسالة بنجاح إلى Hajer Systems!';
        formStatus.className = 'form-status success';
        formStatus.innerHTML = `
            <i class="fas fa-check-circle"></i> ${message}
            <button class="dismiss-btn" onclick="dismissSuccessMessage()" aria-label="Dismiss">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Don't scroll - just show the message where it is
        // The message will appear in place without moving the page
    }
    
    // Add scroll event for parallax effect on hero section
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroBg = document.querySelector('.hero-bg');
        
        if (hero && heroBg && currentScroll < hero.offsetHeight) {
            const parallaxSpeed = 0.5;
            heroBg.style.transform = `translateY(${currentScroll * parallaxSpeed}px)`;
            
            // Fade out hero text as user scrolls
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                const opacity = 1 - (currentScroll / hero.offsetHeight);
                heroContent.style.opacity = opacity > 0 ? opacity : 0;
            }
        }
        
        lastScroll = currentScroll;
    });
    
    // Add typing effect to hero text (optional)
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const text = currentLang === 'en' ? heroTitle.getAttribute('data-en') : heroTitle.getAttribute('data-ar');
        heroTitle.textContent = '';
        
        let i = 0;
        const typeText = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeText, 100);
            }
        };
        
        // Start typing effect after a brief delay
        setTimeout(typeText, 500);
    }
});

// ===== Update contact email and phone from CV =====
// This would typically be updated with actual information from the CV
// For now, using placeholders
document.addEventListener('DOMContentLoaded', () => {
    const emailLink = document.querySelector('.contact-item a[href^="mailto"]');
    const phoneLink = document.querySelector('.contact-item a[href^="tel"]');
    
    // Replace with actual email and phone if available
    if (emailLink) {
        // emailLink.href = 'mailto:actual.email@example.com';
    }
    
    if (phoneLink) {
        // phoneLink.href = 'tel:+968XXXXXXXXX';
    }
});

// ===== Smooth reveal for sections =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.pageYOffset + window.innerHeight;
        
        if (scrollPosition > sectionTop + sectionHeight / 3) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// ===== Add active state to navigation links on scroll =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Add CSS for active navigation link =====
const style = document.createElement('style');
style.textContent = `
    .nav-menu li a.active {
        color: var(--primary-pink);
    }
`;
document.head.appendChild(style);

console.log('Portfolio website loaded successfully! 🚀');

// ===== Auto-resize Textarea =====
(function() {
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        messageTextarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 300) + 'px';
        });
    }
})();

// ===== Attachment Handler =====
(function() {
    const attachmentInput = document.getElementById('attachment');
    const attachmentList = document.getElementById('attachment-list');
    window.attachedFiles = [];
    
    if (attachmentInput && attachmentList) {
        attachmentInput.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            
            files.forEach(file => {
                if (window.attachedFiles.length < 5) { // Limit to 5 files
                    // Check if file already exists
                    const exists = window.attachedFiles.some(f => f.name === file.name && f.size === file.size);
                    if (!exists) {
                        window.attachedFiles.push(file);
                        const attachmentItem = document.createElement('div');
                        attachmentItem.className = 'attachment-item';
                        attachmentItem.innerHTML = `
                            <i class="fas fa-file"></i>
                            <span>${file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name}</span>
                            <span class="remove-attachment" data-filename="${file.name}">×</span>
                        `;
                        attachmentList.appendChild(attachmentItem);
                        
                        // Remove attachment handler
                        const removeBtn = attachmentItem.querySelector('.remove-attachment');
                        removeBtn.addEventListener('click', function() {
                            const filename = this.getAttribute('data-filename');
                            window.attachedFiles = window.attachedFiles.filter(f => f.name !== filename);
                            attachmentItem.remove();
                            updateFileInput();
                        });
                    }
                } else {
                    alert('Maximum 5 files allowed');
                }
            });
            
            updateFileInput();
        });
        
        function updateFileInput() {
            const dataTransfer = new DataTransfer();
            window.attachedFiles.forEach(file => {
                dataTransfer.items.add(file);
            });
            attachmentInput.files = dataTransfer.files;
            
            // Ensure the input is properly set for form submission
            if (window.attachedFiles.length > 0) {
                attachmentInput.setAttribute('multiple', 'multiple');
            }
        }
        
        // Expose updateFileInput for form submission
        window.updateAttachmentInput = updateFileInput;
    }
})();

// ===== Contact Form with FormSubmit (Works Immediately) =====
(function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    
    if (contactForm) {
        // Set form action to FormSubmit (works without any setup)
        contactForm.action = 'https://formsubmit.co/hajeralroshdi@gmail.com';
        contactForm.method = 'POST';
        contactForm.enctype = 'multipart/form-data';
        
        // Add hidden fields for FormSubmit
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = '_subject';
        hiddenInput.value = 'New Contact Form Message from Portfolio';
        contactForm.appendChild(hiddenInput);
        
        const hiddenInput2 = document.createElement('input');
        hiddenInput2.type = 'hidden';
        hiddenInput2.name = '_captcha';
        hiddenInput2.value = 'false';
        contactForm.appendChild(hiddenInput2);
        
        const hiddenInput3 = document.createElement('input');
        hiddenInput3.type = 'hidden';
        hiddenInput3.name = '_next';
        hiddenInput3.value = window.location.href + '?success=true';
        contactForm.appendChild(hiddenInput3);
        
        contactForm.addEventListener('submit', function(e) {
            // Ensure attachments are properly set before submission
            if (window.updateAttachmentInput) {
                window.updateAttachmentInput();
            }
            
            // Verify form has enctype for file uploads
            if (!contactForm.enctype || contactForm.enctype !== 'multipart/form-data') {
                contactForm.enctype = 'multipart/form-data';
            }
            
            // Save current scroll position
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            sessionStorage.setItem('contactFormScrollPos', scrollPosition);
            
            // Show sending status
            formStatus.className = 'form-status sending';
            formStatus.innerHTML = currentLang === 'en' 
                ? '<i class="fas fa-spinner fa-spin"></i> Sending your message...'
                : '<i class="fas fa-spinner fa-spin"></i> جاري إرسال رسالتك...';
            submitBtn.disabled = true;
            
            // Form will submit normally to FormSubmit
            // Success message will be shown after redirect
        });
        
        // Check if form was submitted successfully (redirected back)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
            const successMessage = currentLang === 'en'
                ? 'Message sent successfully to Hajer Systems!'
                : 'تم إرسال الرسالة بنجاح إلى Hajer Systems!';
            
            // Store in localStorage
            localStorage.setItem('formSubmitSuccess', successMessage);
            
            // Clean URL without scrolling
            window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
            
            // Restore scroll position
            setTimeout(() => {
                const savedScrollPos = sessionStorage.getItem('contactFormScrollPos');
                if (savedScrollPos) {
                    window.scrollTo({
                        top: parseInt(savedScrollPos),
                        behavior: 'auto'
                    });
                    sessionStorage.removeItem('contactFormScrollPos');
                }
            }, 100);
        }
        
        // Check localStorage on page load for success message
        const storedSuccessMessage = localStorage.getItem('formSubmitSuccess');
        if (storedSuccessMessage && formStatus) {
            displaySuccessMessage(storedSuccessMessage);
        }
        
        // Function to display success message with dismiss button
        function displaySuccessMessage(message) {
            formStatus.className = 'form-status success';
            formStatus.innerHTML = `
                <i class="fas fa-check-circle"></i> ${message}
                <button class="dismiss-btn" onclick="dismissSuccessMessage()" aria-label="Dismiss">
                    <i class="fas fa-times"></i>
                </button>
            `;
        }
        
        // Make dismiss function globally accessible
        window.dismissSuccessMessage = function() {
            if (formStatus) {
                formStatus.className = 'form-status';
                formStatus.innerHTML = '';
            }
            localStorage.removeItem('formSubmitSuccess');
        };
    }
})();

/* ===== Alternative: EmailJS Setup (Uncomment and configure if you prefer EmailJS) =====
(function() {
    // Initialize EmailJS
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS Public Key
    
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                to_email: 'hajeralroshdi@gmail.com'
            };
            
            formStatus.className = 'form-status sending';
            formStatus.innerHTML = currentLang === 'en' 
                ? '<i class="fas fa-spinner fa-spin"></i> Sending your message...'
                : '<i class="fas fa-spinner fa-spin"></i> جاري إرسال رسالتك...';
            submitBtn.disabled = true;
            
            try {
                const response = await emailjs.send(
                    'YOUR_SERVICE_ID',
                    'YOUR_TEMPLATE_ID',
                    {
                        from_name: formData.from_name,
                        from_email: formData.from_email,
                        subject: formData.subject,
                        message: formData.message,
                        to_email: formData.to_email
                    }
                );
                
                formStatus.className = 'form-status success';
                formStatus.innerHTML = currentLang === 'en'
                    ? '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.'
                    : '<i class="fas fa-check-circle"></i> تم إرسال الرسالة بنجاح! سأتواصل معك قريباً.';
                
                contactForm.reset();
                
                setTimeout(() => {
                    formStatus.className = 'form-status';
                    formStatus.innerHTML = '';
                }, 5000);
                
            } catch (error) {
                console.error('EmailJS Error:', error);
                formStatus.className = 'form-status error';
                formStatus.innerHTML = currentLang === 'en'
                    ? '<i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again or email me directly.'
                    : '<i class="fas fa-exclamation-circle"></i> فشل إرسال الرسالة. يرجى المحاولة مرة أخرى أو التواصل معي مباشرة.';
            } finally {
                submitBtn.disabled = false;
            }
        });
    }
})();
*/

