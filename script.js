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
