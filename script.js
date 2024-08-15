document.addEventListener('DOMContentLoaded', () => {
    const images = [
        { className: 'img1', src: 'path/to/image1.jpg', alt: 'Image 1' },
        { className: 'img2', src: 'path/to/image2.jpg', alt: 'Image 2' },
        { className: 'img3', src: 'path/to/image3.jpg', alt: 'Image 3' },
        { className: 'img4', src: 'path/to/image4.jpg', alt: 'Image 4' },
        { className: 'img5', src: 'path/to/image5.jpg', alt: 'Image 5' }
    ];
    const imageContainer = document.getElementById('image-container');
    const resetButton = document.getElementById('reset');
    const verifyButton = document.getElementById('verify');
    const para = document.getElementById('para');
    let selectedImages = [];

    // Function to shuffle an array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to render images
    function renderImages() {
        // Clear previous content
        imageContainer.innerHTML = '';
        selectedImages = [];
        resetButton.style.display = 'none';
        verifyButton.style.display = 'none';
        para.innerHTML = '';

        // Select a random image to repeat
        const repeatImage = images[Math.floor(Math.random() * images.length)];
        const shuffledImages = shuffle([...images, repeatImage]);

        // Create and append image elements with src and alt attributes
        shuffledImages.forEach(({ className, src, alt }) => {
            const img = document.createElement('img');
            img.className = className;
            img.src = src; // Set the src attribute
            img.alt = alt; // Set the alt attribute
            img.setAttribute('data-ns-test', className); // Set the data-ns-test attribute
            img.addEventListener('click', () => selectImage(img, className));
            imageContainer.appendChild(img);
        });
    }

    // Function to handle image selection
    function selectImage(img, className) {
        // Avoid double clicking the same image
        if (selectedImages.includes(img)) return;

        selectedImages.push({ img, className });

        // Show reset button after first click
        resetButton.style.display = 'block';

        if (selectedImages.length === 2) {
            // Show verify button after second click
            verifyButton.style.display = 'block';
        }
    }

    // Function to reset the state
    function resetState() {
        selectedImages = [];
        renderImages();
    }

    // Function to verify the selection
    function verifySelection() {
        if (selectedImages.length === 2 && selectedImages[0].className === selectedImages[1].className) {
            para.innerHTML = 'You are a human. Congratulations!';
        } else {
            para.innerHTML = "We can't verify you as a human. You selected the non-identical tiles.";
        }
        verifyButton.style.display = 'none';
    }

    // Attach event listeners
    resetButton.addEventListener('click', resetState);
    verifyButton.addEventListener('click', verifySelection);

    // Initial render
    renderImages();
});
