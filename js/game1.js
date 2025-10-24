/* ФАЙЛ: js/game1.js
 * ПРИЗНАЧЕННЯ: Унікальна логіка ТІЛЬКИ для "Гри 1" (game1.html).
 *
 * ОНОВЛЕННЯ:
 * 1. Скрипт тепер зчитує з URL два параметри:
 * - type (напр., "Одяг")
 * - level (напр., "Ш")
 * 2. Відображає обидва параметри на сторінці.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    console.log("Логіка для 'Гри 1' (Потяг) завантажена!");

    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) {
        console.error("Не можу знайти '#game-container'!");
        return;
    }

    // Зчитуємо параметри гри з URL
    // (Наприклад, ?type=Одяг&level=Ш)
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const level = urlParams.get('level');

    // Перевіряємо, чи ми отримали ОБИДВА параметри
    if (type && level) {
        gameContainer.innerHTML = `
            <h2>Гра "Потяг" починається!</h2>
            <p>
                Ваше завдання - завантажити вагони для типу: 
                <strong>${type}</strong> 
                (літера: <strong>${level}</strong>)
            </p>
            <!-- 
              Скоро тут буде сама гра (Canvas або Drag-n-Drop)
            -->
        `;
    } else {
         // Якщо чогось не вистачає, просимо повернутися
         gameContainer.innerHTML = `
            <h2>Гра "Потяг"</h2>
            <p>Помилка. Будь ласка, поверніться на <a href="index.html">головну сторінку</a> та оберіть тип слів і літеру.</p>
        `;
    }

    // ... 
    // ... Тут буде вся унікальна логіка для самої "Гри 1"
    // ...

});

