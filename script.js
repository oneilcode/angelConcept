document.addEventListener('DOMContentLoaded', function() {
    const bgData = [
        {
            id: 1,
            bgSrc: 'angel_bg2.mp4',
            title: 'Ангел Concept — центр премиального ухода',
            subtitle: 'Место, где вы выбираете заботу о себе как стиль жизни. Эстетично, профессионально и легко',
            btnTitle: 'подробнее об услугах',
            thumbSrc: 'images/card1.png',
        },
        {
            id: 2,
            bgSrc: 'images/bg1.jpg',
            title: 'Косметология: уходы, инъекции, лифтинг',
            subtitle: 'Место, где вы выбираете заботу о себе как стиль жизни. Эстетично, профессионально и легко',
            btnTitle: 'выбрать процедуру',
            thumbSrc: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=200&h=120&fit=crop'
        },
        {
            id: 3,
            bgSrc: 'images/bg2.jpg',
            title: 'Коррекция фигуры и силуэта',
            subtitle: 'Место, где вы выбираете заботу о себе как стиль жизни. Эстетично, профессионально и легко',
            btnTitle: 'подробнее об услугах',
            thumbSrc: 'images/card1.png'
        },
        {
            id: 4,
            bgSrc: 'angel_bg2.mp4',
            title: 'SPA и европейские массажи',
            subtitle: 'Место, где вы выбираете заботу о себе как стиль жизни. Эстетично, профессионально и легко',
            btnTitle: 'подробнее об услугах',
            thumbSrc: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=200&h=120&fit=crop'
        },
        {
            id: 5,
            bgSrc: 'images/bg1.jpg',
            title: 'Велнес-программы и флоатация',
            subtitle: 'Место, где вы выбираете заботу о себе как стиль жизни. Эстетично, профессионально и легко',
            btnTitle: 'подробнее об услугах',
            thumbSrc: 'images/card1.png'
        },
        {
            id: 6,
            bgSrc: 'images/bg2.jpg',
            title: 'Beauty-услуги: волосы, ногти, макияж',
            subtitle: 'Место, где вы выбираете заботу о себе как стиль жизни. Эстетично, профессионально и легко',
            btnTitle: 'подробнее об услугах',
            thumbSrc: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=200&h=120&fit=crop'
        },
        {
            id: 7,
            bgSrc: 'angel_bg2.mp4',
            title: 'Тайские и балийские массажи',
            subtitle: 'Место, где вы выбираете заботу о себе как стиль жизни. Эстетично, профессионально и легко',
            btnTitle: 'подробнее об услугах',
            thumbSrc: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=200&h=120&fit=crop'
        }
    ];

    const videoContainer = document.querySelector('.video-container');
    const timelineCardsContainer = document.querySelector('.timeline-cards');
    const mainTitle = document.querySelector('.main__title');
    const subTitle = document.querySelector('.main__subtitle');
    const btnTitle = document.querySelector('.main__more-btn');
    let currentVideoIndex = 0;
    let progressInterval;

    bgData.forEach((data, index) => {
        const isVideo = data.bgSrc.toLowerCase().endsWith('.mp4') || 
                        data.bgSrc.toLowerCase().endsWith('.webm') ||
                        data.bgSrc.toLowerCase().endsWith('.ogg');
        
        let bgElement;
        
        if (isVideo) {
            bgElement = document.createElement('video');
            bgElement.classList.add('background-element');
            bgElement.setAttribute('autoplay', '');
            bgElement.setAttribute('muted', '');
            bgElement.setAttribute('loop', '');
            bgElement.setAttribute('playsinline', '');
            
            const sourceElement = document.createElement('source');
            sourceElement.src = data.bgSrc;
            sourceElement.type = 'video/mp4';
            
            bgElement.appendChild(sourceElement);
        } else {
            bgElement = document.createElement('img');
            bgElement.classList.add('background-element');
            bgElement.src = data.bgSrc;
            bgElement.alt = data.title;
        }
        
        videoContainer.appendChild(bgElement);

        const cardElement = document.createElement('div');
        cardElement.classList.add('timeline-cards__card');
        cardElement.setAttribute('data-video-index', index);
        
        cardElement.innerHTML = `
            <div class="card">
                <div class="card__info">
                    <span class="card__number">${data.id}</span>
                    <h6 class="card__title">${data.title}</h6>
                </div>
                <div class="card__image">
                    <img src="${data.thumbSrc}" alt="${data.title}">
                </div>
            </div>           
            <div class="timeline-progress">
                <div class="progress-bar"></div>
            </div>
        `;
        
        timelineCardsContainer.appendChild(cardElement);

        cardElement.addEventListener('click', () => {
            changeBackground(index);
        });
    });

    function changeBackground(index) {
        clearInterval(progressInterval);
        
        const allBackgrounds = document.querySelectorAll('.background-element');
        const allCards = document.querySelectorAll('.timeline-cards__card');
        const allProgressBars = document.querySelectorAll('.progress-bar');
        
        allBackgrounds.forEach(bg => bg.classList.remove('active'));
        allCards.forEach(card => card.classList.remove('active'));
        allProgressBars.forEach(bar => {
            bar.style.width = '0';
            bar.style.transitionDuration = '0s';
        });

        currentVideoIndex = index;
        allBackgrounds[currentVideoIndex].classList.add('active');
        allCards[currentVideoIndex].classList.add('active');
        mainTitle.textContent = bgData[currentVideoIndex].title;
        subTitle.textContent = bgData[currentVideoIndex].subtitle;
        btnTitle.textContent = bgData[currentVideoIndex].btnTitle;
        
        const currentBackground = allBackgrounds[currentVideoIndex];
        if (currentBackground.tagName.toLowerCase() === 'video') {
            currentBackground.currentTime = 0;
            currentBackground.play().catch(e => console.log("Autoplay prevented:", e));
        }

        const currentProgressBar = allCards[currentVideoIndex].querySelector('.progress-bar');
        const duration = 5; 

        setTimeout(() => {
            currentProgressBar.style.transitionDuration = '0s';
            currentProgressBar.style.width = '0';
            
            setTimeout(() => {
                currentProgressBar.style.transitionDuration = `${duration}s`;
                currentProgressBar.style.width = '100%';
            }, 50);
        }, 50);

        progressInterval = setTimeout(() => {
            let nextIndex = (currentVideoIndex + 1) % bgData.length;
            changeBackground(nextIndex);
        }, duration * 1000);
    }

    changeBackground(0);
});