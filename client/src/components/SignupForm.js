import React, { useState } from "react";


function SignupForm({ onLogin }) {
    const [form, setForm] = useState({
        username: '',
        password: '',
        alias: '',
    })

    const [errors, setErrors] = useState([])

    function handleChange(e) {
        const { name, value } = e.target

        setForm({
            ...form,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const signupInfo = {
            username: form.username,
            password: form.password,
            alias: form.alias,

        }
        fetch('/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signupInfo)
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((user) => onLogin(user))
                }
                else {
                    r.json().then((error) => setErrors(error))
                }
            })
        setForm({
            username: '',
            password: '',
            alias: '',

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
            <h4>Alias:</h4>
            <input
                type='text'
                placeholder=".Alias"
                name='alias'
                id='alias'
                autoComplete='off'
                value={form.alias}
                onChange={handleChange}
            />

            <button type="submit">Sign Up</button>
            <div>
                {errors.map((err) => {
                    return alert(err)
                })}
            </div>
        </form>
    )
}

export default SignupForm;