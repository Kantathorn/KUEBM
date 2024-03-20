import React, { useEffect } from 'react'
import axios from 'axios'
import './Style/Register.css'
import RegisterComponent from '../Component/RegisterComponent'
import logo from '../Image/logo-a-tran.svg'

function Register() {
    //Check if logged in
    useEffect(() => {
        axios.get('http://localhost:5500/user/role',{withCredentials: true}).then((response) => {
        console.log(response.data)
        if (response.data === 'SystemAdmin') {
            window.location.href = '/system_admin'
        }
        else if (response.data === 'ClubManager') {
            window.location.href = '/club_manager'
        }
        else if (response.data === 'EquipmentManager') {
            window.location.href = '/equipment_manager'
        }
        else if (response.data === 'User') {
            window.location.href = '/user'
        }
    }).catch(() => {})
    },[])
    return (
        <div className='container d-flex justify-content-center align-items-center min-vh-100'>
            <div className='row border rounded-5 p-3 bg-white shadow box-area'>
                <div className='col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box' style={{background: '#ffffff'}}>
                    <div className='kuebm-logo mb-5 mt-3'>
                        <img src={logo} alt='logo' className='img-fluid' style={{width: 250 + 'px'}}/>
                    </div>
                    <p className='logo-text text-wrap text-center font-weight-bold'>ระบบยืมคืนพัสดุอุปกรณ์สำหรับองค์กรกิจกรรมนิสิต<br/>มหาวิทยาลัยเกษตรศาสตร์ บางเขน</p>
                </div>
                <div className='col-md-6 right-box'>
                    <div className='row align-items-center'>
                        <div className='header-text mb-4 mt-3 text-wrap text-center'>
                            <h2>Join KUEBM</h2>
                            <p>สร้างบัญชีผู้ใช้ KUEBM ใหม่</p>
                        </div>
                        <RegisterComponent/>
                        <p className='text-center'>มีบัญชีผู้ใช้อยู่แล้ว? <a href='/login'>ไปที่หน้าเข้าสู่ระบบ</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register