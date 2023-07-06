import React, {useEffect} from 'react'

import { Link } from 'react-router-dom'

import Chart from 'react-apexcharts'

import { useSelector } from 'react-redux'

import StatusCard from '../components/status-card/StatusCard'

import Table from '../components/table/Table'

import Badge from '../components/badge/Badge'

import statusCards from '../assets/JsonData/status-card-data.json'

const chartOptions = {
    series: [{
        name: 'Your Points',
        data: [4000,7000,2000,9000,3600,7000,3000,9100,6000]
    }, {
        name: 'Average Student Points',
        data: [4000, 3000, 7000, 8000, 4000, 1600, 4500, 2000, 5100]
    }],
    options: {
        color: ['#6ab04c', '#2980b9'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: false
        }
    }
}

const topCustomers = {
    head: [
        'Module',
        "Designation",
        'Grade'
    ],
    body: [
        {
            "username": "M324",
            "order": "DevOps-Prozesse",
            "price": "5.0"
        },
        {
            "username": "M165",
            "order": "NoSQL-Datenbanken",
            "price": "4.5"
        },
        {
            "username": "M335",
            "order": "Mobile Applikationen realisieren",
            "price": "5.5"
        },
        {
            "username": "M117",
            "order": "Informatik und Netzwerkinfrastruktur",
            "price": "4.5"
        },
        {
            "username": "M426",
            "order": "Agile-Process",
            "price": "5.0"
        }
    ]
}

const renderCusomerHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderCusomerBody = (item, index) => (
    <tr key={index}>
        <td>{item.username}</td>
        <td>{item.order}</td>
        <td>{item.price}</td>
    </tr>
)

const latestOrders = {
    header: [
        "Modul",
        "Designation",
        "Teacher",
        "Date",
        "Status"
    ],
    body: [
        {
            id: "M347",
            user: "Dienst mit Container anwenden",
            date: "21 Jun 2023",
            price: "Patrick Venzin",
            status: "open"
        },
        {
            id: "M450",
            user: "Applikation testen",
            date: " 19 Jun 2023",
            price: "Patrick Meier",
            status: "present"
        },
        {
            id: "M323",
            user: "Funktionale Programmierung",
            date: "15 Jun 2023",
            price: "patrick Meier",
            status: "pending"
        },
        {
            id: "M347",
            user: "Dienst mit Container anwenden",
            date: "14 Jun 2023",
            price: "Patrick Venzin",
            status: "absent"
        },
        {
            id: "M450",
            user: "Applikation testen",
            date: " 12 Jun 2023",
            price: "Patrick Meier",
            status: "present"
        }
    ]
}

const orderStatus = {
    "open": "primary",
    "pending": "warning",
    "present": "success",
    "absent": "danger"
}

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.user}</td>
        <td>{item.price}</td>
        <td>{item.date}</td>
        <td>
            <Badge type={orderStatus[item.status]} content={item.status}/>
        </td>
    </tr>
)

const Dashboard = () => {

    const themeReducer = useSelector(state => state.ThemeReducer.mode)

    return (
        <div>
            <h2 className="page-header">Dashboard</h2>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        {
                            statusCards.map((item, index) => (
                                <div className="col-6" key={index}>

                                    <StatusCard
                                        icon={item.icon}
                                        count={item.count}
                                        title={item.title}

                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="col-6">
                    <div className="card full-height">
                        {/* chart */}
                        <Chart
                            options={themeReducer === 'theme-mode-dark' ? {
                                ...chartOptions.options,
                                theme: { mode: 'dark'}
                            } : {
                                ...chartOptions.options,
                                theme: { mode: 'light'}
                            }}
                            series={chartOptions.series}
                            type='line'
                            height='100%'
                        />
                    </div>
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card__header">
                            <h3>grade</h3>
                        </div>
                        <div className="card__body">
                            <Table
                                headData={topCustomers.head}
                                renderHead={(item, index) => renderCusomerHead(item, index)}
                                bodyData={topCustomers.body}
                                renderBody={(item, index) => renderCusomerBody(item, index)}
                            />
                        </div>
                        <div className="card__footer">
                            <Link to='/'>view all</Link>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="card">
                        <div className="card__header">
                            <h3>absence status</h3>
                        </div>
                        <div className="card__body">
                            <Table
                                headData={latestOrders.header}
                                renderHead={(item, index) => renderOrderHead(item, index)}
                                bodyData={latestOrders.body}
                                renderBody={(item, index) => renderOrderBody(item, index)}
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

export default Dashboard
