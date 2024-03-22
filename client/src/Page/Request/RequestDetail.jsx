import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo from '../../Image/request-detail-logo.svg';

function RequestDetail() {
    const [request, setRequest] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5500/request/${id}`)
            .then(response => {
                setRequest(response.data);
            })
            .catch(error => {
                console.error('Error fetching request:', error);
                setRequest(null);
            })
    }, [id])

    const renderRequestDetails = () => {
        if (!request) {
            return <div>Loading...</div>;
        }

        return (
            <table className='table table-striped table-bordered'>
                <tbody>
                    <tr>
                        <td>คำร้องขอยืมพัสดุหมายเลข</td>
                        <td>{request.request_number}</td>
                    </tr>
                    <tr>
                        <td>เจ้าของคำร้อง</td>
                        <td>{request.requester.first_name} {request.requester.last_name} (สมาชิก {request.requester_club.name})</td>
                    </tr>
                    <tr>
                        <td>พัสดุที่ต้องการยืม</td>
                        <td>{request.item.name} <br/> - {request.item.fsn} <br/> - {request.item.detail}</td>
                    </tr>
                    <tr>
                        <td>จากชมรม</td>
                        <td>{request.request_to.name}</td>
                    </tr>
                    <tr>
                        <td>สถานะคำร้อง</td>
                        <td>{request.status}</td>
                    </tr>
                </tbody>
            </table>
        );
    };

    return (
        <div className='container d-flex justify-content-center align-items-center min-vh-100'>
            <div className='card' style={{ width: '50rem' }}>
                <img src={logo} alt='new' className='card-image' />
                <div className="card-body">
                    <h5 className="card-title fs-2">รายละเอียดคำร้องขอยืมพัสดุ</h5>
                    <div className='card-text'>
                        {renderRequestDetails()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequestDetail