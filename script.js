// ===== Global Variables =====
let currentLang = 'en';
const githubUsername = 'alroshdi92';

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
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
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
        
        if (repos.length === 0) {
            projectsGrid.innerHTML = `
                <div class="loading">No projects found</div>
            `;
            return;
        }
        
        projectsGrid.innerHTML = '';
        
        // Separate prioritized and regular repositories
        const prioritizedProjects = [];
        const regularProjects = [];
        
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
        
        // Combine: prioritized first, then regular projects
        const selectedProjects = [...prioritizedProjects, ...regularProjects].slice(0, maxProjects);
        
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
        projectsGrid.innerHTML = `
            <div class="loading" data-en="Failed to load projects. Please try again later." data-ar="فشل تحميل المشاريع. يرجى المحاولة مرة أخرى لاحقاً.">Failed to load projects. Please try again later.</div>
        `;
        updateLanguage();
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

