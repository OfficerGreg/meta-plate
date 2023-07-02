import React from 'react'

import {Link} from 'react-router-dom'

import StatusCard from '../components/status-card/StatusCard'

import Table from '../components/table/Table'


import statusCards from '../assets/JsonData/workspace.json'

const topStudent = {
    head: [

        'rank',
        'student',
        'total coins'
    ],
    body: [
        {
            "username": "Linus Mueller",
            "order": "01",
            "price": "$15,870"
        },
        {
            "username": "Lucas Meier",
            "order": "02",
            "price": "$12,251"
        },
        {
            "username": "Mike Heber",
            "order": "03",
            "price": "$10,840"
        },
        {
            "username": "Marco Keller",
            "order": "04",
            "price": "$9,251"
        },
        {
            "username": "Jakub Dan",
            "order": "05",
            "price": "$8,840"
        }
    ]
}

const renderStudentHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderStudentBody = (item, index) => (
    <tr key={index}>
        <td>{item.order}</td>
        <td>{item.username}</td>
        <td>{item.price}</td>
    </tr>
)


const Workspace = () => {


    return (
        <div>
            <h2 className="page-header">Workspace</h2>
            <div className="row">
                <div className="col-7">
                    <div className="row">
                        {
                            statusCards.map((item, index) => (
                                <div className="col-6" key={index}>
                                    <a href={item.link} key={index}>
                                    <StatusCard
                                        icon={item.icon}
                                        title={item.title}
                                        count={item.count}
                                    />
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="col-5">
                    <div className="card">
                        <div className="card__header">
                            <h3>top Student ranking</h3>
                        </div>
                        <div className="card__body">
                            <Table
                                headData={topStudent.head}
                                renderHead={(item, index) => renderStudentHead(item, index)}
                                bodyData={topStudent.body}
                                renderBody={(item, index) => renderStudentBody(item, index)}
                            />
                        </div>
                        <div className="card__footer">
                            <Link to='/'>view all</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Workspace
