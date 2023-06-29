import React from 'react'

import Table from '../components/table/Table'

import customerList from '../assets/JsonData/customers-list.json'

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
    return (
        <div>
            <h2 className="page-header">
                customers
            </h2>
            <div className="row">
                <div className="col-12">
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
