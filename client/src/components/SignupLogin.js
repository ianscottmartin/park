import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";




function SignupLogin({ onLogin }) {
    const [login, setLogin] = useState(true)

    return (
        <>
            {login ?
                (<div>
                    <LoginForm onLogin={onLogin} />
                    <p>No account? Sign up now.</p>
                    <button onClick={() => setLogin(false)}>Sign up</button>
                </div>)
                :
                (<div>
                    <SignupForm onLogin={onLogin} />
                    <p>Account holder? Login.</p>
                    <button onClick={() => setLogin(true)}>Sign in</button>
                </div>
                )}
        </>
    )
}

export default SignupLogin;