/* script.js */
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    const settingsToggle = document.querySelector(".settings-toggle");
    const settingsContent = document.querySelector(".settings-content");
    const sections = document.querySelectorAll(".content-box");
    
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
    
    // Upload functionality
    function handleUpload(inputId, galleryId) {
        const input = document.getElementById(inputId);
        const gallery = document.getElementById(galleryId);
        
        input.addEventListener("change", function () {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const element = document.createElement("a");
                    element.href = e.target.result;
                    element.target = "_blank";
                    element.textContent = file.name;
                    element.download = file.name;
                    gallery.appendChild(element);
                    gallery.appendChild(document.createElement("br"));
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    handleUpload("photoUpload", "photoGallery");
    handleUpload("videoUpload", "videoGallery");
    handleUpload("codeUpload", "codeGallery");
    handleUpload("pdfUpload", "pdfGallery");
});