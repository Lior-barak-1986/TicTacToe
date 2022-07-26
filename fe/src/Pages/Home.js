import React, { useState } from 'react';

export default function Home(props) {
    const { submit } = props; 
    const [name, setName] = useState("");
    const [nick, setNick] = useState("");
    const onSubmit = e => {
        e.preventDefault();
        submit(name,nick);
    }
    return (
        <>
            <h1>Welcome to tic tac toe</h1>
            <form onSubmit={onSubmit} className='formContainer'>
                <div className='form-control'>
                    <label htmlFor="username" >Name:</label>
                </div>
                <div className='form-control'>
                    <input
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        id="username"
                        type="string" />
                </div>
                <div className='form-control'>
                    <label htmlFor="nickname">Nick name:</label>
                </div>
                <div className='form-control'>
                    <input
                        required
                        value={nick}
                        onChange={e => setNick(e.target.value)}
                        id="nickname"
                        type="string" />
                </div>
                <div className='bottom center'>
                    <button type='submit'>Register</button>
                </div>
            </form>
        </>
    )
}
