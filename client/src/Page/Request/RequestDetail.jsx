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

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleString('th-TH', options);
    }

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
                        <td>สถานะคำร้อง</td>
                        <td>{request.status}</td>
                    </tr>
                    {request.status !== 'New' && request.status !== 'Cancel' ? 
                        <>
                            <tr>
                                <td>ผู้อนุมัติ</td>
                                <td>{request.approver ? request.approver.first_name : "-"}</td>
                            </tr>
                        </> : <></>
                    }
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
                        <td>เหตุผล</td>
                        <td>{request.description}</td>
                    </tr>
                    <tr>
                        <td>วันที่ต้องการยืม</td>
                        <td>{formatDate(request.use_date)}</td>
                    </tr>
                    <tr>
                        <td>วันที่ต้องการคืน</td>
                        <td>{formatDate(request.returned_date)}</td>
                    </tr>
                    {request.status !== 'New' && request.status !== 'Cancel' ? 
                        <>
                            <tr>
                                <td>วันที่ต้องเข้ารับพัสดุ</td>
                                <td>{formatDate(request.collected_date)}</td>
                            </tr>
                            <tr>
                                <td>มัดจำ</td>
                                <td>{request.deposite} บาท</td>
                            </tr>
                            <tr>
                                <td>ค่าปรับ</td>
                                <td>{request.fine} บาท</td>
                            </tr>
                        </> : <></>
                    }
                    <tr>
                        <td>หมายเหตุ</td>
                        <td>{request.note ? request.note : "-"}</td>
                    </tr>
                </tbody>
            </table>
        );
    };

    return (
        <div className='container d-flex justify-content-center align-items-center min-vh-100'>
            <div className='card mt-3 mb-3' style={{ width: '50rem' }}>
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