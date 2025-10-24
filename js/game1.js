/* ФАЙЛ: js/game1.js
  ОПИС: "Мозок" сторінки "Гри 1" (page-game1).
          Керує всім ігровим процесом: створенням вагонів,
          логікою Drag-n-Drop (через Interact.js), перевіркою,
          етапом запитань та етапом перевірки пам'яті.
*/

class Game1_Logic {
    constructor(params) {
        // --- 1. Отримання елементів DOM ---
        this.gameContainer = document.getElementById('page-game1')?.querySelector('.game-container');
        if (!this.gameContainer) { console.error("Game container not found."); return; }

        this.board = this.gameContainer.querySelector('#game-board');
        this.spawnArea = this.gameContainer.querySelector('#wagon-spawn-area');
        this.trainSlotsContainer = this.gameContainer.querySelector('#train-slots');
        this.cabinLetterEl = this.gameContainer.querySelector('#cabin-letter');
        this.gameMessage = this.gameContainer.querySelector('#game-message');
        this.indicator = this.gameContainer.querySelector('#game-indicator');
        // Нові елементи для етапів
        this.nextStageBtn = this.gameContainer.querySelector('#next-stage-btn');
        this.questionsSection = this.gameContainer.querySelector('#questions-section');
        this.questionsList = this.gameContainer.querySelector('#questions-list');
        this.memoryCheckBtn = this.gameContainer.querySelector('#memory-check-btn');
        this.recallOverlay = this.gameContainer.querySelector('#recall-overlay');
        this.recallGrid = this.gameContainer.querySelector('#recall-grid');
        this.recallFeedback = this.gameContainer.querySelector('#recall-feedback');
        this.recallSubmitBtn = this.gameContainer.querySelector('#recall-submit-btn');
        this.playAgainBtn = this.gameContainer.querySelector('#play-again-btn'); // Кнопка "Грати ще"

        // --- 2. Стан гри ---
        this.wagons = []; // Всі 10 DOM елементів вагонів
        this.slots = [];  // DOM елементи слотів
        this.correctWords = []; // Масив рядків правильних слів для цього рівня
        this.incorrectWordsUsed = []; // Масив рядків неправильних слів для цього рівня
        this.orderedCorrectWagons = []; // Масив DOM-ів правильних вагонів У ПОРЯДКУ в потязі
        this.currentTaskType = '';
        this.currentTaskLevel = '';
        this.gameState = 'ASSEMBLING'; // 'ASSEMBLING', 'QUESTIONS', 'RECALL', 'FINISHED'

        // --- 3. Константи ---
        this.REQUIRED_CORRECT = 6;
        this.REQUIRED_INCORRECT = 4;
        this.TOTAL_SLOTS = 6;
        this.RECALL_INCORRECT_COUNT = 3; // К-сть неправильних у тесті пам'яті

        // --- 4. Прив'язка методів ---
        this.scatterWagons = this.scatterWagons.bind(this);
        this.checkGameState = this.checkGameState.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragMove = this.handleDragMove.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDropZoneEnter = this.handleDropZoneEnter.bind(this);
        this.handleDropZoneLeave = this.handleDropZoneLeave.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        // Слухачі нових кнопок
        this.goToQuestionsStage = this.goToQuestionsStage.bind(this);
        this.goToRecallStage = this.goToRecallStage.bind(this);
        this.handleRecallSelection = this.handleRecallSelection.bind(this);
        this.submitRecall = this.submitRecall.bind(this);

        // --- 5. Перевірка Interact.js та ініціалізація ---
        if (typeof interact === 'undefined') {
            this.showError("Помилка: Не вдалося завантажити бібліотеку Interact.js");
            return;
        }

        this.initGame(params);
    }

    // ===================================
    // --- ІНІЦІАЛІЗАЦІЯ ТА ОЧИЩЕННЯ ---
    // ===================================

