import React from 'react'

import { Link } from 'react-router-dom'

import './sidebar.css'

import logo from '../../assets/images/MetaPlate.svg'

import sidebar_items from '../../assets/JsonData/sidebar_routes.json'

const SidebarItem = props => {

    const active = props.active ? 'active' : ''

    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}

const Sidebar = props => {

    const activeItem = sidebar_items.findIndex(item => item.route === props.location.pathname)

    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 236" width="1120" height="236" className='svg'>
                    <title>New Project</title>
                    <defs>
                        <image width="1640" height="664" id="img1" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABmgAAAKYAQMAAABNauWRAAAAAXNSR0IB2cksfwAAAAZQTFRF////////VXz1bAAAAAJ0Uk5T/wDltzBKAAACgElEQVR4nO3PQRHAIBDAQJzXWp1RCTybY3YVJGsBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABHzx7FTZebLjddbrrcdLnpctPlpstNl5suN11uutx0uely0+Wmy02Xmy43XW663HS56XLT5abLTZebLjddbrrcdLnpctPlpstNl5suN11uutx0uely0+Wmy02Xmy43XW663HS56XLT5abLTZebLjddbrrcdLnpctPlpstNl5suN11uutx0uely0+Wmy02Xmy43XW663HS56XLT5abLTZebLjddbrrcdLnpctPlpstNl5suN11uutx0uely0+Wmy02Xmy43XW663HS56XLT5abLTZebLjddbrrcdLnpctPlpstNl5suN11uutx0uely0+Wmy02Xmy43XW663HS56XLT5abLTZebLjddbrrcdLnpctPlpstNl5suN11uutx0uely0+Wmy02Xmy43XW663HS56XLT5abLTZebLjddbrrcdLnpctPlpstNl5suN11uutx0uely0+Wmy02Xmy43XW663HS56XLT5abLTZebLjddbrrcdLnpctPlpstNl5suN11uutx0uely0+Wmy02Xmy43XW663HS56XLT5abLTZebLjddbrrcdLnpctPlpstNl5suN11uutx0uely0zX75j3ku/mPmy43XW663HS56XLT5abLTZebLjddbrrcdLnpctPlpstNl5suN11uutx0uely0+Wmy02Xmy43XW663HS56XLT5abLTZebLjddbrrcdLnpctPlpstNl5suN11uutx0uely0+Wmy02Xmy43XW663HS56XLT5abLTZebLjddbrrcdLnpctPlpuvumw8ejmjIDcRwEQAAAABJRU5ErkJggg==" />
                    </defs>
                    <style>
                    </style>
                    <use id="Background" href="#img1" x="-241" y="-119" />
                    <path id="Metaplate x WISS" fill-rule="evenodd" class="s0" d="m90.9 155h-16.5v-72.2h17l20.6 42.9 20.6-42.9h16.9v72.2h-16.7v-36.7l-12 25.3h-17.5l-12.4-25.5zm95.2-9.7h5q6.9 0 6.9-4.8v-3.4h16.5v5q0 6-6.2 9.5-5.7 3.4-13.9 3.4h-11.6q-13.3 0-18.6-7.4-1.7-2.4-1.7-5.5v-28.3q0-5.9 5.8-9.3 6.1-3.6 14.5-3.6h11.6q8.2 0 13.9 3.4 6.2 3.5 6.2 9.5v16.2h-35.5v10.5q0 4.8 7.1 4.8zm5-34.8h-5q-7.1 0-7.1 4.8v5h19v-5q0-4.8-6.9-4.8zm60.2 0.2v29.8q0 4.8 6.9 4.8h4.3v9.7h-7.6q-13.3 0-18.6-7.4-1.8-2.4-1.8-5.5v-31.4h-10v-9.7h10v-12.2h16.8v12.2h10.5v9.7zm49.3 0h-5q-7.1 0-7.1 4.8v1.7h-16.5v-3.4q0-5.9 5.8-9.3 6.1-3.5 14.3-3.5h11.8q8.2 0 14.1 3.5 6 3.4 6 9.3v41.2h-16.5v-1.5q-3.8 1.5-8.5 1.5h-7.4q-13.2 0-18.6-7.4-1.7-2.4-1.7-5.4v-8.6q0-5.7 5.8-9.1 6.1-3.6 14.5-3.6h8.3q4.7 0 7.6 1.9v-7.3q0-4.8-6.9-4.8zm-5.7 34.6h5.7q6.9 0 6.9-4.8v-5.3q-0.4-4.7-6.9-4.7h-5.7q-7.1 0-7.1 4.8v5.2q0 4.8 7.1 4.8zm74.1 9.7h-8.2q-5 0-7.8-2.1v18.1h-16.5v-70.1h16.5v1.5q3.8-1.4 8.5-1.4h7.5q8.3 0 14 3.5 6.2 3.4 6.2 9.3v28.3q0 6-6 9.5-5.9 3.4-14.2 3.4zm-3.2-44.3h-5.7q-7.1 0-7.1 4.8v25.2q0.4 4.6 7.1 4.6h5.7q6.9 0 6.9-4.8v-25q0-4.8-6.9-4.8zm54.5 44.3h-16.6v-69.1h16.6zm42.4-44.3h-5q-7.1 0-7.1 4.8v1.7h-16.6v-3.4q0-5.9 5.9-9.4 6-3.4 14.3-3.4h11.7q8.3 0 14.2 3.4 6 3.5 6 9.4v41.2h-16.5v-1.6q-3.8 1.6-8.5 1.6h-7.4q-13.3 0-18.6-7.4-1.7-2.5-1.7-5.4v-8.6q0-5.7 5.8-9.2 6.1-3.6 14.5-3.6h8.3q4.6 0 7.6 1.9v-7.2q0-4.8-6.9-4.8zm-5.7 34.6h5.7q6.9 0 6.9-4.8v-5.4q-0.4-4.6-6.9-4.6h-5.7q-7.1 0-7.1 4.8v5.2q0 4.8 7.1 4.8zm65.7-34.6v29.8q0 4.8 6.9 4.8h4.3v9.7h-7.6q-13.3 0-18.6-7.4-1.8-2.5-1.8-5.6v-31.3h-10v-9.7h10v-12.2h16.8v12.2h10.5v9.7zm43.6 34.6h5q6.9 0 6.9-4.8v-3.5h16.6v5q0 6.1-6.3 9.5-5.6 3.5-13.9 3.5h-11.6q-13.2 0-18.6-7.4-1.7-2.5-1.7-5.6v-28.2q0-5.9 5.8-9.4 6.1-3.6 14.5-3.6h11.6q8.3 0 13.9 3.5 6.3 3.4 6.3 9.5v16.2h-35.6v10.5q0 4.8 7.1 4.8zm5-34.8h-5q-7.1 0-7.1 4.8v5h19v-5q0-4.8-6.9-4.8zm69.5-9.7h16.5l15.7 17.8 15.7-17.8h16.6l-24 27.1 24 27.1h-16.8l-15.5-17.6-15.7 17.6h-16.5l24-27.1zm183.6 54.1h-16.8l-12.2-42.6-12.2 42.6h-16.6l-20.7-72.2h16.6l12.4 43.3 12.2-43.3h16.8l12 43.3 12.4-43.3h16.8zm44.4 0h-16.5v-72.2h16.5zm50.6-14.5v-15.7q0-4.8-7.1-4.8h-10.2q-13.4 0-18.6-7.3-1.7-2.4-1.7-5.5v-11.6q0-5.8 5.8-9.3 6.1-3.6 14.5-3.6h13.5q8.4 0 14.3 3.5 6 3.4 6 9.4v7.1h-16.5v-5.5q0-4.8-7.1-4.8h-6.9q-7.1 0-7.1 4.8v8.3q0 5.1 7.1 4.8h10.2q8.4 0 14.3 3.4 6 3.5 6 9.5v18.8q0 6.1-6.2 9.5-5.7 3.5-14.1 3.5h-13.5q-13.3 0-18.6-7.5-1.7-2.4-1.7-5.5v-9.6h16.5v8.1q0 4.8 7.1 4.8h6.9q7.1 0 7.1-4.8zm66.5 0v-15.7q0-4.8-7.1-4.8h-10.1q-13.5 0-18.6-7.3-1.8-2.4-1.8-5.5v-11.6q0-5.8 5.9-9.3 6-3.6 14.5-3.6h13.4q8.5 0 14.3 3.5 6.1 3.4 6.1 9.4v7.1h-16.6v-5.5q0-4.8-7.1-4.8h-6.9q-7 0-7 4.8v8.3q0 5.1 7 4.8h10.2q8.5 0 14.3 3.4 6.1 3.5 6.1 9.5v18.8q0 6.1-6.2 9.5-5.7 3.5-14.2 3.5h-13.4q-13.3 0-18.6-7.5-1.8-2.4-1.8-5.5v-9.6h16.6v8.1q0 4.8 7 4.8h6.9q7.1 0 7.1-4.8z" />
                </svg>
            </div>
            {
                sidebar_items.map((item, index) => (
                    <Link to={item.route} key={index}>
                        <SidebarItem
                            title={item.display_name}
                            icon={item.icon}
                            active={index === activeItem}
                        />
                    </Link>
                ))
            }
        </div>
    )
}

export default Sidebar
