// Toggle Menu Function
function toggleMenu() {
    const menu = document.getElementById("navMenu");
    menu.classList.toggle("show");
}

// Update Profile Picture
function updateProfilePic() {
    const file = document.getElementById("profileUpload").files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById("profilePic").src = e.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

// Submit Comment Function
function submitComment() {
    const commentText = document.getElementById("commentText").value;
    const commentDisplay = document.getElementById("commentDisplay");

    if (commentText) {
        const newComment = document.createElement("p");
        newComment.textContent = commentText;
        commentDisplay.appendChild(newComment);
        document.getElementById("commentText").value = "";
    }
}

// Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Message sent! Thank you for reaching out.");
});
