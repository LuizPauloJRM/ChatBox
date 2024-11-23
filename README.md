# ChatBox
  Chat Box com login senha cadastro de usuários meu chat Box serão perguntas de programação para facilitar os estudantes de programação fullstack 

# Passo a Passo: Chat Box com Login, Cadastro e Perguntas de Programação

Este documento detalha todos os passos para criar um sistema de Chat Box com autenticação, cadastro de usuários e perguntas de programação para ajudar estudantes de Full-Stack.

## 1. Configuração do Ambiente

### 1.1 Instalar as Dependências
Certifique-se de ter o **Node.js** e o **npm** instalados. Depois, configure o projeto:
```bash
mkdir chatbox-projeto
cd chatbox-projeto
mkdir backend frontend
```

### 1.2 Inicializar o Backend e o Frontend
No backend:
```bash
cd backend
npm init -y
npm install express mongoose bcrypt jsonwebtoken cors dotenv
```

No frontend:
```bash
cd ../frontend
npx create-react-app .
```

---

## 2. Configuração do Backend

### 2.1 Estrutura do Backend
Crie a seguinte estrutura de diretórios e arquivos:

```
backend/
│
├── models/
│   ├── User.js
│   └── Question.js
│
├── routes/
│   ├── authRoutes.js
│   └── questionRoutes.js
│
├── server.js
├── .env
└── package.json
```

---

### 2.2 Configuração do Servidor

#### Arquivo `server.js`
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);

// Conexão ao MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error(err));

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
```

---

### 2.3 Modelos no MongoDB

#### Modelo de Usuário
Arquivo `models/User.js`:
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Hash da senha antes de salvar
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);
```

#### Modelo de Perguntas
Arquivo `models/Question.js`:
```javascript
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
});

module.exports = mongoose.model('Question', questionSchema);
```

---

### 2.4 Rotas de Autenticação

Arquivo `routes/authRoutes.js`:
```javascript
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Senha incorreta' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

---

### 2.5 Rotas de Perguntas

Arquivo `routes/questionRoutes.js`:
```javascript
const express = require('express');
const Question = require('../models/Question');
const router = express.Router();

// Obter perguntas por categoria e dificuldade
router.get('/', async (req, res) => {
    const { category, difficulty } = req.query;

    try {
        const questions = await Question.find({ category, difficulty });
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

---

## 3. Configuração do Frontend

### 3.1 Estrutura do Frontend
Organize seu frontend:
```
frontend/
│
├── src/
│   ├── components/
│   │   ├── ChatBox.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── Question.js
│   │
│   ├── pages/
│   │   ├── Home.js
│   │   └── Dashboard.js
│   │
│   └── App.js
```

#### Continue criando os componentes conforme necessário.
