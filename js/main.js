/* ФАЙЛ: js/main.js
 * ПРИЗНАЧЕННЯ: Глобальна логіка.
 * Цей файл підключається на ВСІХ сторінках сайту.
 * Вміст: Логіка бургер-меню.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // === ЗОНА: ЛОГІКА БУРГЕР-МЕНЮ (Працює на всіх сторінках) ===
    
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            // '.is-active' -> анімація кнопки в "Х"
            menuToggle.classList.toggle('is-active'); 
            // '.nav-active' -> показ/приховування <nav>
            mainNav.classList.toggle('nav-active'); 
        });
    }
});

