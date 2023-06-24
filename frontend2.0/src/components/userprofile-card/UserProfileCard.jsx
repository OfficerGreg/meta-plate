import React from 'react';
import './userproileCard.css';

const UserProfileCard = ({ user, logoutUser }) => {
    return (
        <div className="user-profile-card card__body">
            <div className="profile">
                <div className="user-profile-card__image-container">
                    <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Admin"
                        className="rounded-circle user-profile-card__image"
                    />
                </div>
                <div className="user-profile-card__info">
                    <h4>{user.username}</h4>
                    <h4>ID: #{user.id}</h4>
                    <p className="text-secondary mb-1">Student Application Developer</p>
                    <p className="text-muted font-size-sm">WISS Altstetten, ZH</p>
                    <button onClick={logoutUser}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfileCard;