    initGame(params) {
        this.resetGameUI();

        const typeTag = params.get('type');
        const levelTag = params.get('level')?.toLowerCase();

        this.currentTaskType = typeTag;
        this.currentTaskLevel = levelTag;

        if (!typeTag || !levelTag) { this.showError("Помилка: Не вдалося отримати рівень гри."); return; }

        const tagMap = { "овочі": "овочі", "фрукти": "фрукти", "одяг": "одяг", "тварини": "тварина", "птахи": "птах", "посуд": "посуд", "на початку слова": "на початку", "в середині слова": "в середині", "в кінці слова": "в кінці" };
        const cleanTypeTag = typeTag.trim().toLowerCase();
        const dataTag = tagMap[cleanTypeTag];

        if (!dataTag) { this.showError(`Помилка: Невідомий тип гри "${typeTag}".`); return; }
        if (typeof GAME1_CONTENT === 'undefined' || !GAME1_CONTENT[levelTag]) { this.showError(`Помилка: База даних слів для букви "${levelTag}" не знайдена.`); return; }

        if(this.cabinLetterEl) this.cabinLetterEl.textContent = levelTag.toUpperCase();

        const wordList = GAME1_CONTENT[levelTag];
        const correctWordsData = wordList.filter(word => word.tags.includes(dataTag));
        const incorrectWordsData = wordList.filter(word => !word.tags.includes(dataTag));

        if (correctWordsData.length < this.REQUIRED_CORRECT || incorrectWordsData.length < this.REQUIRED_INCORRECT) {
            this.showError(`На жаль, для рівня "${typeTag} + ${levelTag.toUpperCase()}" ще не додано достатньо слів.`);
            return;
        }

        const finalCorrectWords = this.getRandomElements(correctWordsData, this.REQUIRED_CORRECT);
        const finalIncorrectWords = this.getRandomElements(incorrectWordsData, this.REQUIRED_INCORRECT);

        this.correctWords = finalCorrectWords.map(w => w.word);
        this.incorrectWordsUsed = finalIncorrectWords.map(w => w.word); // Зберігаємо неправильні
        const allGameWords = this.shuffleArray([...finalCorrectWords, ...finalIncorrectWords]);

        this.createSlots(this.TOTAL_SLOTS);
        this.createWagons(allGameWords);
        this.setupInteract();
        window.addEventListener('resize', this.scatterWagons);
        
        // Додаємо слухачі для нових кнопок
        this.nextStageBtn?.addEventListener('click', this.goToQuestionsStage);
        this.memoryCheckBtn?.addEventListener('click', this.goToRecallStage);
        this.recallSubmitBtn?.addEventListener('click', this.submitRecall);
        // Додаємо посилання для кнопки "Грати ще раз"
        if(this.playAgainBtn) this.playAgainBtn.onclick = () => { window.location.hash = '#index'; };

        this.gameState = 'ASSEMBLING'; // Починаємо з етапу збирання
        this.checkGameState();
    }

    resetGameUI() {
        // --- Повне очищення ---
        const oldWagons = this.board?.querySelectorAll('.wagon-card');
        oldWagons?.forEach(wagon => wagon.remove());

        if (this.trainSlotsContainer) this.trainSlotsContainer.innerHTML = '';
        if (this.cabinLetterEl) this.cabinLetterEl.textContent = '';
        if (this.questionsList) this.questionsList.innerHTML = '';
        if (this.recallGrid) this.recallGrid.innerHTML = '';
        if (this.recallFeedback) this.recallFeedback.textContent = '';


        this.wagons = [];
        this.slots = [];
        this.correctWords = [];
        this.incorrectWordsUsed = [];
        this.orderedCorrectWagons = [];
        this.currentTaskType = '';
        this.currentTaskLevel = '';
        this.gameState = 'ASSEMBLING';

        // --- Скидання видимості елементів ---
        if (this.spawnArea) this.spawnArea.style.opacity = '1';
        if (this.trainArea) this.trainArea.style.opacity = '1';
        if (this.nextStageBtn) this.nextStageBtn.style.display = 'none';
        if (this.questionsSection) this.questionsSection.style.display = 'none';
        if (this.recallOverlay) this.recallOverlay.style.display = 'none';
        if (this.recallSubmitBtn) this.recallSubmitBtn.style.display = 'block'; // Показати кнопку Готово
        if (this.playAgainBtn) this.playAgainBtn.style.display = 'none'; // Сховати Грати ще
        if (this.board) this.board.style.display = 'flex';

        // --- Знищення Interact.js ---
        if (typeof interact !== 'undefined') {
             interact('.wagon-card').unset();
             interact('.train-slot').unset();
             // Скидаємо слухачі для recall-grid, якщо були
             interact('.recall-wagon').unset();
        }

        this.updateGameStatus('grey'); // Початковий статус
    }

