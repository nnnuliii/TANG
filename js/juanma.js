document.addEventListener('DOMContentLoaded', () => {
    const dots = document.querySelectorAll('.dot');
    const tooltipjuma = document.createElement('div');
    tooltipjuma.classList.add('tooltipjuma');
    document.body.appendChild(tooltipjuma);

    const circleContainer = document.querySelector('.circle-container');
    const radius = circleContainer.offsetWidth / 2 - 10; // 10 is half the dot size (20px / 2)

    dots.forEach((dot, index) => {
        const angle = (index / dots.length) * (2 * Math.PI);
        const x = radius + radius * Math.cos(angle) - 10;
        const y = radius + radius * Math.sin(angle) - 10;
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;

        dot.addEventListener('click', (e) => {
            dots.forEach(d => d.classList.remove('clicked')); // Remove 'clicked' class from all dots
            dot.classList.add('clicked'); // Add 'clicked' class to the clicked dot

            const text = dot.getAttribute('data-text').replace(/\\n/g, '<br>'); // Replace \n with <br>
            tooltipjuma.innerHTML = text;
            tooltipjuma.style.display = 'block'; // Display tooltipjuma before calculating width
            tooltipjuma.style.zIndex = '1000'; // 确保 tooltipjuma 在前面

            // Get the width and height of the tooltip
            const tooltipjumaWidth = tooltipjuma.offsetWidth;
            const tooltipjumaHeight = tooltipjuma.offsetHeight;

            // Get the position of the dot
            const dotRect = dot.getBoundingClientRect();
            const dotX = dotRect.left + window.scrollX;
            const dotY = dotRect.top + window.scrollY;

            // Position the tooltipjuma to the left of the clicked dot
            const tooltipjumaX = dotX - tooltipjumaWidth - 10; // 10px for spacing
            const tooltipjumaY = dotY + (dotRect.height / 2) - (tooltipjumaHeight / 2);

            tooltipjuma.style.left = `${tooltipjumaX}px`;
            tooltipjuma.style.top = `${tooltipjumaY}px`;
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.classList.contains('dot')) {
            tooltipjuma.style.display = 'none';
        }
    });
});
