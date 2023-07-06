import React from 'react'

import Table from '../components/table/Table'

import customerList from '../assets/JsonData/customers-list.json'


const moduleTableHead = [
    'semester',
    'module_description',
    'Module',
    'description',
    'pdf',
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.semester}</td>
        <td>{item.modul_description}</td>
        <td>{item.id}</td>
        <td>{item.description}</td>
        <td><a href={'http://' + item.pdf} key={index}>
            Link
        </a>
        </td>


    </tr>
)

const Module = () => {
    return (
        <div>
            <h2 className="page-header">
                Module
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                limit='10'
                                headData={moduleTableHead}
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

export default Module