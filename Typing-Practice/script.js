document.addEventListener('DOMContentLoaded', () => {
    const textContainer = document.getElementById('textContainer');
    const inputArea = document.getElementById('inputArea');
    const wpmDisplay = document.getElementById('wpm');
    const accuracyDisplay = document.getElementById('accuracy');
    const restartBtn = document.getElementById('restartBtn');

    const sampleParagraph = " In the heart of a bustling city, nestled between towering skyscrapers and busy streets, lies a small, serene park that offers a brief escape from the chaos of urban life. This green oasis, with its lush lawns, vibrant flowerbeds, and the gentle sound of a bubbling fountain, provides a haven for both city dwellers and weary travelers. People come here to read a book under the shade of an ancient oak, have a leisurely picnic with friends, or simply sit on a bench and watch the world go by. Despite the constant hum of city life just beyond its borders, the park remains a peaceful retreat where one can find a moment of tranquility and reconnect with nature. The quick brown fox jumps over the lazy dog. This sentence is used for typing practice.";
    
    const words = sampleParagraph.split(' ');
    let wordIndex = 0;
    let startTime, intervalId;

    function displayText() {
        textContainer.innerHTML = words.map((word, index) => {
            return `<span class="word" id="word-${index}">${word}</span>`;
        }).join(' ');
    }

    function updateTextHighlight() {
        const inputText = inputArea.value.trim();
        const inputWords = inputText.split(' ');

        words.forEach((word, index) => {
            const wordElement = document.getElementById(`word-${index}`);
            if (inputWords[index] === undefined) {
                wordElement.classList.remove('correct', 'incorrect');
            } else if (inputWords[index] === word) {
                wordElement.classList.add('correct');
                wordElement.classList.remove('incorrect');
            } else {
                wordElement.classList.add('incorrect');
                wordElement.classList.remove('correct');
            }
        });
    }

    function updateStats() {
        const currentTime = new Date().getTime();
        const timeElapsed = (currentTime - startTime) / 1000 / 60; // in minutes
        const inputText = inputArea.value.trim();
        const wordsTyped = inputText.split(/\s+/).length;
        const wpm = Math.round(wordsTyped / timeElapsed);

        let correctChars = 0;

        for (let i = 0; i < inputText.length; i++) {
            if (inputText[i] === sampleParagraph[i]) {
                correctChars++;
            }
        }

        const accuracy = Math.round((correctChars / sampleParagraph.length) * 100);

        wpmDisplay.textContent = isNaN(wpm) ? 0 : wpm;
        accuracyDisplay.textContent = isNaN(accuracy) ? 100 : accuracy;
    }

    inputArea.addEventListener('input', () => {
        if (inputArea.value.length === 1 && !startTime) {
            startTime = new Date().getTime();
            intervalId = setInterval(updateStats, 1000);
        }

        if (inputArea.value.trim().split(' ').length >= words.length) {
            clearInterval(intervalId);
        }

        updateTextHighlight();
        updateStats();
    });

    restartBtn.addEventListener('click', () => {
        inputArea.value = '';
        clearInterval(intervalId);
        startTime = null;
        wordIndex = 0;
        displayText();
        wpmDisplay.textContent = '0';
        accuracyDisplay.textContent = '100';
    });

    displayText();
});
