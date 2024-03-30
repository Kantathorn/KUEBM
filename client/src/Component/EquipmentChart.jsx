import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function EquipmentChart() {
    const [nAvailable,setNavailabel] = useState('')
    const [nPending,setNpending] = useState('')
    const [nInuse,setNinuse] = useState('')

    useEffect(() => {
        axios.get('http://localhost:5500/statistic/equipment/available',{ withCredentials:true}).then((result) => {
            setNavailabel(result.data)
        })
        axios.get('http://localhost:5500/statistic/equipment/pending',{ withCredentials:true}).then((result) => {
            setNpending(result.data)
        })
        axios.get('http://localhost:5500/statistic/equipment/inuse',{ withCredentials:true}).then((result) => {
            setNinuse(result.data)
        })
    },[])
    const data = {
        labels: ['สามารถยืมได้','รออนุมัติ','กำลังใช้งาน',],
        datasets: [
            {
                label: 'จำนวนรายการ',
                data: [nAvailable, nPending, nInuse,],
                backgroundColor: [
                'rgba(42, 157, 143, 1)',
                'rgba(233, 196, 106, 1)',
                'rgba(255, 85, 80, 1)',
                ],
                borderColor: [
                'rgba(42, 157, 143, 1)',
                'rgba(233, 196, 106, 1)',
                'rgba(255, 85, 80, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
      
    const options = {
        responsive: true,
        maintainAspectRatio: false
    };

    return (
        <>
            <div style={{ width: '25rem', height: '25rem' }}>
                <Doughnut data={data} options={options} />
            </div>
        </>
    )
}

export default EquipmentChart