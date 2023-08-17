import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDispatchContext } from "../contexts/UserContext";
import InputElement from "../components/InputElement";
import LoadingElement from "../components/LoadingElement";


// auth-challenge-nectia
const MOCK_URL = "https://run.mocky.io/v3/0814d59c-0602-43e4-ad27-db41b1e89d0d";


const USERS = [
    { username: "johndoe", password: "john123" },
    { username: "edu", password: "edu456" },
];


function Login() {
    const navigate = useNavigate();
    const { login } = useContext(UserDispatchContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);


    const searchUser = new Promise((resolve) => {
        setTimeout(() => {
            const usrIdx = USERS.findIndex(e => e.username === username);

            if (usrIdx < 0) {
                resolve({ name: "username", message: "Incorrect usename" });
            } else if (USERS[usrIdx].password !== password) {
                resolve({ name: "password", message: "Incorrect password" });
            } else {
                resolve(false);
            }
        }, 500);
    });


    const fetchAuth = () => {
        fetch(MOCK_URL)
            .then(response => response.json())
            .then(data => {
                login(data.auth);

                navigate("/home");
            })
            .catch(() => {
                setErrorMessages({ name: 'server', message: "Sorry, something went wrong. Try it later" });
                setIsSubmitted(false);
            });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessages({});
        setIsSubmitted(true);

        // Simulate the time for login request
        searchUser.then(err => {
            if (err) {
                setErrorMessages(err);
                setIsSubmitted(false);
            } else {
                fetchAuth();
            }
        });
    };


    const renderErrorMessage = (value) => {
        return value === errorMessages.name ?
            <div className="text-red-500 text-left">{errorMessages.message}</div>
        : null;
    };


    return (
        <>
            <div className="grid grid-cols-3 gap-3">
                <div />
                <div className="rounded-xl border-solid border-2 border-gray-300 p-4">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <h1>Login</h1>

                        <div className="flex flex-col gap-2">
                            <InputElement
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={e => setUsername(e.target.value)}
                            />

                            {renderErrorMessage('username')}
                        </div>


                        <div className="flex flex-col gap-2">
                            <InputElement
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                            />

                            {renderErrorMessage('password')}
                        </div>

                        <button
                            type="submit"
                            className="bg-red-500 text-white rounded-xl p-2 font-bold uppercase cursor-pointer"
                            disabled={!(username && password) || isSubmitted}
                        >
                            {isSubmitted ? <LoadingElement /> : "Log in"}
                        </button>

                        {renderErrorMessage('server')}
                    </form>
                </div>
                <div />
            </div>
        </>
    );
}


export default Login;
