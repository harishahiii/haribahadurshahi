// Toggle Menu Function
function toggleMenu() {
    const menu = document.getElementById("navMenu");
    menu.classList.toggle("show");
}

// Function to upload and provide a download link for the PDF
function uploadPDF() {
    const pdfInput = document.getElementById("pdfUpload");
    const pdfLink = document.getElementById("pdfLink");

    const file = pdfInput.files[0];

    if (file && file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = function(e) {
            pdfLink.href = e.target.result;
            pdfLink.style.display = "block"; // Show the download link
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please upload a valid PDF file.");
    }
}
