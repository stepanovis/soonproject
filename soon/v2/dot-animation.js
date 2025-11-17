// Анимация движущейся точки между SOON, NEVER, TODAY
export function initDotAnimation() {
    const movingDot = document.getElementById('moving-dot');
    const dotPlaceholder1 = document.getElementById('dot-placeholder-1');
    const dotPlaceholder2 = document.getElementById('dot-placeholder-2');

    // Получаем позиции placeholder'ов
    function updateDotPositions() {
        const rect1 = dotPlaceholder1.getBoundingClientRect();
        const rect2 = dotPlaceholder2.getBoundingClientRect();
        const containerRect = document.querySelector('.title-container').getBoundingClientRect();

        return {
            pos1: {
                left: rect1.left - containerRect.left,
                top: rect1.top - containerRect.top
            },
            pos2: {
                left: rect2.left - containerRect.left,
                top: rect2.top - containerRect.top
            }
        };
    }

    // Запускаем бесконечную анимацию точки
    (async () => {
        await new Promise(resolve => setTimeout(resolve, 100));

        while (true) {
            const positions = updateDotPositions();

            // Позиция 1 (после SOON)
            movingDot.style.left = positions.pos1.left + 'px';
            movingDot.style.top = positions.pos1.top + 'px';
            movingDot.style.opacity = '1';

            await new Promise(resolve => setTimeout(resolve, 3000));

            // Опускаемся вниз (быстро)
            movingDot.style.transition = 'all 0.3s ease-out';
            movingDot.style.top = (positions.pos1.top + 80) + 'px';
            await new Promise(resolve => setTimeout(resolve, 300));

            // Едем вправо (медленно)
            movingDot.style.transition = 'all 1.2s ease-in-out';
            movingDot.style.left = positions.pos2.left + 'px';
            await new Promise(resolve => setTimeout(resolve, 1200));

            // Поднимаемся вверх (быстро)
            movingDot.style.transition = 'all 0.3s ease-out';
            movingDot.style.top = positions.pos2.top + 'px';
            await new Promise(resolve => setTimeout(resolve, 300));

            await new Promise(resolve => setTimeout(resolve, 3000));

            // Опускаемся вниз (быстро)
            movingDot.style.transition = 'all 0.3s ease-out';
            movingDot.style.top = (positions.pos2.top + 80) + 'px';
            await new Promise(resolve => setTimeout(resolve, 300));

            // Едем влево (медленно)
            movingDot.style.transition = 'all 1.2s ease-in-out';
            movingDot.style.left = positions.pos1.left + 'px';
            await new Promise(resolve => setTimeout(resolve, 1200));

            // Поднимаемся вверх (быстро)
            movingDot.style.transition = 'all 0.3s ease-out';
            movingDot.style.top = positions.pos1.top + 'px';
            await new Promise(resolve => setTimeout(resolve, 300));
        }
    })();
}
