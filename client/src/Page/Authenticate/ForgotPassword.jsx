import React,{useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import './Style.css'
import logo from '../../Image/logo-a-tran.svg'

function ForgotPassword() {
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
        username:""
    })
    const inputValue=name=>event=>{
        setState({...state,[name]:event.target.value});
    }

    //Store Error State
    const [errors, setErrors] = useState({});
    const { username } = state;
    const validateForm = () => {
        const formErrors = {};
        if (!username.trim()) {
            formErrors.username = "กรุณาใส่อีเมลล์";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const submitHandler = async function (e) {
        e.preventDefault();
        const isFormValid = validateForm();

        if (isFormValid){
            console.log(username)
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
                            <h2>Forget Password?</h2>
                            <p>กรุณาระบุ E-mail ที่เป็นสมาชิกในระบบ เพื่อรับรหัส OTP</p>
                        </div>
                        <form onSubmit={submitHandler}>
                            <label className='input-group fs-6'>E-mail</label>
                            <div className='input-group mb-3'>
                                <input 
                                    type='email' 
                                    className='form-control form-control-lg bg-light fs-6' 
                                    placeholder='เช่น xxxx@ku.th'
                                    value={username}
                                    onChange={inputValue('username')}
                                />
                            </div>
                            {errors.username && <p className="error-alert mb-3">{errors.username}</p>}
                            <div className='input-group mb-3'>
                                <input 
                                    type='submit' 
                                    value='ลืมรหัสผ่าน' 
                                    className='btn btn-lg btn-success w-100 fs-5'
                                />
                            </div>
                        </form>
                        <div className='register-label'>
                            <p className='text-center'>จำรหัสได้แล้ว? <a href='/login'>กลับไปที่หน้าเข้าสู่ระบบ</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword