document.addEventListener('DOMContentLoaded', () => {
 
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
              
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
});


class Carousel {
    constructor() {
        this.currentIndex = 0;
        this.stage = document.getElementById('stage');
        this.slides = Array.from(document.querySelectorAll('.slide'));
        this.totalSlides = this.slides.length;
        this.dots = [];
        
        this.init();
    }

    init() {
      
        const indicatorsContainer = document.getElementById('indicators');
        if (indicatorsContainer) {
            for (let i = 0; i < this.totalSlides; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot' + (i === 0 ? ' active' : '');
                dot.addEventListener('click', () => {
                    this.currentIndex = i;
                    this.update();
                });
                indicatorsContainer.appendChild(dot);
                this.dots.push(dot);
            }
        }

      
        document.getElementById('prevBtn')?.addEventListener('click', () => this.prev());
        document.getElementById('nextBtn')?.addEventListener('click', () => this.next());

     
        this.slides.forEach((slide, index) => {
            slide.addEventListener('click', () => {
                if (index === this.getPrevIndex()) this.prev();
                else if (index === this.getNextIndex()) this.next();
            });
        });

       
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

      
        this.update();
    }

    getPrevIndex() {
        return (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    }

    getNextIndex() {
        return (this.currentIndex + 1) % this.totalSlides;
    }

    next() {
        this.currentIndex = this.getNextIndex();
        this.update();
    }

    prev() {
        this.currentIndex = this.getPrevIndex();
        this.update();
    }

    update() {
        const prevIdx = this.getPrevIndex();
        const nextIdx = this.getNextIndex();

        this.slides.forEach((slide, index) => {
        
            slide.classList.remove('active', 'prev', 'next', 'hidden');

            if (index === this.currentIndex) {
                slide.classList.add('active');
            } else if (index === prevIdx) {
                slide.classList.add('prev');
            } else if (index === nextIdx) {
                slide.classList.add('next');
            } else {
                slide.classList.add('hidden');
            }
        });

     
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
});



function updateParallax() {
    const scrolled = window.pageYOffset;
    
    document.querySelectorAll('[data-speed]').forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed'));
        const yPos = -(scrolled * speed);
        
        element.style.transform = `translateY(${yPos}px)`;
    });
}

window.addEventListener('scroll', updateParallax);


