/* ФАЙЛ: js/game3.js
 * ПРИЗНАЧЕННЯ: Унікальна логіка ТІЛЬКИ для "Гри 3" (game3.html).
 *
 * КОДУ ПОКИ ЩО НЕМАЄ.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    console.log("Логіка для 'Гри 3' (Тварини) завантажена!");

    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) return;
    
    // Оскільки опцій на index.html не було, ми просто
    // завантажуємо головний екран гри
    gameContainer.innerHTML = `
        <h2>Гра "Тварини"</h2>
        <p>Натисніть на тварину, щоб почути її звук.</p>
        <!-- Сюди можна додати кнопки з тваринами -->
    `;
});
