import React from 'react'

import Table from '../components/table/Table'

import customerList from '../assets/JsonData/customers-list.json'
import { $CombinedState } from 'redux'
import ICalendarLink from "react-icalendar-link";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const customerTableHead = [
    'date',
    'time',
    'location',
    'instructor',
    'course',
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.date}</td>
        <td>{item.time}</td>
        <td>{item.location}</td>
        <td>{item.instructor}</td>
        <td>{item.course}</td>
        <td>{item.total_orders}</td>
        <td>{item.total_spend}</td>

    </tr>
)

const Calender = () => {
    const event = {
        title: "My Title",
        description: "My Description",
        startTime: "2018-10-07T10:30:00+10:00",
        endTime: "2018-10-07T12:00:00+10:00",
        location: "10 Carlotta St, Artarmon NSW 2064, Australia",
        attendees: [
          "Hello World <hello@world.com>",
          "Hey <hey@test.com>",
        ]
      }
 
    
    return (
        <div className="container-fluid">
            <h2 className="page-header">
                calender
            </h2>
            <div className="row">
                <div className="col-12">
                    <iframe
                        src="https://calendar.google.com/calendar/embed?height=800&wkst=1&bgcolor=%23ffffff&ctz=Europe%2FZurich&showTitle=0&showTabs=1&showCalendars=0&showTz=0&showPrint=1&showDate=1&showNav=1&hl=en&src=ZDEzN2RhMDU2YWM0MDQwZWE1N2Q1YmViMzdjMDdiZmEzNTRiZjhkNWQwNDNmNmI4MmJiZGRhNzdlYjZkN2Y1NkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23F09300"
                        style={{ borderRadius: "10px", borderWidth: 0, marginRight: "20px",padding:"10px", boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)" }}
                        width="100%"
                        height="800"
                        frameBorder="0"
                        scrolling="no"
                    ></iframe>
                </div>
            </div>
        </div>


    )
}

export default Calender
