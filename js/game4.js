/* ФАЙЛ: js/game4.js
 * ПРИЗНАЧЕННЯ: Унікальна логіка ТІЛЬКИ для "Гри 4" (game4.html).
 *
 * КОДУ ПОКИ ЩО НЕМАЄ.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    console.log("Логіка для 'Гри 4' (Звуки) завантажена!");

    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const level = urlParams.get('level'); // Напр., "С"

    if (level) {
        gameContainer.innerHTML = `
            <h2>Гра "Звуки"</h2>
            <p>Ви тренуєте звук: <strong>${level}</strong></p>
        `;
    } else {
         gameContainer.innerHTML = `
            <h2>Гра "Звуки"</h2>
            <p>Поверніться на <a href="index.html">головну сторінку</a> та оберіть звук.</p>
        `;
    }
});
