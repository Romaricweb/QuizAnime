const questions = [
    { 
        question: "Quel est le nom de famille de Satoru ?", 
        answers: ["Zenin", "Gojo"], 
        correct: "Gojo" 
    },
    { 
        question: "Quel est le nom de famille de Naruto ?", 
        answers: ["Uchiha", "Uzumaki"], 
        correct: "Uzumaki" 
    },
    { 
        question: "Quel est le nom de famille de Luffy ?", 
        answers: ["Portgas", "Monkey"], 
        correct: "Monkey" 
    },
    { 
        question: "Quel est le nom de famille de Light ?", 
        answers: ["Yagami", "Amano"], 
        correct: "Yagami" 
    },
    { 
        question: "Quel est le nom de famille de Ichigo ?", 
        answers: ["Abarai", "Kurosaki"], 
        correct: "Kurosaki" 
    },
    { 
        question: "Quel est le nom de famille d'Edward (Fullmetal Alchemist) ?", 
        answers: ["Mustang", "Elric"], 
        correct: "Elric" 
    },
    { 
        question: "Quel est le nom de famille de Goku ?", 
        answers: ["Son", "Vegeta"], 
        correct: "Son" 
    },
    { 
        question: "Quel est le nom de famille d'Eren (Attack on Titan) ?", 
        answers: ["Jeager", "Ackerman"], 
        correct: "Jeager" 
    },
    { 
        question: "Quel est le nom de famille de Killua (Hunter x Hunter) ?", 
        answers: ["Zoldyck", "Freecss"], 
        correct: "Zoldyck" 
    },
    { 
        question: "Quel est le nom de famille d'Ash (Pokémon) ?", 
        answers: ["Oak", "Ketchum"], 
        correct: "Ketchum" 
    }
];

let currentQuestionIndex = 0;

function renderQuestion(index) {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = `
        <div class="question">
            <h1>Question ${index + 1}</h1>
            <h2>${questions[index].question}</h2>
            ${questions[index].answers.map(answer => `
                <button onclick="checkAnswer('${answer}', '${questions[index].correct}')">${answer}</button>
            `).join('')}
        </div>
    `;
    document.getElementById('nextButton').style.display = 'none';
}

function checkAnswer(selected, correct) {
    const buttons = document.querySelectorAll('#quiz button');

    // Réinitialiser les classes de tous les boutons
    buttons.forEach(button => {
        button.classList.remove('correct-answer', 'wrong-answer');
    });

    if (selected === correct) {
        showModal("~•Bonne réponse !•~");
        document.getElementById('nextButton').style.display = 'block';

        // Appliquer l'effet vert sur le bouton correct
        buttons.forEach(button => {
            if (button.textContent === selected) {
                button.classList.add('correct-answer');
            }
            button.disabled = true; // Désactiver tous les boutons
            button.style.cursor = 'not-allowed';
        });
    } else {
        showModal("Mauvaise réponse ! Le quiz va redémarrer.");
        
        // Appliquer l'effet rouge sur le bouton incorrect
        buttons.forEach(button => {
            if (button.textContent === selected) {
                button.classList.add('wrong-answer');
            }
            button.disabled = true; // Désactiver les boutons incorrects
            button.style.cursor = 'not-allowed';
        });

        // Réinitialiser le quiz après une courte pause pour laisser voir l'effet de vibration
        setTimeout(resetQuiz, 1000);
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        renderQuestion(currentQuestionIndex);
    } else {
        showModal("Bravo ! Vous avez terminé le quiz.");
        document.getElementById('nextButton').style.display = 'none';
    }
}

function resetQuiz() {
    // Réinitialiser l'index des questions et rendre la première question
    currentQuestionIndex = 0;
    renderQuestion(currentQuestionIndex);
}

function showModal(message) {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    modalText.textContent = message;
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = "none";
}

// Initialiser la première question
renderQuestion(currentQuestionIndex);
