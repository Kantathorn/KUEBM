import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
// import QRCode from 'qrcode.react'
import logo from '../../Image/request-manage-logo.svg';
import Navbar from '../../Component/Navbar';
const generatePayload = require('promptpay-qr')

function RequestManage() {
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

    const handleApproveRequest = () => {
        if (request) {
            Swal.fire({
                title: 'โปรดระบุรายละเอียดเพิ่มเติม'+ '\n' +'สำหรับคำร้องหมายเลข '+request.request_number,
                icon: 'question',
                html: `
                    <label for="deposite" class="input-group fs-6">ค่ามัดจำ (บาท)</label>
                    <div className="input-group mb-1">
                        <input id="deposite" class="swal2-input" placeholder="หากไม่มีมัดจำให้ใส่ 0">
                    </div>
                    <label for="collected_date" class="input-group fs-6 mt-3">ต้องเข้ามารับในวันที่</label>
                    <div className="input-group mb-1">
                        <input id="collected_date" class="swal2-input" placeholder="Collected Date" type="datetime-local">
                    </div>
                    <label for="note" class="input-group fs-6 mt-3">หมายเหตุ</label>
                    <div className="input-group mb-1">
                        <input id="note" class="swal2-input" placeholder="หมายเหตุอื่นๆ (ถ้ามี)" type="text">
                    </div>
                `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: "ยืนยัน",
                confirmButtonColor: "#198754",
                cancelButtonText: "ยกเลิก",
                cancelButtonColor: "#DC3545",
                preConfirm: () => {
                    return {
                      deposite: document.getElementById('deposite').value,
                      collected_date: document.getElementById('collected_date').value,
                      note: document.getElementById('note').value
                    };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const { deposite, collected_date, note } = result.value;
                    axios.patch("http://localhost:5500/request/approve",{
                        request_id: request._id,
                        deposite: deposite,
                        note: note,
                        collected_date: collected_date

                    },{withCredentials:true}).then((response) => {
                        Swal.fire({
                            title: "คำขอยืมถูกอนุมัติเรียบร้อยแล้ว",
                            text: "โปรดเตรียมพัสดุให้พร้อมส่งมอบ",
                            icon: "success"
                        }).then(function() {
                            window.location.href = '/request'
                        }).catch(error2 => {
                            console.log(error2)
                        })
                    })
                }
            })
        }
    };

    const handleRejectRequest = () => {
        if (request) {
            Swal.fire({
                title: 'ยกเลิกคำร้อง',
                icon: 'question',
                html: `
                    <strong>คำร้องหมายเลข:</strong> ${request.request_number}<br/>
                    <strong>สถานะคำร้อง:</strong> ${request.status}<br/>
                    <!-- Add more request details here -->
                `,
            });
        }
    }

    const handleDeliverRequest = () => {
        if (request) {
            Swal.fire({
                title: `ชำระมัดจำ ${request.deposite} บาท`,
                text: `พร้อมเพย์หมายเลข ${request.request_to.promptPay}`,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: "ชำระแล้ว",
                confirmButtonColor: "#198754",
                cancelButtonText: "ยกเลิก",
                cancelButtonColor: "#DC3545",
                imageUrl: 'http://api.qrserver.com/v1/create-qr-code/?data='+ generatePayload(request.request_to.promptPay, 0) +'&size=100x100',
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'QR Code',
            }).then((result) => {
                if (result.isConfirmed){
                    console.log(request.request_number)
                }
            })
        }
    }

    const renderRequestDetails = () => {
        if (!request) {
            return <div>Loading...</div>;
        }

        return (
            <>
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
                            <td>
                                {request.item.name} <br/> 
                                - {request.item.fsn} <br/> 
                                - {request.item.detail} <br/> 
                                - ราคา {request.item.cost} บาท
                            </td>
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
                {request.status === "New" ? 
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-success' onClick={handleApproveRequest}>อนุมัติคำร้อง</button>
                        <button className='btn btn-danger ms-3' onClick={handleRejectRequest}>ปฏิเสธคำร้อง</button>
                    </div>
                : <></>}
                {request.status === "Approve" ? 
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-success' onClick={handleDeliverRequest}>บันทึกการจัดส่งพัสดุ</button>
                    </div>
                : <></>}
                {request.status === "In-Use" ? 
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-success'>บันทึกการส่งคืนพัสดุ</button>
                    </div>
                : <></>}
            </>
        );
    };

    return (
        <>
            <Navbar/>
            <div className='container d-flex justify-content-center align-items-center min-vh-100'>
                <div className='card' style={{ width: '50rem' }}>
                    <img src={logo} alt='new' className='card-image' />
                    <div className="card-body">
                        <h5 className="card-title fs-2">จัดการคำร้องขอยืมพัสดุ</h5>
                        <div className='card-text'>
                            {renderRequestDetails()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RequestManage