import { authService } from "fbase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider ,signInWithPopup } from "firebase/auth";
import { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [NewAccount, setNewAccount] = useState(true);
    const [err, setErr] = useState("");
    const onChange = (event) => {
        const {placeholder, value} = event.target;
        if(placeholder === "Email") {
            setEmail(value);
        } else if(placeholder === "Password") {
            setPassword(value);
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if(NewAccount) {
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data)
        } catch(err) {
            setErr(err.message);
        }
    }
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async (event) => {
        const {name} = event.target;
        let provider;
        if(name === "google") {
            provider = new GoogleAuthProvider();
        } else if(name === "github") {
            provider = new GithubAuthProvider();
        }
        await signInWithPopup(authService, provider);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                type="email" placeholder="Email" 
                required value={email}
                onChange={onChange} />
                <input 
                type="password" placeholder="Password" 
                required value={password}
                onChange={onChange} />
                <input type="submit" value={NewAccount ? "Create Account" : "Sign In"} />
            </form>
            {err}
            <button onClick={toggleAccount}>{NewAccount ? "Sign In" : "Create Account"}</button>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with GitHub</button>
            </div>
        </div>
    )
}

export default Auth;