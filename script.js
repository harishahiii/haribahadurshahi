document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after 2 seconds (simulate loading)
    setTimeout(function() {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 2000);
    
    // Initialize 3D background
    init3DBackground();
    
    // Initialize animations
    initAnimations();
    
    // Initialize gallery
    initGallery();
    
    // Initialize documents
    initDocuments();
    
    // Initialize admin panel functionality
    initAdminPanel();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize form submissions
    initForms();
});

function init3DBackground() {
    const canvas = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--primary')),
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 3;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function initAnimations() {
    // Animate title
    gsap.from('.animated-title', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });
    
    gsap.from('.animated-subtitle', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.social-links a', {
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        delay: 0.6,
        ease: 'back.out'
    });
    
    gsap.from('.profile-image', {
        duration: 1.5,
        scale: 0.8,
        opacity: 0,
        delay: 0.3,
        ease: 'elastic.out(1, 0.5)'
    });
    
    gsap.to('.image-border-animation', {
        duration: 2,
        rotation: 360,
        repeat: -1,
        ease: 'linear'
    });
    
    // Scroll animations
    gsap.utils.toArray('.section').forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            onEnter: () => {
                section.classList.add('active');
                gsap.from(section.querySelectorAll('h2, h3, p, .section-divider'), {
                    duration: 1,
                    y: 50,
                    opacity: 0,
                    stagger: 0.1,
                    ease: 'power3.out'
                });
            }
        });
    });
    
    // Animate skill bars
    ScrollTrigger.create({
        trigger: '.skill-bars',
        start: 'top 80%',
        onEnter: () => {
            document.querySelectorAll('.skill-progress').forEach(progress => {
                const width = progress.getAttribute('data-width');
                gsap.to(progress.querySelector('.progress-bar'), {
                    duration: 1.5,
                    width: width,
                    ease: 'power3.out'
                });
            });
        }
    });
    
    // Animate stat numbers
    ScrollTrigger.create({
        trigger: '.profile-stats',
        start: 'top 80%',
        onEnter: () => {
            document.querySelectorAll('.stat-number').forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2;
                const start = 0;
                const increment = target / (duration * 60);
                
                let current = start;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        clearInterval(timer);
                        current = target;
                    }
                    stat.textContent = Math.floor(current);
                }, 1000 / 60);
            });
        }
    });
}

function initGallery() {
    // Sample gallery data (in a real app, this would come from a server)
    const galleryData = [
        { id: 1, type: 'photos', title: 'Nature Photo', description: 'Beautiful nature landscape', url: 'https://via.placeholder.com/800x600', thumbnail: 'https://via.placeholder.com/300x200' },
        { id: 2, type: 'photos', title: 'City View', description: 'Skyline at night', url: 'https://via.placeholder.com/800x600/333', thumbnail: 'https://via.placeholder.com/300x200/333' },
        { id: 3, type: 'videos', title: 'Travel Video', description: 'My recent travel adventure', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', thumbnail: 'https://via.placeholder.com/300x200/555' },
        { id: 4, type: 'photos', title: 'Portrait', description: 'Professional portrait shot', url: 'https://via.placeholder.com/600x800', thumbnail: 'https://via.placeholder.com/200x300' },
        { id: 5, type: 'videos', title: 'Tutorial', description: 'How to use this website', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', thumbnail: 'https://via.placeholder.com/300x200/777' },
        { id: 6, type: 'photos', title: 'Product Shot', description: 'Latest product design', url: 'https://via.placeholder.com/800x600/999', thumbnail: 'https://via.placeholder.com/300x200/999' }
    ];
    
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Render gallery items
    function renderGallery(items) {
        galleryGrid.innerHTML = '';
        
        items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${item.type}`;
            galleryItem.setAttribute('data-id', item.id);
            
            galleryItem.innerHTML = `
                <div class="gallery-item-inner">
                    ${item.type === 'photos' ? 
                        `<img src="${item.thumbnail}" alt="${item.title}">` : 
                        `<video src="${item.url}" poster="${item.thumbnail}"></video>`}
                    <div class="gallery-item-overlay">
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                        <i class="fas fa-search-plus"></i>
                    </div>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
            
            // Add click event to open media viewer
            galleryItem.addEventListener('click', () => openMediaViewer(item));
        });
        
        // Initialize hover effects
        gsap.set('.gallery-item-overlay', { y: '100%' });
        
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item.querySelector('.gallery-item-overlay'), {
                    y: '0%',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(item.querySelector('.gallery-item-overlay'), {
                    y: '100%',
                    duration: 0.3,
                    ease: 'power2.in'
                });
            });
        });
    }
    
    // Filter gallery items
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const filteredItems = filter === 'all' ? 
                galleryData : 
                galleryData.filter(item => item.type === filter);
            
            renderGallery(filteredItems);
        });
    });
    
    // Initial render
    renderGallery(galleryData);
}

