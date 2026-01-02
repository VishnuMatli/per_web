// ============================================
// CONFIGURATION & CONSTANTS
// ============================================

const APP_CONFIG = {
    student: {
        name: 'Student App',
        version: '2.0.0',
        package: 'com.aiml.permissions',
        downloadUrl: 'https://github.com/YOUR_USERNAME/YOUR_REPO/releases/download/v2.0.0/student-app-v2.0.0.apk',
        features: ['Browse permissions', 'Track status', 'View mentor feedback'],
        fileSize: '56.4 MB'
    },
    faculty: {
        name: 'Faculty App',
        version: '2.0.0',
        package: 'com.aiml.faculty',
        downloadUrl: 'https://github.com/YOUR_USERNAME/YOUR_REPO/releases/download/v2.0.0/faculty-app-v2.0.0.apk',
        features: ['Review permissions', 'Manage mentees', 'Track approvals'],
        fileSize: '52.8 MB'
    },
    hod: {
        name: 'HOD App',
        version: '2.0.0',
        package: 'com.aiml.hod',
        downloadUrl: 'https://github.com/YOUR_USERNAME/YOUR_REPO/releases/download/v2.0.0/hod-app-v2.0.0.apk',
        features: ['Final approval', 'View reports', 'Analytics'],
        fileSize: '48.5 MB'
    }
};

// ============================================
// DOM ELEMENTS
// ============================================

const modal = document.getElementById('downloadModal');
const closeBtn = document.querySelector('.close');
const scrollToAppsBtn = document.querySelector('.cta-btn');

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    setupDownloadButtons();
    setupNavigation();
});

// ============================================
// EVENT LISTENERS
// ============================================

function initializeEventListeners() {
    // Modal close handlers
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Smooth scroll for CTA button
    if (scrollToAppsBtn) {
        scrollToAppsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const appsSection = document.getElementById('apps');
            if (appsSection) {
                appsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ============================================
// NAVIGATION
// ============================================

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                updateActiveNav(link);
            }
        });
    });

    // Update active nav on scroll
    window.addEventListener('scroll', updateNavigationOnScroll);
}

function updateNavigationOnScroll() {
    const sections = document.querySelectorAll('[id]');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

function updateActiveNav(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// ============================================
// DOWNLOAD FUNCTIONALITY
// ============================================

function setupDownloadButtons() {
    const downloadBtns = document.querySelectorAll('[data-app]');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const appType = btn.getAttribute('data-app');
            handleDownload(appType);
        });
    });
}

function handleDownload(appType) {
    const config = APP_CONFIG[appType];
    
    if (!config) {
        console.error('Invalid app type:', appType);
        return;
    }

    // Show modal with instructions
    showDownloadModal(appType, config);
}

function showDownloadModal(appType, config) {
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    if (!modalTitle || !modalContent) {
        console.error('Modal elements not found');
        return;
    }

    const appNames = {
        student: '👨‍🎓 Student App',
        faculty: '👨‍🏫 Faculty App',
        hod: '👔 HOD App'
    };

    modalTitle.textContent = `Download ${appNames[appType] || config.name}`;
    
    const instructions = `
        <div class="download-links">
            <h4>Installation Steps:</h4>
            <ol style="margin-left: 1.5rem; color: var(--text-light);">
                <li>Enable "Unknown Sources" in Settings → Security</li>
                <li>Download the APK file</li>
                <li>Open the downloaded file to install</li>
                <li>Grant necessary permissions when prompted</li>
                <li>Launch the app and login</li>
            </ol>
            
            <div style="background: var(--light); padding: 1rem; border-radius: 8px; margin-top: 1.5rem;">
                <strong>App Details:</strong>
                <p>Version: ${config.version}</p>
                <p>Package: <code style="background: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">${config.package}</code></p>
                <p>Size: ${config.fileSize}</p>
            </div>
        </div>
    `;
    
    modalContent.innerHTML = instructions;
    
    // Add download link button
    const downloadLink = document.createElement('button');
    downloadLink.className = 'modal-btn';
    downloadLink.textContent = '📥 Download APK';
    downloadLink.style.background = getColorForApp(appType);
    downloadLink.addEventListener('click', () => {
        if (config.downloadUrl && config.downloadUrl !== '#') {
            window.open(config.downloadUrl, '_blank');
        } else {
            alert('Download link not available yet. Please check back soon!');
        }
    });
    
    modalContent.appendChild(downloadLink);
    
    // Add close button
    const closeLink = document.createElement('button');
    closeLink.className = 'modal-btn';
    closeLink.textContent = 'Close';
    closeLink.style.background = '#999';
    closeLink.style.marginTop = '0.5rem';
    closeLink.addEventListener('click', closeModal);
    
    modalContent.appendChild(closeLink);
    
    showModal();
}

function getColorForApp(appType) {
    const colors = {
        student: '#6366f1',
        faculty: '#8b5cf6',
        hod: '#ec4899'
    };
    return colors[appType] || '#6366f1';
}

// ============================================
// MODAL FUNCTIONS
// ============================================

function showModal() {
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal() {
    if (modal) {
        modal.style.display = 'none';
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function log(...args) {
    if (process.env.NODE_ENV !== 'production') {
        console.log(...args);
    }
}

// Initialize counter animations when visible
function initializeCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const finalValue = element.textContent;
    const numericValue = parseInt(finalValue.replace(/\D/g, '')) || finalValue;
    const isInfinity = finalValue === '∞';
    
    if (isInfinity) {
        // Animate infinity symbol
        let iteration = 0;
        const interval = setInterval(() => {
            iteration++;
            element.textContent = '✓'.repeat(iteration % 4 + 1) + ' Users';
            if (iteration > 8) clearInterval(interval);
        }, 200);
        return;
    }

    if (typeof numericValue === 'number' && numericValue > 0) {
        let current = 0;
        const increment = Math.ceil(numericValue / 50);
        const interval = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                element.textContent = finalValue;
                clearInterval(interval);
            } else {
                element.textContent = current;
            }
        }, 20);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeCounterAnimation, 500);
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-lazy]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.lazy;
                img.removeAttribute('data-lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// EXPORT FOR TESTING
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleDownload,
        showDownloadModal,
        closeModal,
        showModal,
        APP_CONFIG
    };
}
