import React from 'react'
import "../css/home.css"

const home: React.FC = () => {
    return <div>
        <h1 className='testing'>Meta Plate</h1>
        <br/>
        <a href="/login"><button>Login</button></a>
        <a href="/register"><button>Register</button></a>
    </div>
};

export default home