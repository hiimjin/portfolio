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
        title: "This Website",
        role: "Designer and Developer",
        description: "Detailed description about this website project...",
        images: [
            "images/cards/web.png",
            "images/cards/vineyard.png",
            "images/cards/web.png"
        ]
    },
    {
        title: "Vineyard App UI/UX",
        role: "iOS Club, Designer and Developer",
        description: "Information about the Vineyard App UI/UX project...",
        images: ["images/cards/vineyard.png"]
    },
    {
        title: "Three App UI/UX",
        role: "iOS Club, Developer",
        description: "Information about the Three App UI/UX project...",
        images: ["images/cards/three.png"]
    },
    {
        title: "Music and Coding",
        role: "TAP, Student Researcher",
        description: "An in-depth look into the intersection of music and coding, exploring innovative ways to teach programming through musical concepts.",
        images: [
            "images/musicode1.png",
            "images/musicode2.png",
            "images/musicode3.png"
        ]
    },
    {
        title: "IEQ and ML Framework",
        role: "WELab, Student Researcher",
        description: "Exploring Indoor Environmental Quality (IEQ) using Machine Learning frameworks to enhance sustainability.",
        images: ["images/filler.png"]
    },
    {
        title: "Design Template",
        role: "KSEA, Promotional Director",
        description: "Created promotional design templates for KSEA using Illustrator.",
        images: ["images/cards/ksea.png"]
    }
];

// Add click event listeners to each card
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        // Display the modal
        modalOverlay.style.display = 'block';
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';

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
                    <a class="prev">&#10094;</a>
                    <a class="next">&#10095;</a>
                </div>
            `;
        } else {
            // Single image
            sliderImages = `<img src="${data.images[0]}" alt="${data.title}" />`;
        }

        // Populate the modal content
        modalBody.innerHTML = `
            <h2>${data.title}</h2>
            <h3>${data.role}</h3>
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
    modalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling
});

// Close the modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target == modalOverlay) {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    }
});

// Slider functionality
function initSlider() {
    let slideIndex = 0;
    showSlides(slideIndex);

    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    prev.addEventListener('click', () => {
        showSlides(--slideIndex);
    });

    next.addEventListener('click', () => {
        showSlides(++slideIndex);
    });

    function showSlides(n) {
        const slides = document.querySelectorAll('.slide');
        if (n >= slides.length) { slideIndex = 0; }
        if (n < 0) { slideIndex = slides.length - 1; }
        slides.forEach(slide => slide.style.display = 'none');
        slides[slideIndex].style.display = 'block';
    }
}