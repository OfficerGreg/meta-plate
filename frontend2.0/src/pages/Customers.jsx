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

const Customers = () => {
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
        <div>
           
             
            <h2 className="page-header">
                calender
            </h2>
            <div className="row">
            <div className="col-12"> <Calendar className="  card " /></div>
                <div className="col-6">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                limit='10'
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={customerList}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers
