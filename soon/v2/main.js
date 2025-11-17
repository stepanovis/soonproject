// Основная логика приложения
import { createTextSpans } from './text-effects.js';

const SIMULATED_HOLDERS = 1247;

// Загрузка данных из JSON
async function fetchData() {
    try {
        const response = await fetch('sentences.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.paragraphs;
    } catch (error) {
        console.error('Error fetching data:', error);
        const typingContainer = document.getElementById('typing-container');
        typingContainer.innerHTML = '<p>Error loading content.</p>';
        return [];
    }
}

// Основная анимация контента
async function startTypingAnimation(paragraphs) {
    const typingContainer = document.getElementById('typing-container');
    const buttonContainer = document.getElementById('button-container');

    if (!paragraphs || paragraphs.length === 0) {
        return;
    }

    // Ждем пару секунд перед показом текста
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Параграф 1 - первое предложение + happiness
    const intro = document.createElement('p');
    intro.className = 'intro-text';
    typingContainer.appendChild(intro);

    const fullIntroText = paragraphs[0].sentences[0].text + ' Happiness that could be.';
    intro.appendChild(createTextSpans(fullIntroText));

    await new Promise(resolve => setTimeout(resolve, 300));

    // Показываем первое предложение
    const firstSentenceLength = paragraphs[0].sentences[0].text.length;
    let spans = intro.querySelectorAll('span');
    for (let i = 0; i < firstSentenceLength; i++) {
        spans[i].style.opacity = '1';
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    // Показываем пробел и второе предложение
    for (let i = firstSentenceLength; i < spans.length; i++) {
        spans[i].style.opacity = '1';
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    await new Promise(resolve => setTimeout(resolve, 1500));

    // Карусель пунктов - они заменяют друг друга
    const items = [
        'Say "I love you"',
        'Call parents',
        'Learn language',
        'Travel',
        'Start project',
        'Start a new life'
    ];

    // Создаем один блок для карусели
    const carouselBlock = document.createElement('p');
    carouselBlock.className = 'carousel-item';
    typingContainer.appendChild(carouselBlock);

    // Находим самый длинный текст для резервирования места
    let longestItem = items[0];
    for (let item of items) {
        if (item.length > longestItem.length) {
            longestItem = item;
        }
    }

    // Резервируем место под самый длинный текст
    carouselBlock.appendChild(createTextSpans(longestItem));
    let carouselSpans = carouselBlock.querySelectorAll('span');

    // Функция показа одного пункта
    async function showCarouselItem(text) {
        // Скрываем весь блок
        carouselBlock.style.opacity = '0';

        await new Promise(resolve => setTimeout(resolve, 200));

        // Обновляем текст
        for (let i = 0; i < text.length; i++) {
            carouselSpans[i].textContent = text[i];
            carouselSpans[i].style.opacity = '1';
            carouselSpans[i].style.display = 'inline';
        }

        // ПОЛНОСТЬЮ УДАЛЯЕМ лишние буквы из отображения
        for (let i = text.length; i < carouselSpans.length; i++) {
            carouselSpans[i].style.display = 'none';
        }

        // Показываем весь блок сразу
        carouselBlock.style.opacity = '1';
    }

    // Показываем пункты по кругу несколько раз
    let currentIndex = 0;
    let cycles = 0;
    const maxCycles = 2; // 2 полных круга
    let keepRunning = true;

    // Запускаем карусель
    (async () => {
        while (keepRunning && cycles < maxCycles) {
            await showCarouselItem(items[currentIndex]);
            await new Promise(resolve => setTimeout(resolve, 1500));

            currentIndex++;
            if (currentIndex >= items.length) {
                currentIndex = 0;
                cycles++;
            }
        }
    })();

    // Ждем 2 круга
    await new Promise(resolve => {
        const checkInterval = setInterval(() => {
            if (cycles >= maxCycles) {
                clearInterval(checkInterval);
                keepRunning = false;
                resolve();
            }
        }, 100);
    });

    await new Promise(resolve => setTimeout(resolve, 1500));

    // Показываем кнопку
    setTimeout(() => {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'button-wrapper';

        const button = document.createElement('a');
        button.href = "https://pump.fun";
        button.className = 'final-button';
        button.textContent = 'I choose TODAY';

        const subtext = document.createElement('div');
        subtext.className = 'button-subtext';
        subtext.textContent = `Join ${SIMULATED_HOLDERS} holders on Pump.fun`;

        buttonWrapper.appendChild(button);
        buttonWrapper.appendChild(subtext);
        buttonContainer.appendChild(buttonWrapper);

        setTimeout(() => {
            buttonWrapper.classList.add('visible');
        }, 50);

    }, 1500);
}

// Инициализация при загрузке DOM
export function initApp() {
    const holdersCount = document.getElementById('holders-count');
    holdersCount.textContent = `${SIMULATED_HOLDERS} holders chose TODAY`;

    fetchData().then(startTypingAnimation);
}
