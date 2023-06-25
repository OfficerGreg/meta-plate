import React from 'react';
import './useraccounts.css';

const UserAccounts = ({ user }) => {
    return (
        <div className="user-accounts">
            <h3>Weitere Konten</h3>
            <div>
                <span>Github:</span>
                <a>{user.email}</a>
            </div>
            <div>
                <span>GitLab:</span>
                <a >{user.email}</a>
            </div>
            <div>
                <span>Google:</span>
                <a>{user.username}@gmail.com</a>
            </div>
            <div>
                <span>Microsoft:</span>
                <a>{user.username}@wiss-edu.ch</a>
            </div>
        </div>
    );
};

export default UserAccounts;
