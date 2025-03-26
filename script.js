document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    const settingsToggle = document.querySelector(".settings-toggle");
    const settingsContent = document.querySelector(".settings-content");
    const sections = document.querySelectorAll(".content-box");
    const PASSWORD = "strick@20"; // Change this to your desired password

    // Toggle menu visibility
    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("show");
    });

    // Toggle settings visibility
    settingsToggle.addEventListener("click", function () {
        settingsContent.classList.toggle("show");
    });

    // Scroll animation
    function handleScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight - 50) {
                section.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    // Load files from local storage
    function loadStoredFiles(galleryId) {
        const gallery = document.getElementById(galleryId);
        const storedFiles = JSON.parse(localStorage.getItem(galleryId)) || [];
        
        storedFiles.forEach(file => {
            addFileToGallery(file.name, file.url, gallery);
        });
    }

    function addFileToGallery(fileName, fileURL, gallery) {
        const fileElement = document.createElement("div");
        fileElement.innerHTML = `
            <a href="${fileURL}" target="_blank">${fileName}</a>
            <button class="view-btn" onclick="window.open('${fileURL}', '_blank')">View</button>
        `;
        gallery.appendChild(fileElement);
    }

    function handleUpload(inputId, galleryId) {
        const input = document.getElementById(inputId);
        const gallery = document.getElementById(galleryId);
        
        input.addEventListener("change", function () {
            const file = input.files[0];
            if (!file) return;
            
            const passwordPrompt = prompt("Enter upload password:");
            if (passwordPrompt !== PASSWORD) {
                alert("Incorrect password! Upload denied.");
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                const fileData = { name: file.name, url: e.target.result };
                
                // Save to local storage
                const storedFiles = JSON.parse(localStorage.getItem(galleryId)) || [];
                storedFiles.push(fileData);
                localStorage.setItem(galleryId, JSON.stringify(storedFiles));
                
                addFileToGallery(file.name, e.target.result, gallery);
            };
            reader.readAsDataURL(file);
        });
    }

    // Initialize upload handlers and load stored files
    handleUpload("photoUpload", "photoGallery");
    handleUpload("videoUpload", "videoGallery");
    handleUpload("codeUpload", "codeGallery");
    handleUpload("pdfUpload", "pdfGallery");

    loadStoredFiles("photoGallery");
    loadStoredFiles("videoGallery");
    loadStoredFiles("codeGallery");
    loadStoredFiles("pdfGallery");
});
