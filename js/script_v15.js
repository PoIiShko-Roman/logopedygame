/**
 * Логопедичні ігри - Ітерація 15
 * * Цей скрипт керує:
 * 1. Логікою бургер-меню (для мобільних пристроїв).
 * 2. Інтерактивною сіткою вибору ігор на головній сторінці.
 * 3. Динамічним оновленням блоку опису гри та кнопок вправ.
 */
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

    // === ЛОГІКА СІТКИ ІГОР ===
    
    // Знаходимо ключові елементи на сторінці
    const gameGrid = document.getElementById('game-grid');
    const titleEl = document.getElementById('game-title');
    const subtitleEl = document.getElementById('game-subtitle');
    // ОНОВЛЕНО: (Ітерація 15) Отримуємо новий контейнер-обгортку
    const optionsWrapperEl = document.getElementById('game-options-wrapper');

    // "Guard Clause": Якщо ми не на головній сторінці (де є gameGrid),
    // припиняємо виконання коду, щоб уникнути помилок.
    if (!gameGrid || !titleEl) {
        return; 
    }

    /**
     * "Єдине джерело правди" (Single Source of Truth)
     * Вся інформація про ігри зберігається тут.
     * JS читає `data-game-id` і бере дані звідси.
     */
    const gameDescriptions = {
        1: { 
            title: "Гра 1: Звуковий Лабіринт", 
            subtitle: "Допоможи герою знайти вихід, правильно повторюючи звуки.",
            // === ОНОВЛЕНО (Ітерація 15) ===
            // Створено 3 окремі групи опцій згідно з вашим запитом
            optionsGroups: [
                {
                    text: "Одяг:",
                    buttons: ["Ш", "С", "Р", "Л", "П", "К", "Т", "М", "В", "Ф"] // 10 букв
                },
                {
                    text: "Їжа:",
                    buttons: ["А", "О", "У", "І", "Е", "М", "К", "Р", "Л", "П", "С", "Т", "В", "Н", "Д"] // 15 букв
                },
                {
                    text: "Речі:",
                    buttons: ["Б", "Г", "З", "Й", "Х", "Ц", "Ч", "Ш", "Щ", "Ж"] // 10 букв
                }
            ]
            // === КІНЕЦЬ ОНОВЛЕННЯ ===
        },
        2: { 
            title: "Гра 2: Складовий Експрес", 
            subtitle: "Збери потяг, де кожен вагон - це склад. Разом вони утворять слово.",
            // ОНОВЛЕНО: (Ітерація 15) Переведено на нову структуру
            optionsGroups: [
                {
                    text: "Тип слів:",
                    buttons: ["Прості", "Складні"]
                }
            ]
        },
        3: { 
            title: "Гра 3: Римувальні Пари", 
            subtitle: "Гра 'Memory'. Знайди дві картки, назви яких римуються.",
            // ОНОВЛЕНО: (Ітерація 15) Переведено на нову структуру
            optionsGroups: [
                {
                    text: "Рівень:",
                    buttons: ["Легкий", "Середній"]
                }
            ]
        },
        4: { 
            title: "Гра 4: Історії по Картках", 
            subtitle: "Розстав 4-5 картинок у правильній послідовності та склади історію.",
            // ОНОВЛЕНО: (Ітерація 15) Переведено на нову структуру
            optionsGroups: [
                {
                    text: "Кількість:",
                    buttons: ["3", "4", "5"]
                }
            ]
        },
        5: { 
            title: "Гра 5: Артикуляційна Гімнастика", 
            subtitle: "Повторюй вправи для язика та губ разом з анімованим персонажем.",
            // ОНОВЛЕНО: (Ітерація 15) Переведено на нову структуру
            optionsGroups: [
                {
                    text: "Вправи:",
                    buttons: ["Губи", "Язик"]
                }
            ]
        },
    };

    /**
     * Головна функція, що оновлює всю інформацію про обрану гру.
     * @param {string} gameId - ID обраної гри (напр., "1", "2" тощо).
     */
    function setActiveGame(gameId) {
        const allCards = gameGrid.querySelectorAll('.game-card');
        const desc = gameDescriptions[gameId];

        // 1. Оновлення класів .active на іконках
        allCards.forEach(card => {
            card.classList.toggle('active', card.dataset.gameId === gameId);
        });

        // 2. Оновлення тексту опису
        if (desc) {
            titleEl.textContent = desc.title;
            subtitleEl.textContent = desc.subtitle;

            // === ОНОВЛЕНО: Логіка рендерингу кнопок (Ітерація 15) ===
            
            // 1. Повністю очищуємо обгортку
            optionsWrapperEl.innerHTML = '';

            // 2. Перевіряємо, чи є для гри "optionsGroups"
            if (desc.optionsGroups && desc.optionsGroups.length > 0) {
                
                // 3. Створюємо та додаємо кожну групу як новий рядок
                desc.optionsGroups.forEach(group => {
                    // Створюємо HTML-вміст для одного рядка
                    let buttonsHTML = '';
                    group.buttons.forEach(btnText => {
                        // Всі кнопки ведуть на game1, як ви просили
                        buttonsHTML += `<a href="game1_v15.html" class="letter-btn">${btnText}</a>`;
                    });

                    const rowHTML = `
                        <div class="game-options-row">
                            <div class="game-options-text">${group.text}</div>
                            <div class="game-options-buttons">
                                ${buttonsHTML}
                            </div>
                        </div>
                    `;
                    
                    // Додаємо згенерований рядок в обгортку
                    optionsWrapperEl.innerHTML += rowHTML;
                });

                // 4. Показуємо обгортку
                optionsWrapperEl.style.display = 'flex';
            } else {
                // 5. Якщо груп опцій немає, ховаємо обгортку
                optionsWrapperEl.style.display = 'none';
            }
            // === КІНЕЦЬ ОНОВЛЕННЯ ===
            
        } else {
            // Якщо дані гри не знайдені (запасний варіант)
            titleEl.textContent = "Помилка";
            subtitleEl.textContent = "Опис для цієї гри не знайдено.";
            optionsWrapperEl.style.display = 'none';
        }
    }

    // === Обробники Подій ===

    // Обробник кліку на сітку ігор
    gameGrid.addEventListener('click', (e) => {
        // .closest() знаходить найближчого батька з класом .game-card
        const clickedCard = e.target.closest('.game-card');
        
        // Якщо клік був не по картці, нічого не робимо
        if (!clickedCard) return;

        const gameId = clickedCard.dataset.gameId;
        setActiveGame(gameId);
    });

    /**
     * Функція для оптимізації (debouncing)
     * Дозволяє виконати функцію лише один раз 
     * після завершення серії подій (напр., resize).
     */
    function debounce(func, delay = 200) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    // === Ініціалізація ===

    // Встановлюємо гру 1 як активну за замовчуванням
    // при завантаженні сторінки.
    setActiveGame("1");

});


