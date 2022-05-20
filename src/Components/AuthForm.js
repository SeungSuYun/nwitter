import { authService } from "fbase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const AuthForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [NewAccount, setNewAccount] = useState(true);
    const [err, setErr] = useState("");

    const onChange = (event) => {
        const { placeholder, value } = event.target;
        if (placeholder === "Email") {
            setEmail(value);
        } else if (placeholder === "Password") {
            setPassword(value);
        };
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (NewAccount) {
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                data = await signInWithEmailAndPassword(authService, email, password);
            };
        } catch (err) {
            setErr(err.message);
        };
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <div>
            <form onSubmit={onSubmit} className="container">
                <input
                    type="email" placeholder="Email"
                    required value={email}
                    onChange={onChange} className="authInput" />
                <input
                    type="password" placeholder="Password"
                    required value={password}
                    onChange={onChange} className="authInput" />
                <input type="submit" value={NewAccount ? "Create Account" : "Sign In"}
                className="authInput authSubmit" />
            </form>
            {err && <span className="authError">{err}</span>}
            <span onClick={toggleAccount} className="authSwitch">{NewAccount ? "Sign In" : "Create Account"}</span>
        </div>
    )
}

export default AuthForm