    createSlots(count) { // Без змін
        if (!this.trainSlotsContainer) return;
        for (let i = 0; i < count; i++) {
            const slot = document.createElement('div');
            slot.className = 'train-slot';
            slot.dataset.slotId = i;
            slot.dataset.occupied = 'false';
            this.trainSlotsContainer.appendChild(slot);
            this.slots.push(slot);
        }
    }

    createWagons(words) { // Видалено створення замка
        if (!this.board) return;

        words.forEach((wordData, index) => {
            const wagon = document.createElement('div');
            wagon.className = 'wagon-card';
            wagon.id = `wagon-${index}`;
            wagon.dataset.word = wordData.word;
            wagon.dataset.isCorrect = this.correctWords.includes(wordData.word).toString();
            wagon.dataset.currentSlot = 'none';

            const imgPath = `image/game1/${wordData.image}`;

            wagon.innerHTML = `
                <img src="${imgPath}" alt="${wordData.word}" class="wagon-image" draggable="false"
                     onerror="this.src='https://placehold.co/80x55/EEE/777?text=${wordData.word}'">
                <span class="wagon-label">${wordData.word}</span>
            `;

            this.board.appendChild(wagon);
            this.wagons.push(wagon);
        });

        setTimeout(this.scatterWagons, 50);
    }

    scatterWagons() { // Без змін
        if (!this.spawnArea || !this.board) return;
        const spawnRect = this.spawnArea.getBoundingClientRect();
        const boardRect = this.board.getBoundingClientRect();
        const spawnTop = spawnRect.top - boardRect.top;
        const spawnLeft = spawnRect.left - boardRect.left;

        this.wagons.forEach(wagon => {
            if (wagon.classList.contains('locked')) {
                const slotId = wagon.dataset.currentSlot;
                if(slotId !== 'none' && this.slots[slotId]) {
                    const slot = this.slots[slotId];
                    const slotRect = slot.getBoundingClientRect();
                    const x = slotRect.left - boardRect.left;
                    const y = slotRect.top - boardRect.top;
                    wagon.style.transform = `translate(${x}px, ${y}px)`;
                    wagon.dataset.x = x; wagon.dataset.y = y;
                }
                return;
            };

            const wagonRect = wagon.getBoundingClientRect();
            const wagonWidth = wagonRect.width || 100;
            const wagonHeight = wagonRect.height || 100;
            const maxX = spawnRect.width - wagonWidth - 40;
            const maxY = spawnRect.height - wagonHeight - 40;
            const randomX = Math.max(0, Math.floor(Math.random() * maxX));
            const randomY = Math.max(0, Math.floor(Math.random() * maxY));

            const finalX = spawnLeft + 20 + randomX;
            const finalY = spawnTop + 20 + randomY;

            wagon.style.transform = `translate(${finalX}px, ${finalY}px)`;
            wagon.dataset.x = finalX;
            wagon.dataset.y = finalY;
            wagon.dataset.spawnX = finalX;
            wagon.dataset.spawnY = finalY;
        });
    }

