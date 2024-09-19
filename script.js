/*=============== SHOW MENU ===============*/
// Constantes des éléments du menu de navigation. 
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
// Valide l'existence de la constante
if(navToggle){
    // Ajoute la classe 'show-menu' à 'navMenu' lorsqu'on clique sur 'navToggle'.
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
// Valide l'existence de la constante
if(navClose){
    // Supprime la classe 'show-menu' de 'navMenu' lorsqu'on clique sur 'navClose'.
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
// Constantes qui récupèrent tous les éléments de la classe 'nav__link'.
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // Supprime la classe 'show-menu' de 'navMenu' lorsqu'on clique sur un lien de navigation.
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE SHADOW HEADER ===============*/
const shadowHeader = () => {
    const header = document.getElementById('header')
    // Ajoute ou supprime la classe 'shadow-header' à 'header' en fonction du défilement de la page.
    this.scrollY >= 50 ? header.classList.add('shadow-header') 
                       : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)




const slides = document.querySelectorAll('.project-slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
let currentSlide = 0;
let isAnimating = false;

function showSlide(index) {
    if (isAnimating) return;
    isAnimating = true;

    const outgoingSlide = slides[currentSlide];
    const incomingSlide = slides[index];

    // Resetting the transition state for incoming slide
    incomingSlide.style.transition = 'none';
    incomingSlide.style.opacity = '0';
    incomingSlide.style.transform = index > currentSlide ? 'translateX(100%)' : 'translateX(-100%)';
    incomingSlide.style.display = 'flex';

    // Triggering reflow to apply the initial state immediately
    incomingSlide.offsetHeight; 

    // Slide out the current slide
    outgoingSlide.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
    outgoingSlide.style.transform = index > currentSlide ? 'translateX(-100%)' : 'translateX(100%)';
    outgoingSlide.style.opacity = '0';

    // Slide in the new slide
    incomingSlide.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
    setTimeout(() => {
        incomingSlide.style.transform = 'translateX(0)';
        incomingSlide.style.opacity = '1';
    }, 50);

    // After the transition is done, clean up
    setTimeout(() => {
        outgoingSlide.classList.remove('active');
        outgoingSlide.style.display = 'none';
        incomingSlide.classList.add('active');
        isAnimating = false;
    }, 850);

    currentSlide = index;
}

nextBtn.addEventListener('click', () => {
    const nextSlide = (currentSlide + 1) % slides.length;
    showSlide(nextSlide);
});

prevBtn.addEventListener('click', () => {
    const prevSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevSlide);
});

// Initialize the first slide
slides.forEach((slide, index) => {
    slide.style.display = index === currentSlide ? 'flex' : 'none';
});

// Auto-scroll to the next project every 4 seconds
setInterval(() => {
    const nextSlide = (currentSlide + 1) % slides.length;
    showSlide(nextSlide);
}, 4000);  // 4000ms = 4 seconds

document.querySelectorAll('.circular-progress').forEach(function (progress) {
    let value = progress.getAttribute('data-progress');
    progress.style.setProperty('--progress', value);
});

