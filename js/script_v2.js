/* JS-файл, працює на обох сторінках. */

// Чекаємо, поки HTML завантажиться
document.addEventListener('DOMContentLoaded', function() {
    
    /* === КОД ДЛЯ МОБІЛЬНОГО МЕНЮ === */
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('nav-active');
            menuToggle.classList.toggle('is-active');
        });
    }

    /* === КОД ДЛЯ СЛАЙДЕРА ІГОР (тільки для index_v2.html) === */
    
    const track = document.getElementById('slider-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const gameTitle = document.getElementById('game-title');
    const gameDescription = document.getElementById('game-description');

    // Перевіряємо, чи ми на головній сторінці (де є слайдер)
    if (track) {

        // Наші ігри
        const games = [
            { title: "Гра 1", description: "Тут буде короткий опис для гри 1" },
            { title: "Гра 2", description: "Дуже цікавий опис для другої гри" },
            { title: "Гра 3", description: "Опис для веселої гри номер 3" },
            { title: "Гра 4", description: "Опис гри 4. Додайте свій текст." },
            { title: "Гра 5", description: "І нарешті, опис для п'ятої гри" }
        ];

        let cards = [];
        let currentIndex = 0;
        let isMoving = false; 
        let visibleCards = 3; 
        let cloneCount = 0; 

        // Налаштування, скільки карток видно
        function setupSliderView() {
            const width = window.innerWidth;
            if (width <= 600) { visibleCards = 1; }
            else if (width <= 900) { visibleCards = 1; }
            else { visibleCards = 3; }
            cloneCount = Math.floor(visibleCards / 2) + 1;
        }

        // Створення карток і "клонів"
        function createCards() {
            track.innerHTML = ''; 
            
            const clonesEnd = games.slice(-cloneCount);
            const clonesStart = games.slice(0, cloneCount);
            const allGames = [...clonesEnd, ...games, ...clonesStart];

            allGames.forEach(game => {
                track.appendChild(createCard(game));
            });

            cards = Array.from(track.children);
        }

        // Допоміжна функція для HTML однієї картки
        function createCard(game) {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.dataset.title = game.title; 
            card.dataset.description = game.description;
            card.innerHTML = `<h3>${game.title}</h3>`;
            return card;
        }

        // Оновлення "активної" картки та опису
        function updateActiveCard(transition = true) {
            if (cards.length === 0) return;
            
            // Логіка центрування (для ПК і моб.)
            const cardStyle = getComputedStyle(cards[0]);
            const cardWidth = cards[0].offsetWidth + (parseInt(cardStyle.marginLeft) * 2);
            const viewportWidth = track.parentElement.offsetWidth;
            
            if (transition) {
                track.style.transition = 'transform 0.5s ease';
            } else {
                track.style.transition = 'none';
            }
            
            // Розрахунок зсуву для ЦЕНТРУВАННЯ
            const offset = (currentIndex + cloneCount) * cardWidth;
            const centeringOffset = (viewportWidth / 2) - (cardWidth / 2);
            const newTransform = centeringOffset - offset;
            
            track.style.transform = `translateX(${newTransform}px)`;

            // Оновлюємо клас .active та опис
            cards.forEach((card, index) => {
                const activeIndex = cloneCount + currentIndex;
                
                if (index === activeIndex) {
                    card.classList.add('active');
                    gameTitle.textContent = card.dataset.title;
                    gameDescription.textContent = card.dataset.description;
                } else {
                    card.classList.remove('active');
                }
            });
        }

        // Рух "Вперед"
        function moveNext() {
            if (isMoving) return;
            isMoving = true;
            currentIndex++;
            updateActiveCard();
        }

        // Рух "Назад"
        function movePrev() {
            if (isMoving) return;
            isMoving = true;
            currentIndex--;
            updateActiveCard();
        }

        // "Магія" безкінечної прокрутки
        track.addEventListener('transitionend', () => {
            isMoving = false;
            
            if (currentIndex >= games.length) {
                cards.forEach(c => c.classList.add('no-transition'));
                currentIndex = 0;
                updateActiveCard(false);
                track.offsetHeight;
                cards.forEach(c => c.classList.remove('no-transition'));
            }
            
            if (currentIndex < 0) {
                cards.forEach(c => c.classList.add('no-transition'));
                currentIndex = games.length - 1;
                updateActiveCard(false);
                track.offsetHeight;
                cards.forEach(c => c.classList.remove('no-transition'));
            }
        });

        // Кліки на стрілки
        nextBtn.addEventListener('click', moveNext);
        prevBtn.addEventListener('click', movePrev);

        // Кліки на самі картки
        track.addEventListener('click', (e) => {
            const clickedCard = e.target.closest('.game-card');
            if (!clickedCard || isMoving) return;

            const clickedIndex = cards.indexOf(clickedCard);
            const activeIndex = cloneCount + currentIndex;

            if (clickedIndex > activeIndex) { moveNext(); }
            else if (clickedIndex < activeIndex) { movePrev(); }
        });

        // Функція, що все запускає
        function initSlider() {
            setupSliderView();
            createCards();
            currentIndex = 0; 
            updateActiveCard(false);
        }

        initSlider();

        // Перебудова слайдера при зміні розміру вікна
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                initSlider();
            }, 250);
        });

    } // Кінець `if (track)`

});