    // ===================================
    // --- ЛОГІКА INTERACT.JS (D&D) ---
    // ===================================

    setupInteract() { // Без змін
        interact('.wagon-card').draggable({
            inertia: true,
            modifiers: [ interact.modifiers.restrictRect({ restriction: this.board, endOnly: false }) ],
            autoScroll: true,
            listeners: { start: this.handleDragStart, move: this.handleDragMove, end: this.handleDragEnd }
        });

        interact('.train-slot').dropzone({
            accept: '.wagon-card',
            overlap: 0.5,
            listeners: { dragenter: this.handleDropZoneEnter, dragleave: this.handleDropZoneLeave, drop: this.handleDrop }
        });
    }

    handleDragStart(event) { // Без змін
        const wagon = event.target;
        if (wagon.classList.contains('locked')) {
            this.unlockWagon(wagon, false);
        }
        wagon.classList.add('dragging');
    }

    handleDragMove(event) { // Без змін
        const wagon = event.target;
        const x = (parseFloat(wagon.dataset.x) || 0) + event.dx;
        const y = (parseFloat(wagon.dataset.y) || 0) + event.dy;
        wagon.style.transform = `translate(${x}px, ${y}px)`;
        wagon.dataset.x = x; wagon.dataset.y = y;
    }

    handleDragEnd(event) { // Без змін
        const wagon = event.target;
        wagon.classList.remove('dragging');
        if (!wagon.classList.contains('locked')) {
             wagon.dataset.spawnX = wagon.dataset.x;
             wagon.dataset.spawnY = wagon.dataset.y;
        }
        // Перевіряємо стан ТІЛЬКИ якщо ми на етапі збирання
        if (this.gameState === 'ASSEMBLING') {
            this.checkGameState();
        }
    }

    handleDropZoneEnter(event) { // Без змін
        const slot = event.target;
        if (slot.dataset.occupied === 'false') { slot.classList.add('can-accept'); }
    }

    handleDropZoneLeave(event) { event.target.classList.remove('can-accept'); } // Без змін

    handleDrop(event) { // Без змін
        const wagon = event.relatedTarget;
        const slot = event.target;
        if (slot.dataset.occupied === 'false') { this.lockWagonToSlot(wagon, slot); }
        slot.classList.remove('can-accept');
        // Перевіряємо стан ТІЛЬКИ якщо ми на етапі збирання
        if (this.gameState === 'ASSEMBLING') {
            this.checkGameState();
        }
    }

    // ===================================
    // --- ЛОГІКА ГРИ (Статус, Етапи) ---
    // ===================================

    unlockWagon(wagon, returnToSpawn = false) { // Без змін
        wagon.classList.remove('locked');
        const slotId = wagon.dataset.currentSlot;
        if (slotId !== 'none' && this.slots[slotId]) { this.slots[slotId].dataset.occupied = 'false'; }
        wagon.dataset.currentSlot = 'none';
        if (returnToSpawn) { this.returnWagonToSpawn(wagon); }
    }

    lockWagonToSlot(wagon, slot) { // Без змін
        const slotRect = slot.getBoundingClientRect();
        const boardRect = this.board.getBoundingClientRect();
        const x = slotRect.left - boardRect.left;
        const y = slotRect.top - boardRect.top;
        wagon.style.transform = `translate(${x}px, ${y}px)`;
        wagon.dataset.x = x; wagon.dataset.y = y;
        wagon.classList.add('locked');
        const slotId = slot.dataset.slotId;
        slot.dataset.occupied = wagon.id;
        wagon.dataset.currentSlot = slotId;
    }

    returnWagonToSpawn(wagon) { // Без змін
        const x = wagon.dataset.spawnX; const y = wagon.dataset.spawnY;
        wagon.style.transform = `translate(${x}px, ${y}px)`;
        wagon.dataset.x = x; wagon.dataset.y = y;
    }

