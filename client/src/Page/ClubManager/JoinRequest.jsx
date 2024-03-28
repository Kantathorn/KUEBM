import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo from '../../Image/request-joining-logo.svg';

import Navbar from '../../Component/Navbar';
import Swal from 'sweetalert2';

function JoinRequest() {
    const [request, setRequest] = useState(null);
    const [user,setUser] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5500/club/join_request/byid/${id}`)
            .then(response => {
                setRequest(response.data);
            })
            .catch(error => {
                setRequest(null);
            })
    }, [id])

    useEffect(() => {
        axios.get('http://localhost:5500/user/info',{withCredentials: true}).then((response) => {
            setUser(response.data)
        })
        .catch((error) => {
            Swal.fire({
                title: "ลงชื่อเข้าใช้",
                focusConfirm: false,
                showCancelButton: false,
                confirmButtonText: "Login",
                confirmButtonColor: "#198754",
                allowOutsideClick: false,
                html: `
                <h4>กรุณาลงชื่อเข้าใช้ด้วยบัญชีผู้ดูแลชมรม</h4>
                <h4>(Club Manager)</h4>
                <label for="username" class="input-group fs-6 mt-3">ชื่อบัญชีผู้ใช้</label>
                <div className="input-group mb-1">
                    <input id="username" class="swal2-input" placeholder="ชื่อบัญชีผู้ใช้ KUEBM" type="text">
                </div>
                <label for="password" class="input-group fs-6 mt-3">รหัสผ่าน</label>
                <div className="input-group mb-1">
                    <input id="password" class="swal2-input" placeholder="รหัสผ่าน" type="password">
                </div>
                `,
                preConfirm: () => {
                    return {
                      username: document.getElementById('username').value,
                      password: document.getElementById('password').value
                    };
                }
            }).then((result) => {
                if (result.isConfirmed){
                    const { username,password } = result.value
                    axios.post('http://localhost:5500/auth/login',{ username:username,password:password}, {withCredentials: true}).then((result) => {
                        Swal.fire({
                            title: "เข้าสู่ระบบสำเร็จ",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            window.location.reload()
                        })
                    })
                }
            })
        })
    },[])
        
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
                {request.status === "Requested" ? 
                <tbody>
                    <tr>
                        <td>ชมรม</td>
                        <td>{request.club.name}</td>
                    </tr>
                    <tr>
                        <td>ชื่อผู้ขอเข้าร่วมชมรม</td>
                        <td>{request.user.first_name} {request.user.last_name}</td>
                    </tr>
                    <tr>
                        <td>รหัสนิสิตผู้ขอเข้าร่วมชมรม</td>
                        <td>{request.user.student_id}</td>
                    </tr>
                    <tr>
                        <td>อีเมลล์ผู้ขอเข้าร่วมชมรม</td>
                        <td>{request.user.email}</td>
                    </tr>
                    <tr>
                        <td>เบอร์โทรศัพธ์ผู้ขอเข้าร่วมชมรม</td>
                        <td>{request.user.phone_number}</td>
                    </tr>
                    <tr>
                        <td>สถานะ</td>
                        {request.status === "Requested" ? <td>{request.status}</td> : <></>}
                    </tr>
                    <tr>
                        <td>สร้างเมื่อ</td>
                        {request.createdAt ? <td>{formatDate(request.createdAt)}</td> : <></>}
                    </tr>
                </tbody>
                : 
                    <h2 style={{color: "#ff5550"}}>คำขอเข้าร่วมนี้ถูกอนุมัติ/ยกเลิกแล้ว</h2>
                }
            </table>
            );
        };

    const handleApprove = () => {
        Swal.fire({
            title: "ยืนยันที่จะอนุมัติคำขอเข้าร่วมชมรม",
            text: "เมื่ออนุมัติแล้ว ผู้ใช้นี้จะถูกตั้งบทบาท(Role) เป็น User อัตโนมัติ",
            icon: "question",
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "ยืนยัน",
            confirmButtonColor: "#198754",
            cancelButtonText: "ยกเลิก",
            cancelButtonColor: "#DC3545"
        }).then((result) => {
            if (result.isConfirmed){
                axios.patch("http://localhost:5500/club/join_request/approve", {request_id:request._id},{withCredentials:true}).then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "อนุมัติคำขอสำเร็จ",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        window.location.href = "/club_manager"
                    })
                })
            }
        })
    }

    const handleReject = () => {
        Swal.fire({
            title: "ยืนยันที่จะปฏิเสธคำขอเข้าร่วมชมรม",
            icon: "question",
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "ยืนยัน",
            confirmButtonColor: "#198754",
            cancelButtonText: "ยกเลิก",
            cancelButtonColor: "#DC3545"
        }).then((result) => {
            if (result.isConfirmed){
                axios.post("http://localhost:5500/club/join_request/cancel", {request_id:request._id},{withCredentials:true}).then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "ปฏิเสธคำขอสำเร็จ",
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            window.location.href = "/club_manager"
                        })
                })
            }
        })
    }
        
    return (
        <>
            {user ? <Navbar/> : <></>}
            <div className='container d-flex justify-content-center align-items-center min-vh-100'>
                <div className='card mt-3 mb-3' style={{ width: '50rem' }}>
                    <img src={logo} alt='new' className='card-image' />
                    <div className="card-body">
                        <h5 className="card-title fs-2">รายละเอียดคำร้องขอเข้าร่วมชมรม</h5>
                        <div className='card-text'>
                            {renderRequestDetails()}
                        </div>
                        {user && user.role === "ClubManager" && user.club._id === request.club._id ?
                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-success' onClick={handleApprove}>อนุมัติคำร้อง</button>
                            <button className='btn ms-2 btn-danger' onClick={handleReject}>ปฏิเสธคำร้อง</button>
                        </div>
                        : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default JoinRequest