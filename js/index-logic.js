/* ФАЙЛ: js/index-logic.js
  ОПИС: "Мозок" головної сторінки (page-index).
          Керує вибором гри, відображенням опису 
          та динамічною генерацією кнопок опцій.
*/

class Index_Logic {
    
    // Конструктор класу, викликається при створенні об'єкту
    constructor() {
        // Знаходимо ключові елементи на сторінці
        this.gameGrid = document.getElementById('game-grid');
        this.titleEl = document.getElementById('game-title');
        this.subtitleEl = document.getElementById('game-subtitle');
        this.descriptionTextEl = document.getElementById('game-description-text');
        this.optionsWrapperEl = document.getElementById('game-options-wrapper');
        this.allGameCards = document.querySelectorAll('.game-card');
        
        // Якщо ми не на головній (немає сітки гри), нічого не робимо
        if (!this.gameGrid) return; 

        // Завантажуємо дані про ігри з константи
        this.gameDescriptions = GAME_DATA;
        
        // "Прив'язуємо" 'this' до обробника подій, щоб він не губився
        this.boundHandleCardClick = this.handleCardClick.bind(this);
        // Вішаємо слухач подій на всю сітку (делегування подій)
        this.gameGrid.addEventListener('click', this.boundHandleCardClick);
        
        // Встановлюємо початковий стан сторінки
        this.initializePage();
    }

    /** Обробляє клік на картку гри */
    handleCardClick(e) {
        // Знаходимо найближчого батька з класом .game-card
        const clickedCard = e.target.closest('.game-card');
        if (clickedCard) {
            // Отримуємо ID гри з data-атрибуту
            const gameId = clickedCard.dataset.gameId;
            // Встановлюємо цю гру як активну
            this.setActiveGame(gameId);
        }
    }

    /** Оновлює UI, показуючи опис та опції обраної гри */
    setActiveGame(gameId) {
        // Знаходимо дані для обраної гри
        const gameData = this.gameDescriptions[gameId];
        
        // Оновлюємо клас 'active' на картках
        this.allGameCards.forEach(card => {
            card.classList.toggle('active', card.dataset.gameId === gameId);
        });

        if (gameData) {
            // 1. Оновлюємо текст опису
            this.titleEl.textContent = gameData.title;
            this.subtitleEl.textContent = gameData.subtitle;
            this.optionsWrapperEl.innerHTML = ''; // Очищуємо старі опції
            
            // 2. Генеруємо нові опції (кнопки), якщо вони є
            if (gameData.optionsGroups && gameData.optionsGroups.length > 0) {
                gameData.optionsGroups.forEach(group => {
                    // Створюємо рядок
                    const row = document.createElement('div');
                    row.className = 'game-options-row';
                    
                    // Створюємо текст (назва категорії)
                    const text = document.createElement('span');
                    text.className = 'game-options-text';
                    text.textContent = group.text;
                    row.appendChild(text);
                    
                    // Створюємо контейнер для кнопок
                    const buttonsWrapper = document.createElement('div');
                    buttonsWrapper.className = 'game-options-buttons';
                    
                    // Створюємо кнопки літер
                    group.buttons.forEach(btnText => {
                        const letterBtn = document.createElement('a');
                        // Формуємо хеш-посилання для SPA-роутера
                        letterBtn.href = `${group.targetGame}?type=${group.text}&level=${btnText}`; 
                        letterBtn.className = 'letter-btn';
                        letterBtn.textContent = btnText;
                        buttonsWrapper.appendChild(letterBtn);
                    });
                    
                    row.appendChild(buttonsWrapper);
                    this.optionsWrapperEl.appendChild(row);
                });
                // Показуємо блоки
                this.descriptionTextEl.style.display = '';
                this.optionsWrapperEl.style.display = '';
            } else {
                // Якщо опцій немає (гра в розробці)
                this.descriptionTextEl.style.display = '';
                this.optionsWrapperEl.style.display = 'none';
            }
        } else {
            // Якщо дані гри не знайдені, скидаємо до початкового стану
            this.initializePage();
        }
    }

    /** Скидає сторінку до стану "Оберіть гру" */
    initializePage() {
        // Встановлюємо текст за замовчуванням
        this.titleEl.textContent = DEFAULT_TITLE;
        this.subtitleEl.textContent = DEFAULT_SUBTITLE;
        
        // Ховаємо блок опцій
        this.descriptionTextEl.style.display = '';
        this.optionsWrapperEl.style.display = 'none';
        this.optionsWrapperEl.innerHTML = '';
        
        // Знімаємо 'active' з усіх карток
        this.allGameCards.forEach(card => {
            card.classList.remove('active');
        });
    }
    
    /** Метод очищення (для SPA-роутера) */
    destroy() {
        // Видаляємо слухач подій, щоб уникнути витоків пам'яті
        if (this.gameGrid) {
            this.gameGrid.removeEventListener('click', this.boundHandleCardClick);
        }
    }
}

