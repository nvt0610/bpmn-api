import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../api/userLogin'; // 👈 sửa đúng lại ở đây


export default function Register() {
    const {
        username, setUsername,
        email, setEmail,
        password, setPassword,
        roleId, setRoleId,
        error,
        handleRegister
    } = useRegister();

    const navigate = useNavigate();

    const submitRegister = async () => {
        const success = await handleRegister();
        if (success) {
            navigate('/login');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                placeholder="Role ID"
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
            />
            <button onClick={submitRegister}>Register</button>
            <button onClick={() => navigate('/login')}>Back</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