function initDocuments() {
    // Sample documents data (in a real app, this would come from a server)
    const documentsData = [
        { id: 1, title: 'Resume', description: 'My professional resume', url: 'https://example.com/sample.pdf', date: '2023-05-15' },
        { id: 2, title: 'Portfolio', description: 'Collection of my works', url: 'https://example.com/portfolio.pdf', date: '2023-06-20' },
        { id: 3, title: 'Certification', description: 'Professional certification', url: 'https://example.com/certificate.pdf', date: '2023-04-10' }
    ];
    
    const documentsList = document.querySelector('.documents-list');
    
    // Render documents
    function renderDocuments() {
        documentsList.innerHTML = '';
        
        documentsData.forEach(doc => {
            const docItem = document.createElement('div');
            docItem.className = 'document-item';
            
            docItem.innerHTML = `
                <div class="document-icon">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="document-info">
                    <h4>${doc.title}</h4>
                    <p>${doc.description}</p>
                    <span class="document-date">${doc.date}</span>
                </div>
                <div class="document-actions">
                    <button class="download-btn" data-url="${doc.url}">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button class="view-btn" data-url="${doc.url}">
                        <i class="fas fa-eye"></i> View
                    </button>
                </div>
            `;
            
            documentsList.appendChild(docItem);
            
            // Add download event
            docItem.querySelector('.download-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                downloadDocument(doc.url, doc.title);
            });
            
            // Add view event
            docItem.querySelector('.view-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                window.open(doc.url, '_blank');
            });
        });
    }
    
    // Download document function
    function downloadDocument(url, filename) {
        // In a real app, this would trigger a proper download
        // For demo purposes, we'll just simulate it
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'document.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Show download notification
        showNotification('Download started: ' + (filename || 'document'));
    }
    
    // Initial render
    renderDocuments();
}

function initAdminPanel() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.querySelector('.close-modal');
    const adminPanel = document.getElementById('adminPanel');
    
    // Login button click
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'flex';
        gsap.from(loginModal.querySelector('.modal-content'), {
            duration: 0.3,
            scale: 0.9,
            opacity: 0,
            ease: 'back.out(1.7)'
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });
    
    // Logout button click
    logoutBtn.addEventListener('click', () => {
        adminPanel.style.display = 'none';
        loginBtn.style.display = 'block';
        localStorage.removeItem('isAdminLoggedIn');
    });
    
    // Check if already logged in
    if (localStorage.getItem('isAdminLoggedIn')) {
        adminPanel.style.display = 'block';
        loginBtn.style.display = 'none';
    }
    
    // Admin tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const tabName = this.getAttribute('data-tab');
            document.querySelectorAll('.admin-tab-content').forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('data-tab-content') === tabName) {
                    content.classList.add('active');
                }
            });
        });
    });
}

function initSmoothScrolling() {
    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(lnk => lnk.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('.section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

function initForms() {
    // Contact form submission
    document.querySelector('.contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, this would send the form data to a server
        showNotification('Message sent successfully!');
        this.reset();
    });
    
    // Admin login form
    document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, this would validate credentials with a server
        const username = this.querySelector('input[type="text"]').value;
        const password = this.querySelector('input[type="password"]').value;
        
        // Simple validation for demo
        if (username && password) {
            localStorage.setItem('isAdminLoggedIn', 'true');
            document.getElementById('loginModal').style.display = 'none';
            document.getElementById('adminPanel').style.display = 'block';
            document.getElementById('loginBtn').style.display = 'none';
            showNotification('Logged in successfully as admin');
        } else {
            showNotification('Please enter both username and password', 'error');
        }
    });
    
    // Media upload form
    document.getElementById('mediaUploadForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, this would upload the file to a server
        const file = document.getElementById('mediaFile').files[0];
        if (file) {
            showNotification(`Media "${file.name}" uploaded successfully`);
            this.reset();
        } else {
            showNotification('Please select a file to upload', 'error');
        }
    });
    
    // Document upload form
    document.getElementById('documentUploadForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, this would upload the file to a server
        const file = document.getElementById('documentFile').files[0];
        if (file) {
            showNotification(`Document "${file.name}" uploaded successfully`);
            this.reset();
        } else {
            showNotification('Please select a file to upload', 'error');
        }
    });
    
    // Profile edit form
    document.getElementById('profileEditForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, this would save the profile data to a server
        showNotification('Profile updated successfully');
    });
}

function openMediaViewer(media) {
    const viewer = document.getElementById('mediaViewer');
    const viewerImage = document.getElementById('viewerImage');
    const viewerVideo = document.getElementById('viewerVideo');
    const viewerTitle = document.getElementById('viewerTitle');
    const viewerDescription = document.getElementById('viewerDescription');
    const downloadBtn = document.getElementById('downloadMedia');
    
    if (media.type === 'photos') {
        viewerImage.src = media.url;
        viewerImage.style.display = 'block';
        viewerVideo.style.display = 'none';
        viewerVideo.pause();
    } else {
        viewerVideo.src = media.url;
        viewerVideo.style.display = 'block';
        viewerImage.style.display = 'none';
    }
    
    viewerTitle.textContent = media.title;
    viewerDescription.textContent = media.description;
    
    // Set download button
    downloadBtn.onclick = function() {
        const a = document.createElement('a');
        a.href = media.url;
        a.download = media.title || (media.type === 'photos' ? 'image.jpg' : 'video.mp4');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    
    viewer.style.display = 'flex';
    gsap.from(viewer.querySelector('.viewer-content'), {
        duration: 0.3,
        scale: 0.9,
        opacity: 0,
        ease: 'back.out(1.7)'
    });
    
    // Close viewer
    document.querySelector('.close-viewer').onclick = function() {
        viewer.style.display = 'none';
        viewerVideo.pause();
    };
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    gsap.from(notification, {
        duration: 0.3,
        y: 20,
        opacity: 0,
        ease: 'power2.out'
    });
    
    setTimeout(() => {
        gsap.to(notification, {
            duration: 0.3,
            y: -20,
            opacity: 0,
            ease: 'power2.in',
            onComplete: () => notification.remove()
        });
    }, 3000);
}