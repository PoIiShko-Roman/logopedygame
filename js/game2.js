/* ФАЙЛ: js/game2.js
 * ПРИЗНАЧЕННЯ: Унікальна логіка ТІЛЬКИ для "Гри 2" (game2.html).
 *
 * КОДУ ПОКИ ЩО НЕМАЄ.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    console.log("Логіка для 'Гри 2' (Склад) завантажена!");

    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const level = urlParams.get('level'); // Напр., "МА"

    if (level) {
        gameContainer.innerHTML = `
            <h2>Гра "Склад"</h2>
            <p>Обрано склад: <strong>${level}</strong></p>
        `;
    } else {
         gameContainer.innerHTML = `
            <h2>Гра "Склад"</h2>
            <p>Поверніться на <a href="index.html">головну сторінку</a> та оберіть рівень.</p>
        `;
    }
});
