import { useState } from 'react'
import axios from 'axios'

export function useLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [userInfo, setUserInfo] = useState(null)

    const handleLogin = async () => {
        setError('')
        try {
            const res = await axios.post('/api/users/login', { username, password })
            setUserInfo(res.data.user)
        } catch (err) {
            setError('Login failed: ' + (err?.response?.data?.message || 'Unknown error'))
        }
    }

    return {
        username,
        setUsername,
        password,
        setPassword,
        error,
        userInfo,
        handleLogin
    }
}
export function useRegister() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        setError('');

        if (!username || !email || !password || !roleId) {
            setError('Vui lòng nhập đầy đủ thông tin.');
            return false; // ❌ không tiếp tục nếu thiếu field
        }

        try {
            await axios.post('/api/users', {
                username,
                email,
                password,
                roleId: parseInt(roleId, 10)
            });
            alert('Đăng ký thành công, vui lòng đăng nhập!');
            return true; // ✅ success
        } catch (err) {
            console.log('Register error:', err?.response?.data);
            setError('Đăng ký thất bại: ' + (err?.response?.data?.message || 'Lỗi không xác định'));
            return false; // ❌ failure
        }
    };

    return {
        username, setUsername,
        email, setEmail,
        password, setPassword,
        roleId, setRoleId,
        error,
        handleRegister
    };
}
