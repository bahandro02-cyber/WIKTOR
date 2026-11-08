import { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "Что означает HTML?",
    answers: ["HyperText Markup Language", "Home Tool", "High Text"],
    correct: 0
  },
  {
    question: "Какой язык отвечает за стили?",
    answers: ["Python", "CSS", "Java"],
    correct: 1
  },
  {
    question: "Что такое React?",
    answers: ["Библиотека JavaScript", "База данных", "Игра"],
    correct: 0
  },
  {
    question: "Какой тег создаёт заголовок?",
    answers: ["<p>", "<h1>", "<img>"],
    correct: 1
  },
  {
    question: "Какой язык добавляет интерактивность?",
    answers: ["JavaScript", "CSS", "HTML"],
    correct: 0
  }
];

function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  function handleAnswer(index) {
    if (selected !== null) return;

    setSelected(index);

    if (index === questions[current].correct) {
      setScore((prev) => prev + 1);
    }
  }

  function nextQuestion() {
    if (current === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrent((prev) => prev + 1);
      setSelected(null);
    }
  }

  function restart() {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  const question = questions[current];

  return (
    <div className="app">
      <div className="quiz">
        <h1>🧠 Quiz Master</h1>

        {finished ? (
          <div className="result">
            <h2>🎉 Викторина завершена!</h2>
            <h3>Твой результат</h3>
            <div className="score">
              {score} / {questions.length}
            </div>
            <p>
              {score >= 4
                ? "Отличная работа!"
                : "Попробуй ещё раз!"}
            </p>
            <button className="restart" onClick={restart}>
              Начать заново
            </button>
          </div>
        ) : (
          <>
            <div className="progress">
              Вопрос {current + 1} из {questions.length}
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${((current + 1) / questions.length) * 100}%`
                }}
              />
            </div>

            <h2>{question.question}</h2>

            <div className="answers">
              {question.answers.map((item, index) => {
                let className = "answer";

                if (selected !== null) {
                  if (index === question.correct) {
                    className += " correct";
                  } else if (index === selected) {
                    className += " wrong";
                  }
                }

                return (
                  <button
                    key={index}
                    className={className}
                    onClick={() => handleAnswer(index)}
                    disabled={selected !== null}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div className="feedback">
                {selected === question.correct
                  ? "✅ Правильный ответ!"
                  : "❌ Неправильно!"}

                <button className="next" onClick={nextQuestion}>
                  {current === questions.length - 1
                    ? "Результат"
                    : "Следующий вопрос →"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
