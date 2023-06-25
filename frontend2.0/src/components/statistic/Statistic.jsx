import React from 'react';
import "./statisitc.css";

const Statistic = () => {
    return (
        <div className="panel">
            <div className="panel-header">
                <h3 className="title">Learn-Statistics</h3>
                <div className="calendar-views">
                    <span>Day</span>
                    <span>Week</span>
                    <span>Month</span>
                </div>
            </div>

            <div className="panel-body">
                <div className="categories">
                    <div className="category">
                        <span>Coin Average</span>
                        <span>120.5</span>
                    </div>
                    <div className="category">
                        <span>Grade Point</span>
                        <span>4.75</span>
                    </div>
                    <div className="category">
                        <span>Learn time</span>
                        <span>4.5 hrs</span>
                    </div>
                </div>

                <div className="chart">
                    <div className="operating-systems">
                        <span className="ios-os">
                            <span></span>time
                        </span>
                        <span className="windows-os">
                            <span></span>school grade
                        </span>
                        <span className="android-os">
                            <span></span>Coins
                        </span>
                    </div>
                    <div className="android-stats">
                        300.5<span></span>
                    </div>
                    <div className="ios-stats">
                        <span></span>6.3
                    </div>
                    <div className="windows-stats">
                        <span></span>5.75
                    </div>

                    <svg
                        width="563"
                        height="204"
                        className="data-chart"
                        viewBox="0 0 563 204"
                        xmlns="https://www.w3.org/2000/svg"
                    >
                        <g fill="none" fillRule="evenodd">
                            <path
                                className="dataset-1"
                                d="M30.046 97.208c2.895-.84 5.45-2.573 7.305-4.952L71.425 48.52c4.967-6.376 14.218-7.38 20.434-2.217l29.447 34.46c3.846 3.195 9.08 4.15 13.805 2.52l31.014-20.697c4.038-1.392 8.485-.907 12.13 1.32l3.906 2.39c5.03 3.077 11.43 2.753 16.124-.814l8.5-6.458c6.022-4.577 14.563-3.676 19.5 2.056l54.63 55.573c5.622 6.526 15.686 6.647 21.462.258l37.745-31.637c5.217-5.77 14.08-6.32 19.967-1.24l8.955 7.726c5.42 4.675 13.456 4.63 18.82-.11 4.573-4.036 11.198-4.733 16.508-1.735l61.12 34.505c4.88 2.754 10.916 2.408 15.45-.885L563 90.915V204H0v-87.312-12.627c5.62-.717 30.046-6.852 30.046-6.852z"
                                fill="#7DC855"
                                opacity=".9"
                            />
                            <path
                                className="dataset-2"
                                d="M563 141.622l-21.546-13.87c-3.64-2.343-8.443-1.758-11.408 1.39l-7.565 8.03c-3.813 4.052-10.378 3.688-13.718-.758L469.83 84.58c-3.816-5.08-11.588-4.687-14.867.752l-28.24 46.848c-2.652 4.402-8.48 5.673-12.74 2.78l-15.828-10.76c-3.64-2.475-8.55-1.948-11.575 1.245l-53.21 43.186c-3.148 3.32-8.305 3.74-11.953.974l-100.483-76.2c-3.364-2.55-8.06-2.414-11.27.326l-18.24 15.58c-3.25 2.773-8.015 2.874-11.38.24L159.91 93.79c-3.492-2.733-8.467-2.51-11.697.525l-41.58 39.075c-2.167 2.036-5.21 2.868-8.117 2.218L39.05 112.5c-4.655-1.808-9.95-.292-12.926 3.7L0 137.31V204h563v-62.378z"
                                fill="#F8E71C"
                                opacity=".6"
                            />
                            <path
                                className="dataset-3"
                                d="M0 155.59v47.415c0 .55.448.995 1 .995h562v-43.105l-40.286 11.83c-3.127.92-6.493.576-9.368-.954l-53.252-28.32c-5.498-2.924-12.323-1.365-15.987 3.654l-25.48 34.902c-4.08 5.59-12.478 5.513-16.455-.148L360.06 121.92c-2.802-4.073-8.2-5.457-12.633-3.237L322.2 133.827c-4.415 2.21-9.792.848-12.604-3.196L282.78 99.25c-4.106-5.906-12.978-5.6-16.665.57l-26.757 44.794c-3.253 5.446-10.753 6.468-15.36 2.092l-16.493-15.673c-4.27-4.058-11.138-3.522-14.72 1.148l-23.167 30.21c-3.722 4.852-10.937 5.207-15.12.744l-44.385-47.345c-5.807-5.427-14.83-5.508-20.734-.19l-55.76 48.31c-3.76 3.26-9.127 3.93-13.582 1.703L0 155.59z"
                                fill="#F5A623"
                                opacity=".7"
                            />
                            <path
                                className="lines"
                                fill="#FFF"
                                opacity=".2"
                                d="M0 203h563v1H0zM0 153h563v1H0zM0 102h563v1H0zM0 51h563v1H0zM0 0h563v1H0z"
                            />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Statistic;
