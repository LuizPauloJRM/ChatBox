/*import React, { useState } from 'react';
import Question from './Question';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Função para enviar a mensagem
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
  };

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? 'message user' : 'message bot'}>
            {msg.text}
          </div>
        ))}
      </div>
      
      <Question onSendMessage={handleSendMessage} />
      
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua resposta..."
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatBox;*/
// frontend/src/components/ChatBox.js
import React, { useState } from 'react';
import axios from 'axios';

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  // Função para enviar a mensagem para a API e obter a resposta
  const sendMessage = async () => {
    if (userMessage.trim() === '') return;

    // Adiciona a mensagem do usuário ao chat
    setMessages([...messages, { text: userMessage, sender: 'user' }]);

    try {
      // Envia a mensagem para o backend que vai acessar a API do OpenAI
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: userMessage,
      });

      // Adiciona a resposta do bot ao chat
      setMessages([...messages, { text: userMessage, sender: 'user' }, { text: response.data.message, sender: 'bot' }]);
      setUserMessage('');
    } catch (error) {
      console.error('Erro ao enviar mensagem para o bot:', error);
    }
  };

  return (
    <div className="chatbox">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Escreva sua pergunta"
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}

export default ChatBox;
