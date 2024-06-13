function generateModel() {
    const fileInput = document.getElementById('imageInput');
    const viewer = document.getElementById('viewer');

    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            // Here you would use a library like OpenCV.js or TensorFlow.js
            // to process the image and generate a 3D model
            // For simplicity, let's just display the image for now
            viewer.innerHTML = `<img src="${imageUrl}" alt="Uploaded Image" width="400">`;
        }
        reader.readAsDataURL(file);
    } else {
        alert('Please select an image file.');
    }
}
