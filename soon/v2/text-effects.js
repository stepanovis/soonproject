// Утилиты для анимации текста

// Создаем span для каждой буквы (для плавного появления без прыжков)
export function createTextSpans(text) {
    const fragment = document.createDocumentFragment();
    for (let char of text) {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        fragment.appendChild(span);
    }
    return fragment;
}

// Печатаем текст посимвольно
export function typeText(element, text, speed) {
    return new Promise(resolve => {
        // Создаем сразу весь текст, но невидимый
        const fragment = createTextSpans(text);
        element.appendChild(fragment);

        // Показываем буквы по одной
        const spans = element.querySelectorAll('span');
        let i = 0;

        function type() {
            if (i < spans.length) {
                spans[i].style.opacity = '1';
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

// Плавное появление текста
export function fadeInText(element, speed) {
    return new Promise(resolve => {
        const spans = element.querySelectorAll('span');
        let i = 0;

        function fadeNext() {
            if (i < spans.length) {
                spans[i].style.opacity = '1';
                i++;
                setTimeout(fadeNext, speed);
            } else {
                resolve();
            }
        }
        fadeNext();
    });
}

// Плавное исчезновение текста
export function fadeOutText(element, fromIndex, speed) {
    return new Promise(resolve => {
        const spans = element.querySelectorAll('span');
        let i = spans.length - 1;

        function fadeNext() {
            if (i >= fromIndex) {
                spans[i].style.opacity = '0';
                i--;
                setTimeout(fadeNext, speed);
            } else {
                // Удаляем невидимые spans
                for (let j = spans.length - 1; j >= fromIndex; j--) {
                    spans[j].remove();
                }
                resolve();
            }
        }
        fadeNext();
    });
}

// Управление глобальным курсором
let globalCursor = null;

export function showCursor(element) {
    if (globalCursor && globalCursor.parentNode) {
        globalCursor.remove();
    }
    globalCursor = document.createElement('span');
    globalCursor.className = 'cursor';
    element.appendChild(globalCursor);
}

export function hideCursor() {
    if (globalCursor && globalCursor.parentNode) {
        globalCursor.remove();
        globalCursor = null;
    }
}
