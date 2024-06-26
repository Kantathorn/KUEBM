import React, { useEffect,useState } from 'react'
import axios from 'axios'
import './Style.css'
import RegisterComponent from '../../Component/RegisterComponent'
import logo from '../../Image/logo-a-tran.svg'

function Register() {
    const [user, setUser] = useState({});
    //Check User Permission and get user data
    useEffect(() => {
        axios.get('http://localhost:5500/user/info',{withCredentials: true}).then((response) => {
            setUser(response.data)
        })
        .catch((error) => {})
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
                if (user.club === null){
                    window.location.href = '/user/choose_club'
                }
                else {
                    window.location.href = '/user'
                }
            }
        }
    }, [user])

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