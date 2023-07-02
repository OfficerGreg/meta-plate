import React, { useEffect, useState } from 'react';
import './topnav.css';
import { Link, useHistory } from 'react-router-dom';
import Dropdown from '../dropdown/Dropdown';
import ThemeMenu from '../thememenu/ThemeMenu';
import notifications from '../../assets/JsonData/notification.json';
import user_image from '../../assets/images/profilepicture.png';
import user_menu from '../../assets/JsonData/user_menus.json';
import httpClient from '../../httpClient';

const Topnav = () => {
    const [user, setUser] = useState(null);
    const history = useHistory();

    //special function for rendreUserMenu
    const logoutUser = async () => {
        await httpClient.post("//localhost:5000/logout");
        history.push('/');
    };
    const navigateProfile = async () => {
        history.push('/profile');
    };

    const navigateSettings = async () => {
        history.push('/settings');
    };

    //special for renderUserMenu
    const getOnClickHandler = (functionName) => {
        switch (functionName) {
            case 'logoutUser':
                return logoutUser;
            case 'navigateProfile':
                return navigateProfile;
            case 'navigateSettings':
                return navigateSettings;
            default:
                return null;
        }
    };

    const renderNotificationItem = (item, index) => (
        <div className="notification-item" key={index}>
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    );

    const renderUserToggle = (user) => (
        <div className="topnav__right-user">
            <div className="topnav__right-user__image">
                <img src={user_image} alt="" />
            </div>
            <div className="topnav__right-user__name">{user && user.username}</div>
        </div>
    );

    const renderCoin = () => (
        <div className="topnav__right-user">
            <div className="topnav__right-user__image">
                <i className="bx bx-dollar-circle" style={{ fontSize: '42px'}}></i>
            </div>
            <div className="topnav__right-user__name">2150</div>
        </div>
    );

    const renderUserMenu = (item, index) => (
        <Link onClick={getOnClickHandler(item.function)} key={index}>
            <div className="notification-item">
                <i className={item.icon}></i>
                <span>{item.content}</span>
            </div>
        </Link>
    );

    //Get user fetch
    const fetchUserData = async () => {
        try {
            const response = await httpClient.get('//localhost:5000/@me');
            setUser(response.data);
        } catch (error) {
            console.log('Not authenticated');
            history.push('/login');
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="topnav">
            <div className="topnav__search">
                <input type="text" placeholder="Search here..." />
                <i className="bx bx-code-block"></i>
            </div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* dropdown here */}
                    <Dropdown
                        customToggle={() => renderCoin()}
                    />
                </div>
                <div className="topnav__right-item">
                    {/* dropdown here */}
                    <Dropdown
                        customToggle={() => renderUserToggle(user)}
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}
                    />
                </div>
                <div className="topnav__right-item">
                    <Dropdown
                        icon="bx bx-bell"
                        badge="12"
                        contentData={notifications}
                        renderItems={(item, index) => renderNotificationItem(item, index)}
                        renderFooter={() => <Link to="/">View All</Link>}
                    />
                    {/* dropdown here */}
                </div>
                <div className="topnav__right-item">
                    <ThemeMenu />
                </div>
            </div>
        </div>
    );
};

export default Topnav;
