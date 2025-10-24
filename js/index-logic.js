/* ФАЙЛ: js/index-logic.js
 * ПРИЗНАЧЕННЯ: Логіка для сторінки index.html.
 *
 * ОНОВЛЕННЯ:
 * 1. Видалена "база даних" (вона тепер у js/game-data.js).
 * 2. Скрипт тепер читає дані з глобальної змінної GAME_DATA.
 * 3. Змінено посилання (href) кнопок: тепер вони передають
 * і ТИП (type=) і БУКВУ (level=) на сторінку гри.
 */

document.addEventListener('DOMContentLoaded', () => {

    const gameGrid = document.getElementById('game-grid');
    if (!gameGrid) {
        return; // Ми не на головній сторінці
    }

    // Перевіряємо, чи завантажився файл з даними
    if (typeof GAME_DATA === 'undefined') {
        console.error("ПОМИЛКА: Файл 'js/game-data.js' не завантажено або завантажено невірно!");
        return;
    }

    // 3. Знаходимо елементи, якими будемо керувати
    const allGameCards = document.querySelectorAll('.game-card');
    const titleEl = document.getElementById('game-title');
    const subtitleEl = document.getElementById('game-subtitle');
    const descriptionTextEl = document.getElementById('game-description-text');
    const optionsWrapperEl = document.getElementById('game-options-wrapper');

    // 4. "Єдине джерело правди" (База даних)
    // *** ВИДАЛЕНО ***
    // const gameDescriptions = { ... };
    // Тепер ми використовуємо GAME_DATA
    
    /**
     * Оновлює опис та кнопки для обраної гри.
     * @param {string} gameId - ID гри (напр., "1", "2")
     */
    function setActiveGame(gameId) {
        // Читаємо дані з окремого файлу
        const gameData = GAME_DATA[gameId]; 
        
        allGameCards.forEach(card => {
            card.classList.toggle('active', card.dataset.gameId === gameId);
        });

        if (gameData) {
            titleEl.textContent = gameData.title;
            subtitleEl.textContent = gameData.subtitle; // Опис гри (не змінився)
            optionsWrapperEl.innerHTML = ''; 
            
            if (gameData.optionsGroups && gameData.optionsGroups.length > 0) {
                
                gameData.optionsGroups.forEach(group => {
                    const row = document.createElement('div');
                    row.className = 'game-options-row'; 
                    
                    const text = document.createElement('span');
                    text.className = 'game-options-text'; 
                    text.textContent = group.text; // Напр., "Одяг:"
                    row.appendChild(text);
                    
                    const buttonsWrapper = document.createElement('div');
                    buttonsWrapper.className = 'game-options-buttons'; 
                    
                    group.buttons.forEach(btnText => { // Напр., "Ш"
                        const letterBtn = document.createElement('a');
                        
                        // --- ОНОВЛЕННЯ ЛОГІКИ ПОСИЛАННЯ ---
                        // Прибираємо ':' з назви типу ("Одяг:" -> "Одяг")
                        const typeName = group.text.replace(':', '');
                        
                        // Створюємо посилання, що передає і ТИП, і БУКВУ
                        // Наприклад: game1.html?type=Одяг&level=Ш
                        letterBtn.href = `${gameData.targetGame}?type=${encodeURIComponent(typeName)}&level=${encodeURIComponent(btnText)}`; 
                        // --- -------------------------- ---

                        letterBtn.className = 'letter-btn'; 
                        letterBtn.textContent = btnText;
                        buttonsWrapper.appendChild(letterBtn);
                    });
                    row.appendChild(buttonsWrapper);
                    
                    optionsWrapperEl.appendChild(row);
                });
            }
            
            descriptionTextEl.style.display = '';
            optionsWrapperEl.style.display = (gameData.optionsGroups && gameData.optionsGroups.length > 0) ? '' : 'none';
        
        } else {
            titleEl.textContent = "Помилка";
            subtitleEl.textContent = "Дані для цієї гри не знайдено.";
            optionsWrapperEl.innerHTML = '';
        }
    }

    // === Обробник Подій (Без змін) ===
    gameGrid.addEventListener('click', (e) => {
        const clickedCard = e.target.closest('.game-card');
        
        if (clickedCard) {
            const gameId = clickedCard.dataset.gameId;
            setActiveGame(gameId);
        }
    });

    // === Ініціалізація сторінки (Без змін) ===
    function initializePage() {
        descriptionTextEl.style.display = 'none';
        optionsWrapperEl.style.display = 'none';
        
        allGameCards.forEach(card => {
            card.classList.remove('active');
        });
        
        titleEl.textContent = "Оберіть гру";
        subtitleEl.textContent = "Натисніть на іконку гри, щоб побачити її опис та налаштування.";
        descriptionTextEl.style.display = ''; 
    }
    
    initializePage();
});

