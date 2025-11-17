document.addEventListener('DOMContentLoaded', () => {
    const leftParts = document.querySelectorAll('.left-part .word-part');
    const rightParts = document.querySelectorAll('.right-part .word-part');
    let currentIndex = 0;

    function switchWord() {
        // Убираем active класс с текущих частей
        leftParts[currentIndex].classList.remove('active');
        rightParts[currentIndex].classList.remove('active');

        // Переходим к следующему слову
        currentIndex = (currentIndex + 1) % leftParts.length;

        // Добавляем active класс к новым частям
        leftParts[currentIndex].classList.add('active');
        rightParts[currentIndex].classList.add('active');
    }

    // Меняем слово каждые 2 секунды
    setInterval(switchWord, 2000);
});
