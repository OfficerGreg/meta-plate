import React from 'react';
import './UserInfoCard.css';

const UserInfoCard = ({ user }) => {
    return (
            <div className="info-card">
                <div className="user-info-card__row">
                    <div className="user-info-card__text">
                        <h3>username</h3>
                    </div>
                    <div className="user-info-card__info">
                        {user.username}
                    </div>
                </div>
                <hr />
                <div className="user-info-card__row">
                    <div className="user-info-card__text">
                        <h3>email</h3>
                    </div>
                    <div className="user-info-card__info">
                        {user.email}
                    </div>
                </div>
                <hr />
                <div className="user-info-card__row">
                    <div className="user-info-card__text">
                        <h3>phone</h3>
                    </div>
                    <div className="user-info-card__info">
                        076 449 816 9029
                    </div>
                </div>
                <hr />
                <div className="user-info-card__row">
                    <div className="user-info-card__text">
                        <h3>Password</h3>
                    </div>
                    <div className="user-info-card__info">
                        ****************
                    </div>
                </div>
                <hr />
                <div className="user-info-card__row">
                    <div>
                        <a className="user-info-card__edit-btn" target="_blank">edit</a>
                    </div>
                </div>
            </div>
    );
};

export default UserInfoCard;
