import React from 'react'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import './index.scss'
function BarChart({ data }) {
    return (
        <div className='barchart-container'>
            <Bar
                data={{
                    labels: [
                        "Hai",
                        "Ba",
                        "Tư",
                        "Năm",
                        "Sáu",
                        "Bảy",
                        "CN"
                    ],
                    datasets: [
                        {
                            label: "Doanh thu dịch vụ trong tuần (VND)",
                            backgroundColor: [
                                "#3e95cd",
                                "#8e5ea2",
                                "#3cba9f",
                                "#e8c3b9",
                                "#c45850",
                                "#3e95cd",
                                "#8e5ea2"
                            ],
                            data: [2478000, 5267000, 734000, 784000, 433000, 436000, 7599000]
                        }
                    ]
                }}
                options={{
                    legend: { display: false },
                    title: {
                        display: true,
                        text: "Doanh Thu Trong Tuần"
                    }
                }}
            />
        </div>
    )
}

export default BarChart