    /** Перевіряє стан гри і оновлює UI */
    checkGameState() {
        if (!this.gameContainer || this.gameState !== 'ASSEMBLING') return; // Працює тільки на етапі збирання

        const lockedWagons = this.board.querySelectorAll('.wagon-card.locked');
        let allCorrect = true;

        if (lockedWagons.length === this.TOTAL_SLOTS) {
            this.orderedCorrectWagons = []; // Очищуємо перед заповненням
            // Перевіряємо правильність І збираємо порядок для запитань
            this.slots.forEach(slot => {
                const wagonId = slot.dataset.occupied;
                if(wagonId && wagonId !== 'false') {
                    const wagon = this.board.querySelector(`#${wagonId}`);
                    if(wagon) {
                        this.orderedCorrectWagons.push(wagon); // Додаємо в масив порядку
                        if (wagon.dataset.isCorrect !== 'true') {
                            allCorrect = false;
                        }
                    } else {
                        allCorrect = false; // Помилка, вагона немає
                    }
                } else {
                    allCorrect = false; // Помилка, слот пустий
                }
            });

            if(allCorrect) {
                this.updateGameStatus('green');
                if (this.nextStageBtn) this.nextStageBtn.style.display = 'block'; // Показуємо кнопку "Далі"
                interact('.wagon-card').draggable(false); // Вимикаємо перетягування
            } else {
                this.updateGameStatus('red');
                if (this.nextStageBtn) this.nextStageBtn.style.display = 'none';
            }
        } else {
            // Гра в процесі
            this.updateGameStatus('grey');
            if (this.nextStageBtn) this.nextStageBtn.style.display = 'none';
        }
    }

    /** Перехід до етапу запитань */
    goToQuestionsStage() {
        this.gameState = 'QUESTIONS';
        if (this.nextStageBtn) this.nextStageBtn.style.display = 'none'; // Ховаємо кнопку "Далі"
        if (this.spawnArea) this.spawnArea.style.opacity = '0'; // Ховаємо зону спавну плавно
        if (this.trainArea) this.trainArea.style.opacity = '0.5'; // Робимо потяг напівпрозорим

        // Приховуємо неправильні вагони
        this.wagons.forEach(wagon => {
            if (wagon.dataset.isCorrect !== 'true') {
                wagon.classList.add('hidden');
            }
        });
        
        // Генеруємо та показуємо питання
        this.generateAndShowQuestions();
        if (this.questionsSection) this.questionsSection.style.display = 'flex';
        this.updateGameStatus('grey', "Дай відповіді на запитання (усно):"); // Нова інструкція
    }

