import React,{useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import './Style/Login.css'
import logo from '../Image/logo-a-tran.svg'

function Login() {
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
        }).catch((error) => {})
    }, [])

    const [state,setState] = useState({
        username:"",
        password:""
    })
    const {username,password} = state
    const inputValue=name=>event=>{
        setState({...state,[name]:event.target.value});
    }
    const submitHandler = async function (e) {
        e.preventDefault();
        axios.post('http://localhost:5500/auth/login',state, {withCredentials: true}).then((response) => {
            if (response.data.role === 'SystemAdmin') {
                window.location.href = '/system_admin'
            }
            else if (response.data.role === 'ClubManager') {
                window.location.href = '/club_manager'
            }
            else if (response.data.role === 'EquipmentManager') {
                window.location.href = '/equipment_manager'
            }
            else if (response.data.role === 'User') {
                window.location.href = '/user'
            }
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถเข้าสู่ระบบได้',
                text: 'เนื่องจากอีเมลล์หรือรหัสผ่านไม่ถูกต้อง',
                allowOutsideClick: false,
                confirmButtonColor: '#198754'
            })
        })
    }
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
                            <h2>Welcome Back to KUEBM</h2>
                            <p>กรุณาลงชื่อเข้าใช้ด้วย Email ที่ลงทะเบียนไว้ในระบบ</p>
                        </div>
                        <form onSubmit={submitHandler}>
                            <label className='input-group fs-6'>E-mail</label>
                            <div className='input-group mb-3'>
                                <input 
                                    type='text' 
                                    className='form-control form-control-lg bg-light fs-6' 
                                    placeholder='เช่น xxxx@ku.th'
                                    value={username}
                                    onChange={inputValue('username')}
                                />
                            </div>
                            <label className='input-group fs-6'>Password</label>
                            <div className='input-group mb-3'>
                                <input 
                                    type='password' 
                                    className='form-control form-control-lg bg-light fs-6' 
                                    placeholder='รหัสผ่านบัญชีผู้ใช้ KUEBM'
                                    value={password}
                                    onChange={inputValue('password')}/>
                            </div>
                            <div className='input-group'>
                                <p>
                                    <a href='/' className='anchor-label'>ติดต่อเรา</a>
                                    | 
                                    <a href='/' className='anchor-label'>ลืมรหัสผ่าน</a>
                                </p>
                            </div>
                            <div className='input-group mb-3'>
                                <input 
                                    type='submit' 
                                    value='เข้าสู่ระบบ' 
                                    className='btn btn-lg btn-success w-100 fs-5'
                                />
                            </div>
                        </form>
                        <div className='register-label'>
                                <p className='text-center'>
                                    ยังไม่มีบัญชีผู้ใช้ KUEBM <a href='/register' className='anchor-label'>สามารถลงทะเบียนได้ที่นี่</a>
                                </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login