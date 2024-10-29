import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api-token-auth/', { username, password })
            .then(response => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                axios.get('http://127.0.0.1:8000/api/user/', {
                    headers: { 'Authorization': `Token ${token}` }
                }).then(userResponse => {
                    onLoginSuccess(token, userResponse.data.is_staff);
                });
            }).catch(() => setError('로그인 실패: 사용자 이름 또는 비밀번호를 확인하세요.'));
    };

    return (
        <div>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="사용자 이름" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
                <button type="submit">로그인</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
