import React, { useEffect, useState } from 'react';

const Question = ({ onSendMessage }) => {
  const [question, setQuestion] = useState('');

  // Função para gerar uma pergunta aleatória (pode ser modificada para ser mais interativa)
  const getRandomQuestion = () => {
    const questions = [
      'O que é uma variável em programação?',
      'Explique o conceito de Herança em Programação Orientada a Objetos.',
      'Qual é a diferença entre um array e um objeto?',
      'O que é uma API?',
      'Como funciona o método POST em HTTP?'
    ];

    const randomIndex = Math.floor(Math.random() * questions.length);
    setQuestion(questions[randomIndex]);
  };

  // Chamado quando o componente é montado
  useEffect(() => {
    getRandomQuestion();
  }, []);

  return (
    <div className="question-box">
      <div className="question">
        <p>{question}</p>
      </div>
      <button onClick={onSendMessage}>Responder</button>
    </div>
  );
};

export default Question;
