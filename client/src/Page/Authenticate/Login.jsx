import React,{useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import './Style.css'
import logo from '../../Image/logo-a-tran.svg'

function Login() {
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
        if (state.username === "" || state.password === ""){
            Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถเข้าสู่ระบบได้',
                text: 'กรุณาระบุข้อมูลให้ครบถ้วน',
                showConfirmButton: false,
                timer: 1500
            })
        }
        else {
            axios.post('http://localhost:5500/auth/login',state, {withCredentials: true}).then((response) => {
                Swal.fire({
                    icon: "success",
                    title: `ลงชื่อเข้าใช้เรียบร้อยแล้ว`,
                    text: `ยินดีต้องรับสู่ระบบ KUEBM`,
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    if (response.data.role !== "User"){
                        if (response.data.role === 'SystemAdmin') {
                            window.location.href = '/system_admin'
                        }
                        else if (response.data.role === 'ClubManager') {
                            window.location.href = '/club_manager'
                        }
                        else if (response.data.role === 'EquipmentManager') {
                            window.location.href = '/equipment_manager'
                        }
                    }
                    else {
                        if (response.data.club !== null){
                            window.location.href = '/user'
                        }
                        else {
                            window.location.href = '/user/choose_club'
                        }
                    }
                })
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'ไม่สามารถเข้าสู่ระบบได้',
                    text: 'เนื่องจากอีเมลล์หรือรหัสผ่านไม่ถูกต้อง',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        }
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
                                    <a href='/forgot_password' className='anchor-label'>ลืมรหัสผ่าน</a>
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