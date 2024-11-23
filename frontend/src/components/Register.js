import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
            alert('Usuário registrado com sucesso!');
            window.location.href = '/login';
        } catch (err) {
            setError('Falha no registro. Tente novamente.');
        }
    };

    return (
        <div>
            <h2>Cadastro</h2>
            <form onSubmit={handleRegister}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nome de usuário" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
                <button type="submit">Cadastrar</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Register;
