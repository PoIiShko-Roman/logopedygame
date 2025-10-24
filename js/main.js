/* ФАЙЛ: js/main.js
  ОПИС: Головний керуючий файл (точка входу).
          Ініціалізує бургер-меню та SPA-роутер,
          який керує перемиканням сторінок (хеш-навігація).
*/

// --- ГЛОБАЛЬНІ ЗМІННІ ТА СТАН ---

// Зберігаємо тут активні об'єкти логіки, щоб їх можна було "знищити"
let activeGameInstance = null;
let activeIndexLogic = null;

// === 1. ЛОГІКА БУРГЕР-МЕНЮ ===
function initBurgerMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        // При кліку на бургер
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active'); // Анімація "хрестика"
            mainNav.classList.toggle('nav-active'); // Показ/приховування меню
        });
    }
}

// === 2. ЛОГІКА SPA-РОУТЕРА (Керування сторінками) ===

/**
 * Головна функція-роутер. 
 * Викликається при завантаженні сторінки та при кожній зміні хешу.
 */
function handleRouteChange() {
    
    // 1. "Знищуємо" логіку попередньої сторінки
    // Це потрібно для очищення слухачів подій та стану гри
    if (activeGameInstance) {
        activeGameInstance.destroy();
        activeGameInstance = null;
    }
    if (activeIndexLogic) {
        activeIndexLogic.destroy();
        activeIndexLogic = null;
    }

    // 2. Отримуємо новий хеш (e.g. #game1?type=Овочі&level=С)
    const hash = window.location.hash;
    
    // Розбиваємо хеш на сторінку (#game1) та параметри (?type=...)
    const [page, queryString] = hash.split('?');
    const params = new URLSearchParams(queryString || '');
    
    // Отримуємо чистий ID сторінки ('index', 'about', 'game1')
    const pageId = page.substring(1) || 'index'; 

    // 3. Ховаємо всі сторінки
    document.querySelectorAll('.page-section').forEach(p => {
        p.classList.remove('active');
    });
    
    // 4. Оновлюємо активні посилання в хедері
    document.querySelectorAll('.nav-item').forEach(link => {
        // Отримуємо чистий хеш з посилання (e.g. #index)
        const linkHash = (new URL(link.href)).hash;
        const linkPageId = linkHash.split('?')[0].substring(1) || 'index';
        
        let isLinkActive = false;
        if (linkPageId === 'index') {
            // Посилання "Вправи" (#index) має бути активним і для #index, і для #game1
            isLinkActive = (pageId === 'index' || pageId.startsWith('game'));
        } else {
            // Інші посилання (e.g. #about) активні тільки при точному збігу
            isLinkActive = (pageId === linkPageId);
        }
        link.classList.toggle('active-page', isLinkActive);
    });
    
    // 5. Закриваємо мобільне меню при переході (якщо воно було відкрите)
    document.getElementById('menu-toggle')?.classList.remove('is-active');
    document.getElementById('main-nav')?.classList.remove('nav-active');

    // 6. Ініціалізуємо логіку для потрібної сторінки
    const targetPage = document.getElementById(`page-${pageId}`);
    
    if (targetPage) {
        // A. Сторінка знайдена
        targetPage.classList.add('active'); // Показуємо її

        // Запускаємо відповідний клас логіки
        if (pageId === 'index') {
            // Створюємо новий об'єкт логіки для головної
            activeIndexLogic = new Index_Logic();
        } else if (pageId === 'game1') {
            // Створюємо новий об'єкт логіки для гри, передаємо параметри
            activeGameInstance = new Game1_Logic(params);
        }
        // для 'about' логіка не потрібна
        
    } else {
        // B. Сторінка не знайдена (404)
        // Просто показуємо головну сторінку
        const pageIndex = document.getElementById('page-index');
        if (pageIndex) {
            pageIndex.classList.add('active');
            activeIndexLogic = new Index_Logic(); // І запускаємо її логіку
        }
        window.location.hash = '#index'; // Скидаємо хеш
    }
}

// === 3. ЗАПУСК ЗАСТОСУНКУ ===

// Чекаємо, поки весь HTML буде завантажено
document.addEventListener('DOMContentLoaded', () => {
    
    // Ініціалізуємо бургер-меню
    initBurgerMenu();
    
    // Обробляємо початковий хеш (або ставимо #index)
    if (!window.location.hash) {
        window.location.hash = '#index';
    } else {
        // Якщо хеш вже є (e.g. сторінку оновили), запускаємо роутер
        handleRouteChange(); 
    }

    // Слухаємо подальші зміни хешу (кліки по посиланнях)
    window.addEventListener('hashchange', handleRouteChange);
});