    /** Генерує 6 випадкових запитань про порядок вагонів */
    generateAndShowQuestions() {
        if (!this.questionsList || this.orderedCorrectWagons.length !== this.TOTAL_SLOTS) return;
        this.questionsList.innerHTML = ''; // Очищуємо
        const questions = [];
        const wagonWords = this.orderedCorrectWagons.map(w => w.dataset.word);

        // Генеруємо питання "Хто ПІСЛЯ?" (5 можливих)
        for (let i = 0; i < this.TOTAL_SLOTS - 1; i++) {
            questions.push(`Який вагон їде після "${wagonWords[i]}"?`);
        }
        // Генеруємо питання "Хто ПЕРЕД?" (5 можливих)
        for (let i = 1; i < this.TOTAL_SLOTS; i++) {
            questions.push(`Який вагон їде перед "${wagonWords[i]}"?`);
        }
        // Генеруємо питання "Хто СПРАВА ВІД?" (5 можливих)
        for (let i = 0; i < this.TOTAL_SLOTS - 1; i++) {
            questions.push(`Який вагон стоїть справа від "${wagonWords[i]}"?`);
        }
        // Генеруємо питання "Хто ЗЛІВА ВІД?" (5 можливих)
        for (let i = 1; i < this.TOTAL_SLOTS; i++) {
            questions.push(`Який вагон стоїть зліва від "${wagonWords[i]}"?`);
        }
        // Можна додати ще питання про перший/останній

        // Вибираємо 6 випадкових питань
        const selectedQuestions = this.shuffleArray(questions).slice(0, 6);

        // Відображаємо питання
        selectedQuestions.forEach((q, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${q}`;
            this.questionsList.appendChild(li);
        });
    }

    /** Перехід до етапу перевірки пам'яті */
    goToRecallStage() {
        this.gameState = 'RECALL';
        if (this.questionsSection) this.questionsSection.style.display = 'none'; // Ховаємо питання
        if (this.recallOverlay) this.recallOverlay.style.display = 'flex'; // Показуємо оверлей
        if (this.recallFeedback) this.recallFeedback.textContent = ''; // Очищуємо фідбек

        // Готуємо вагони для перевірки
        this.setupRecallGrid();
        this.updateGameStatus('grey', "Пригадай 6 вагонів:"); // Нова інструкція
    }

    /** Готує сітку 3х3 з вагонами для перевірки пам'яті */
    setupRecallGrid() {
        if (!this.recallGrid) return;
        this.recallGrid.innerHTML = ''; // Очищуємо

        // Беремо 6 правильних слів
        const correctRecallWords = this.correctWords;
        // Беремо 3 випадкових з 4 неправильних слів, що використовувались
        const incorrectRecallWords = this.getRandomElements(this.incorrectWordsUsed, this.RECALL_INCORRECT_COUNT);

        // Об'єднуємо і перемішуємо
        const allRecallWords = this.shuffleArray([...correctRecallWords, ...incorrectRecallWords]);

        // Створюємо вагони для сітки
        allRecallWords.forEach(word => {
            // Знаходимо повні дані про вагон (включаючи картинку)
            const wordData = this.wagons.find(w => w.dataset.word === word)?.dataset;
            const originalWagon = this.wagons.find(w => w.dataset.word === word); // Знаходимо оригінал для копіювання HTML

            if (originalWagon) {
                 const recallWagon = document.createElement('div');
                 recallWagon.className = 'wagon-card recall-wagon'; // Додаємо клас для стилів і вибору
                 recallWagon.dataset.word = word;
                 recallWagon.innerHTML = originalWagon.innerHTML; // Копіюємо вміст
                 recallWagon.querySelector('.lock-toggle')?.remove(); // Видаляємо замок, якщо скопіювався
                 recallWagon.style.position = 'static'; // Змінюємо позиціонування
                 recallWagon.style.transform = 'none';
                 recallWagon.addEventListener('click', this.handleRecallSelection); // Додаємо слухач кліку
                 this.recallGrid.appendChild(recallWagon);
            }
        });
    }

    /** Обробляє клік по вагону на етапі перевірки пам'яті */
    handleRecallSelection(event) {
        if (this.gameState !== 'RECALL') return; // Працює тільки на цьому етапі
        const wagon = event.currentTarget;
        wagon.classList.toggle('selected'); // Додає/прибирає клас 'selected'
    }

    /** Обробляє натискання кнопки "Готово" на етапі перевірки */
    submitRecall() {
        if (!this.recallGrid || this.gameState !== 'RECALL') return;

        const selectedWagons = this.recallGrid.querySelectorAll('.wagon-card.selected');
        const selectedWords = Array.from(selectedWagons).map(w => w.dataset.word);
        let correctSelections = 0;

        selectedWords.forEach(word => {
            if (this.correctWords.includes(word)) {
                correctSelections++;
            }
        });

        const isSuccess = correctSelections === this.TOTAL_SLOTS && selectedWords.length === this.TOTAL_SLOTS;

        // Показуємо результат
        if (this.recallFeedback) {
            if (isSuccess) {
                this.recallFeedback.textContent = "Вітаємо! Все правильно!";
                this.recallFeedback.className = 'recall-feedback correct';
                this.updateGameStatus('green', "Гра завершена!");
            } else {
                 this.recallFeedback.textContent = `Не зовсім... Правильних: ${correctSelections} з ${this.TOTAL_SLOTS}. Спробуй ще раз!`;
                 this.recallFeedback.className = 'recall-feedback incorrect';
                 // Можна додати логіку підсвічування правильних/неправильних
                 this.updateGameStatus('red', "Помилка у перевірці пам'яті");
            }
        }
        
        // Завершуємо гру
        this.gameState = 'FINISHED';
        if (this.recallSubmitBtn) this.recallSubmitBtn.style.display = 'none'; // Ховаємо "Готово"
        if (this.playAgainBtn) this.playAgainBtn.style.display = 'block'; // Показуємо "Грати ще раз"
        // Вимикаємо можливість вибору
        this.recallGrid.querySelectorAll('.wagon-card').forEach(w => w.removeEventListener('click', this.handleRecallSelection));
    }


    // ===================================
    // --- ДОПОМІЖНІ ФУНКЦІЇ ---
    // ===================================

    showError(message) { // Без змін
        if (this.board) this.board.style.display = 'none';
        this.updateGameStatus('red', message);
    }

    updateGameStatus(status, message) { // Без змін
        if (this.indicator) {
            this.indicator.className = 'game-indicator';
            this.indicator.classList.add(status);
            const defaultTitles = { grey: "Завдання не виконано", red: "Помилка!", green: "Чудово! Завдання виконано!" };
            this.indicator.title = defaultTitles[status];
        }

        if (this.gameMessage) {
            const level = (this.currentTaskLevel || '?').toUpperCase();
            const type = this.currentTaskType || 'завдання';
            // Адаптуємо повідомлення під різні етапи
             let currentMessage = '';
             switch(this.gameState) {
                 case 'ASSEMBLING':
                     currentMessage = status === 'grey' ? `Завдання: [${level}]. Збери "${type}"! Перетягни 6 правильних вагонів на слоти.` :
                                      status === 'red'  ? `Завдання: [${level}]. Збери "${type}"! Знайдено помилку. Перетягни неправильний вагон зі слота.` :
                                                          `Молодець! Ти зібрав "${type}" на літеру [${level}]! Натисни "Далі".`;
                     break;
                 case 'QUESTIONS':
                      currentMessage = `Дай відповіді на запитання (усно) про порядок вагонів у потязі "${type}" [${level}]:`;
                      break;
                 case 'RECALL':
                      currentMessage = `Пригадай 6 вагонів "${type}" [${level}], які були у потязі.`;
                      break;
                 case 'FINISHED':
                       currentMessage = status === 'green' ? "Гра успішно завершена!" : "Спробуй ще раз!";
                       break;
                 default:
                       currentMessage = "Завантаження...";
             }

            this.gameMessage.textContent = message || currentMessage;
            this.gameMessage.style.display = 'block';
        }
    }

    getRandomElements(arr, n) { return this.shuffleArray([...arr]).slice(0, n); } // Без змін
    shuffleArray(arr) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; } // Без змін

    destroy() { // Додано очищення нових слухачів
        window.removeEventListener('resize', this.scatterWagons);
        this.nextStageBtn?.removeEventListener('click', this.goToQuestionsStage);
        this.memoryCheckBtn?.removeEventListener('click', this.goToRecallStage);
        this.recallSubmitBtn?.removeEventListener('click', this.submitRecall);
        this.recallGrid?.querySelectorAll('.wagon-card').forEach(w => w.removeEventListener('click', this.handleRecallSelection));
        if (typeof interact !== 'undefined') {
            interact('.wagon-card').unset();
            interact('.train-slot').unset();
            interact('.recall-wagon').unset(); // Переконаємось, що і це очищено
        }
        this.resetGameUI();
    }
}

