// Horizontal scroll logic
const scroller = document.querySelector('.rf-cards-scroller-crop');
const scrollLeftBtn = document.getElementById('scroll-left');
const scrollRightBtn = document.getElementById('scroll-right');
const cardElement = document.querySelector('.rf-cards-scroller-itemview');
const cardStyle = getComputedStyle(cardElement);
const cardWidth = cardElement.offsetWidth + parseInt(cardStyle.marginLeft) + parseInt(cardStyle.marginRight);

scrollLeftBtn.addEventListener('click', () => {
    scroller.scrollBy({ left: -cardWidth * 1.025, behavior: 'smooth' });
});
scrollRightBtn.addEventListener('click', () => {
    scroller.scrollBy({ left: cardWidth * 1.025, behavior: 'smooth' });
});

// modal functionality

// Get modal elements
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');
const cards = document.querySelectorAll('.rf-cards-scroller-itemview');

// Data for each card
const cardData = [
    {
        title: " ",
        description: " ",
        images: [
            "images/slides/music/music1.png",
            "images/slides/music/music2.png",
            "images/slides/music/music3.png",
            "images/slides/music/music4.png",
            "images/slides/music/music5.png",
            "images/slides/music/music6.png",
            "images/slides/music/music7.png",
            "images/slides/music/music8.png"
        ]
    },
    {
        // three
        title: " ",
        description: "",
        images: [
            "images/slides/three/three1.png",
            "images/slides/three/three2.png",
            "images/slides/three/three3.png",
            "images/slides/three/three4.png",
            "images/slides/three/three5.png",
            "images/slides/three/three6.png",
            "images/slides/three/three7.png"
        ]
    },
    {
        title: " ",
        description: "",
        images: [
            "images/slides/ksea/ksea1.png",
            "images/slides/ksea/ksea2.png",
            "images/slides/ksea/ksea3.png",
            "images/slides/ksea/ksea4.png",
            "images/slides/ksea/ksea5.png"
        ]
    },
    {
        title: " ",
        description: "",
        images: [
            "images/slides/vineyard/vineyard1.png",
            "images/slides/vineyard/vineyard2.png"
        ]
    },
    {
        title: " ",
        description: "",
        images: [
            "images/slides/welab/welab1.png",
            "images/slides/welab/welab2.png",
            "images/slides/welab/welab3.png",
            "images/slides/welab/welab4.png",
            "images/slides/welab/welab5.png"
        ]
    }
];

document.addEventListener('contextmenu', function (event) {
    // If it’s over an image, block the context menu
    if (event.target.tagName.toLowerCase() === 'img') {
        event.preventDefault();
    }
}, false);

// Add click event listeners to each card
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        // Show the modal by adding the 'show' class
        modalOverlay.classList.add('show');

        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-active');
        document.documentElement.classList.add('modal-active');

        // Get the data for the clicked card
        const data = cardData[index];

        // Generate slider HTML if there are multiple images
        let sliderImages = '';
        if (data.images.length > 1) {
            sliderImages = data.images.map((img, idx) => `
                <div class="slide">
                    <img src="${img}" alt="${data.title} Image ${idx + 1}" />
                </div>
            `).join('');

            // Include slider controls
            sliderImages = `
                <div class="slider">
                    ${sliderImages}
                </div>
                <a class="prev">&#10094;</a>
                <a class="next">&#10095;</a>
            `;
        } else {
            // Single image
            sliderImages = `<img src="${data.images[0]}" alt="${data.title}" />`;
        }

        // Populate the modal content
        modalBody.innerHTML = `
            <h2>${data.title}</h2>
            ${sliderImages}
            <p>${data.description}</p>
        `;

        // Initialize the slider if there are multiple images
        if (data.images.length > 1) {
            initSlider();
        }
    });
});

// Close the modal when the close button is clicked
modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('show');
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-active');
    document.documentElement.classList.remove('modal-active');
});

// Close the modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        modalOverlay.classList.remove('show');
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-active');
        document.documentElement.classList.remove('modal-active');
    }
});

// UPDATED initSlider() WITH DOTS:
function initSlider() {
    let slideIndex = 0;

    const slider = document.querySelector('.slider');
    const slides = slider.querySelectorAll('.slide');

    // Create a container for the dots
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('dots-container');

    // For each slide, create a dot
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active'); // first is active
        dot.addEventListener('click', () => {
            showSlides(slideIndex = i);
        });
        dotsContainer.appendChild(dot);
    });

    // Insert the dots container BELOW the slider
    slider.insertAdjacentElement('afterend', dotsContainer);

    // Show the first slide
    showSlides(slideIndex);

    // Set up next/prev
    const prev = document.querySelector('.modal-content .prev');
    const next = document.querySelector('.modal-content .next');

    prev.addEventListener('click', () => {
        showSlides(--slideIndex);
    });

    next.addEventListener('click', () => {
        showSlides(++slideIndex);
    });

    function showSlides(n) {
        if (n >= slides.length) {
            slideIndex = 0;
        }
        if (n < 0) {
            slideIndex = slides.length - 1;
        }

        // Hide all slides
        slides.forEach(slide => (slide.style.display = 'none'));
        // Deactivate all dots
        const allDots = dotsContainer.querySelectorAll('.dot');
        allDots.forEach(dot => dot.classList.remove('active'));

        // Show the current slide
        slides[slideIndex].style.display = 'block';
        // Highlight the current dot
        allDots[slideIndex].classList.add('active');
    }
}