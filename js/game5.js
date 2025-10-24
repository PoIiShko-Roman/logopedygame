/* ФАЙЛ: js/game5.js
 * ПРИЗНАЧЕННЯ: Унікальна логіка ТІЛЬКИ для "Гри 5" (game5.html).
 *
 * КОДУ ПОКИ ЩО НЕМАЄ.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    console.log("Логіка для 'Гри 5' (Щелепа) завантажена!");

    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) return;
    
    gameContainer.innerHTML = `
        <h2>Гра "Щелепа"</h2>
        <p>Повторюйте вправи, які бачите на екрані.</p>
        <!-- Сюди можна додати анімації або відео вправ -->
    `;
});
