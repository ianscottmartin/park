import React, { useState } from "react";

function LoginForm({ onLogin }) {
    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const loginInfo = {
            username: form.username,
            password: form.password
        }
        fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginInfo)
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((user) => onLogin(user))
                }
                else {
                    r.json().then((error) => alert(error.message))
                }
            })
        setForm({
            username: '',
            password: ''
        })

    }

    return (
        <form onSubmit={handleSubmit}>
            <h4>Username:</h4>
            <input
                type='text'
                placeholder="Username..."
                name='username'
                id='username'
                autoComplete='off'
                value={form.username}
                onChange={handleChange}
            />
            <h4>Password:</h4>
            <input
                type='password'
                placeholder="Password..."
                name='password'
                id='password'
                autoComplete='current-password'
                value={form.password}
                onChange={handleChange}
            />
            <button type='submit'>Login</button>
        </form>
    );
}

export default LoginForm;