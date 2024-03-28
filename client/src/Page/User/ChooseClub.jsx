import React,{ useEffect,useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import logo from '../../Image/logo-choose-club.svg'
import ChooseClubForm from '../../Component/ChooseClubForm';
import Navbar from '../../Component/Navbar';

import './Style/User.css'

function ChooseClub() {
    const [user, setUser] = useState({});
    const [request,setRequest] = useState({});
    //Check User Permission and get user data
    useEffect(() => {
        axios.get('http://localhost:5500/user/info',{withCredentials: true}).then((response) => {
            setUser(response.data)
        })
        .catch((error) => {
            window.location.href = '/login'
        })
    },[])

    useEffect(() => {
        axios.get('http://localhost:5500/club/join_request/user',{withCredentials: true}).then((response) => {
            setRequest(response.data)
        })
    },[])

    useEffect(() => {
        if (user) {
            if (user.role !== "User"){
                if (user.role === "SystemAdmin"){
                    window.location.href = '/system_admin'
                }
                else if (user.role === "ClubManager"){
                    window.location.href = '/club_manager'
                }
                else if (user.role === "EquipmentManager"){
                    window.location.href = '/equipment_manager'
                }
            }
            else {
                if (user.club !== null){
                    window.location.href = '/user'
                }
            }
        }
    }, [user])

    const handleCancel = () => {
        if (request){
            Swal.fire({
                icon: "question",
                title: "ยืนยันที่จะยกเลิกคำขอเขาร่วมชมรม",
                text: `${request.club.name}`,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: "ยืนยัน",
                confirmButtonColor: "#198754",
                cancelButtonText: "ยกเลิก",
                cancelButtonColor: "#DC3545",
            }).then((result) => {
                if (result.isConfirmed){
                    axios.post("http://localhost:5500/club/join_request/cancel", {request_id:request._id},{withCredentials:true}).then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "ยกเลิกสำเร็จ",
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            window.location.reload()
                        })
                    })
                }
            })
        }
    }

        return (
            <>
                <Navbar/>
                <div className='container d-flex justify-content-center align-items-center min-vh-100'>
                    <div className='border rounded-5 p-3 bg-white shadow box-area'>
                        <div className='rounded-4 d-flex justify-content-center align-items-center flex-column' style={{background: '#ffffff'}}>
                            <div className='club-logo mb-1 mt-3'>
                                <img src={logo} alt='logo' className='img-fluid' style={{width: 200 + 'px'}}/>
                            </div>
                            <div className='header-text mb-4 text-wrap text-center'>
                                {request ? <h2>Wait for Approval</h2> : <h2>Select your Club</h2>}
                                {request ? <><p>กรุณารอการอนุมัติจากผู้ดูแลชมรม <a href={`/club/management/member/join_request/${request._id}`}>ตรวจสอบรายละเอียด</a></p></>: <p>กรุณาเลือกชมรมที่คุณสังกัด หรือ สร้างชมรมใหม่</p>}
                            </div>
                        </div>
                        {request ? 
                        <div className='d-flex justify-content-center mb-3'>
                            <button className='btn btn-danger w-30 fs-6' onClick={handleCancel}>ยกเลิกคำขอเข้าชมรม</button>
                        </div>
                        :
                        <>
                            <ChooseClubForm userData={user}/>
                            <div className='text fs-6'>
                                <p className='text-center'>
                                    ต้องการสร้างชมรมใหม่?{' '}
                                    <a href='/create_club' className='anchor-label'>
                                        สร้างชมรมใหม่ที่นี่
                                    </a>
                                </p>
                            </div>
                        </>
                        }
                    </div>
                </div>
            </>
        )
}

export default ChooseClub