// Чекаємо, поки DOM (структура HTML) буде повністю
// завантажений і розпарсений браузером.
document.addEventListener('DOMContentLoaded', () => {

    // === ЛОГІКА БУРГЕР-МЕНЮ ===
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active'); // Анімація "Х"
            mainNav.classList.toggle('nav-active'); // Показ/приховування <nav>
        });
    }

    // === ЛОГІКА СІТКИ ВИБОРУ ГРИ ===
    
    const gameGrid = document.getElementById('game-grid');
    
    // "Guard Clause": Якщо сітки ігор на сторінці немає
    // (напр., ми на /about.html), припиняємо виконання коду.
    if (!gameGrid) {
        return; 
    }

    // Отримуємо всі елементи для роботи
    const allGameCards = document.querySelectorAll('.game-card');
    
    // Елементи для опису
    const titleEl = document.getElementById('game-title');
    const subtitleEl = document.getElementById('game-subtitle');
    const descriptionTextEl = document.getElementById('game-description-text');
    const optionsWrapperEl = document.getElementById('game-options-wrapper');

    // "Єдине джерело правди" (Single Source of Truth) для всіх описів ігор.
    // Зберігаємо дані тут, а не в HTML, для гнучкості.
    const gameDescriptions = {
        1: { 
            title: "Гра 1: Потяг", 
            subtitle: "Допоможи потягу знайти правильний вагон.",
            // Групи опцій для генерації
            optionsGroups: [
                {
                    text: "Одяг:",
                    buttons: ["Ш", "С", "К", "Р", "Л", "Ч", "В", "Т", "П", "Д", "Б", "Н", "М", "Г", "З"]
                },
                {
                    text: "Їжа:",
                    buttons: ["А", "О", "У", "Е", "І", "Я", "Ю", "Є", "Ї"]
                },
                {
                    text: "Речі:",
                    buttons: ["М", "П", "Т", "К", "В", "Д", "Г", "Б", "Н", "Л", "Р", "З", "С", "Ж", "Ц"]
                }
            ]
        },
        2: { 
            title: "Гра 2: Склад", 
            subtitle: "Збери слово по складах.",
            optionsGroups: [
                {
                    text: "Рівень 1:",
                    buttons: ["МА", "СА", "ЛА", "ТА", "ПА"]
                },
                 {
                    text: "Рівень 2:",
                    buttons: ["КО", "МО", "ТО", "ЛО", "СО"]
                }
            ]
        },
        3: { 
            title: "Гра 3: Тварини", 
            subtitle: "Вгадай, хто як каже.",
            optionsGroups: [] // Для цієї гри поки немає опцій
        },
        4: { 
            title: "Гра 4: Звуки", 
            subtitle: "Повтори звук, який чуєш.",
            optionsGroups: [
                {
                    text: "Звуки:",
                    buttons: ["С", "Ш", "Р", "Л"]
                }
            ]
        },
        5: { 
            title: "Гра 5: Щелепа", 
            subtitle: "Виконуй вправи для язика та щелепи.",
            optionsGroups: [] // І для цієї гри немає опцій
        },
    };

    /**
     * Головна функція. Оновлює опис та кнопки для обраної гри.
     * @param {string} gameId - ID гри (напр., "1", "2", ...)
     */
    function setActiveGame(gameId) {
        const gameData = gameDescriptions[gameId];

        // 1. Оновлюємо клас .active на іконках
        allGameCards.forEach(card => {
            card.classList.toggle('active', card.dataset.gameId === gameId);
        });

        if (gameData) {
            // 2. Оновлюємо текст опису
            titleEl.textContent = gameData.title;
            subtitleEl.textContent = gameData.subtitle;

            // 3. Очищуємо старі кнопки
            optionsWrapperEl.innerHTML = ''; 

            // 4. Генеруємо нові рядки опцій та кнопки
            if (gameData.optionsGroups && gameData.optionsGroups.length > 0) {
                
                gameData.optionsGroups.forEach(group => {
                    // Створюємо <div class="game-options-row">
                    const row = document.createElement('div');
                    row.className = 'game-options-row';

                    // Створюємо <span class="game-options-text">Одяг:</span>
                    const text = document.createElement('span');
                    text.className = 'game-options-text';
                    text.textContent = group.text;
                    row.appendChild(text);

                    // Створюємо <div class="game-options-buttons">
                    const buttonsWrapper = document.createElement('div');
                    buttonsWrapper.className = 'game-options-buttons';

                    // Створюємо кнопки
                    group.buttons.forEach(btnText => {
                        // <a href="game1.html" class="letter-btn">Ш</a>
                        const letterBtn = document.createElement('a');
                        letterBtn.href = 'game1.html'; // Поки всі ведуть на game1.html
                        letterBtn.className = 'letter-btn';
                        letterBtn.textContent = btnText;
                        buttonsWrapper.appendChild(letterBtn);
                    });

                    row.appendChild(buttonsWrapper);
                    optionsWrapperEl.appendChild(row);
                });
            }

            // Плавно показуємо весь блок опису
            descriptionTextEl.style.display = '';
            optionsWrapperEl.style.display = '';

        } else {
            // Якщо дані для гри не знайдені
            titleEl.textContent = "Помилка";
            subtitleEl.textContent = "Дані для цієї гри не знайдено.";
            optionsWrapperEl.innerHTML = '';
        }
    }

    // === Обробники Подій ===

    // Клік на іконку гри
    gameGrid.addEventListener('click', (e) => {
        // Знаходимо найближчого батька з класом .game-card
        const clickedCard = e.target.closest('.game-card');
        
        if (clickedCard) {
            const gameId = clickedCard.dataset.gameId;
            setActiveGame(gameId);
        }
    });

    // === Ініціалізація (Запуск) ===

    // Функція для ініціалізації стану сторінки
    function initializePage() {
        // Ховаємо блок опису (поки нічого не обрано)
        descriptionTextEl.style.display = 'none';
        optionsWrapperEl.style.display = 'none';

        // Скидаємо всі активні картки
        allGameCards.forEach(card => {
            card.classList.remove('active');
        });

        // Встановлюємо текст-заглушку
        titleEl.textContent = "Оберіть гру";
        subtitleEl.textContent = "Натисніть на іконку гри, щоб побачити її опис та налаштування.";
        descriptionTextEl.style.display = '';
    }

    // Запускаємо ініціалізацію при завантаженні
    initializePage();

});
