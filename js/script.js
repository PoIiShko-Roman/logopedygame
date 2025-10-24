/* ФАЙЛ: js/script.js
  ПРИЗНАЧЕННЯ: Цей файл містить всю інтерактивну логіку сайту.
  Він підключений до *кожного* HTML-файлу.
*/

// Чекаємо, поки HTML-структура (DOM) повністю завантажиться
document.addEventListener('DOMContentLoaded', () => {

    // === ЗОНА: ЛОГІКА БУРГЕР-МЕНЮ (Працює на всіх сторінках) ===
    
    // 1. Знаходимо елементи в HTML (хедері)
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    // 2. Вішаємо "слухача" на клік по бургеру
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            // 3. Додаємо/видаляємо класи з 'css/style.css'
            
            // '.is-active' -> анімація кнопки в "Х"
            menuToggle.classList.toggle('is-active'); 
            // '.nav-active' -> показ/приховування <nav>
            mainNav.classList.toggle('nav-active'); 
        });
    }

    // === ЗОНА: ЛОГІКА СІТКИ ВИБОРУ ГРИ (Працює ТІЛЬКИ на index.html) ===
    
    // 1. Знаходимо контейнер сітки ігор
    const gameGrid = document.getElementById('game-grid');
    
    // 2. "Guard Clause" (Запобіжник): 
    // Якщо ми НЕ на 'index.html', 'gameGrid' буде 'null'.
    // 'return;' припиняє виконання коду, щоб не було помилок
    // на сторінках 'about.html' чи 'gameX.html'.
    if (!gameGrid) {
        return; 
    }

    // 3. Знаходимо всі елементи, якими будемо керувати
    const allGameCards = document.querySelectorAll('.game-card');
    const titleEl = document.getElementById('game-title');
    const subtitleEl = document.getElementById('game-subtitle');
    const descriptionTextEl = document.getElementById('game-description-text');
    const optionsWrapperEl = document.getElementById('game-options-wrapper');

    // 4. "Єдине джерело правди" (Single Source of Truth)
    // База даних, звідки скрипт бере інформацію про ігри
    // (на основі 'data-game-id' з 'index.html').
    const gameDescriptions = {
        "1": { 
            title: "Гра 1: Потяг", 
            subtitle: "Допоможи потягу знайти правильний вагон.",
            // 'optionsGroups' - масив для генерації рядків опцій
            optionsGroups: [
                {
                    text: "Одяг:", // Текст зліва
                    buttons: ["Ш", "С", "К", "Р", "Л", "Ч", "В", "Т", "П", "Д", "Б", "Н", "М", "Г", "З"], // Кнопки
                    targetGame: "game1.html" // Посилання для кнопок
                },
                {
                    text: "Їжа:",
                    buttons: ["А", "О", "У", "Е", "І", "Я", "Ю", "Є", "Ї"],
                    targetGame: "game1.html"
                },
                {
                    text: "Речі:",
                    buttons: ["М", "П", "Т", "К", "В", "Д", "Г", "Б", "Н", "Л", "Р", "З", "С", "Ж", "Ц"],
                    targetGame: "game1.html"
                }
            ]
        },
        "2": { 
            title: "Гра 2: Склад", 
            subtitle: "Збери слово по складах.",
            optionsGroups: [
                {
                    text: "Рівень 1:",
                    buttons: ["МА", "СА", "ЛА", "ТА", "ПА"],
                    targetGame: "game2.html"
                },
                 {
                    text: "Рівень 2:",
                    buttons: ["КО", "МО", "ТО", "ЛО", "СО"],
                    targetGame: "game2.html"
                }
            ]
        },
        "3": { 
            title: "Гра 3: Тварини", 
            subtitle: "Вгадай, хто як каже.",
            optionsGroups: [] // Пустий масив = опцій не буде
        },
        "4": { 
            title: "Гра 4: Звуки", 
            subtitle: "Повтори звук, який чуєш.",
            optionsGroups: [
                {
                    text: "Звуки:",
                    buttons: ["С", "Ш", "Р", "Л"],
                    targetGame: "game4.html"
                }
            ]
        },
        "5": { 
            title: "Гра 5: Щелепа", 
            subtitle: "Виконуй вправи для язика та щелепи.",
            optionsGroups: []
        },
    };

    /**
     * Головна функція: Оновлює опис та кнопки для обраної гри.
     * @param {string} gameId - ID гри (напр., "1", "2")
     */
    function setActiveGame(gameId) {
        const gameData = gameDescriptions[gameId];

        // Крок 1: Оновлюємо клас .active на іконках
        // (додає/видаляє клас з 'css/style.css').
        allGameCards.forEach(card => {
            card.classList.toggle('active', card.dataset.gameId === gameId);
        });

        // Крок 2: Перевіряємо, чи є дані для гри
        if (gameData) {
            // Крок 2.1: Оновлюємо текст опису
            titleEl.textContent = gameData.title;
            subtitleEl.textContent = gameData.subtitle;

            // Крок 2.2: Повністю очищуємо старі кнопки
            optionsWrapperEl.innerHTML = ''; 

            // Крок 2.3: Генеруємо нові рядки опцій та кнопки
            if (gameData.optionsGroups && gameData.optionsGroups.length > 0) {
                
                // Проходимо по кожній групі (напр., "Одяг", "Їжа")
                gameData.optionsGroups.forEach(group => {
                    // Створюємо HTML-елементи в пам'яті
                    const row = document.createElement('div');
                    row.className = 'game-options-row'; // (стиль з css/style.css)

                    const text = document.createElement('span');
                    text.className = 'game-options-text'; // (стиль з css/style.css)
                    text.textContent = group.text;
                    row.appendChild(text);

                    const buttonsWrapper = document.createElement('div');
                    buttonsWrapper.className = 'game-options-buttons'; // (стиль з css/style.css)

                    // Створюємо кнопки
                    group.buttons.forEach(btnText => {
                        const letterBtn = document.createElement('a');
                        letterBtn.href = group.targetGame || 'index.html'; 
                        letterBtn.className = 'letter-btn'; // (стиль з css/style.css)
                        letterBtn.textContent = btnText;
                        buttonsWrapper.appendChild(letterBtn);
                    });

                    row.appendChild(buttonsWrapper);
                    
                    // Додаємо готовий рядок на сторінку
                    optionsWrapperEl.appendChild(row);
                });
            }

            // Крок 2.4: Показуємо/ховаємо блоки
            descriptionTextEl.style.display = '';
            // Ховаємо обгортку, якщо масив опцій пустий
            optionsWrapperEl.style.display = (gameData.optionsGroups && gameData.optionsGroups.length > 0) ? '' : 'none';

        } else {
            // Заглушка на випадок помилки
            titleEl.textContent = "Помилка";
            subtitleEl.textContent = "Дані для цієї гри не знайдено.";
            optionsWrapperEl.innerHTML = '';
        }
    }

    // === ЗОНА: Обробники Подій ===

    // "Слухач" кліку на сітці ігор
    gameGrid.addEventListener('click', (e) => {
        // Знаходимо картку, по якій клікнули
        const clickedCard = e.target.closest('.game-card');
        
        if (clickedCard) {
            // Беремо її 'data-game-id' з HTML
            const gameId = clickedCard.dataset.gameId;
            // ...і запускаємо головну функцію
            setActiveGame(gameId);
        }
    });

    // === ЗОНА: Ініціалізація (Запуск) ===
    // Встановлює початковий стан сторінки 'index.html'
    function initializePage() {
        // 1. Ховаємо блок опису (бо нічого не обрано)
        descriptionTextEl.style.display = 'none';
        optionsWrapperEl.style.display = 'none';

        // 2. Знімаємо .active з усіх карток
        allGameCards.forEach(card => {
            card.classList.remove('active');
        });

        // 3. Встановлюємо текст-заглушку
        titleEl.textContent = "Оберіть гру";
        subtitleEl.textContent = "Натисніть на іконку гри, щоб побачити її опис та налаштування.";
        descriptionTextEl.style.display = ''; // Показуємо текст-заглушку
    }

    initializePage(); // Запускаємо при завантаженні
});