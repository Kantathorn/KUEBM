import React,{ useEffect,useState } from 'react'
import axios from 'axios'
import logo from '../../Image/logo-choose-club.svg'
import ChooseClubForm from '../../Component/ChooseClubForm';
import Navbar from '../../Component/Navbar';

import CardTracking from '../../Image/card-tracking.svg'
import CardNew from '../../Image/card-new.svg'
import './Style/User.css'

function User() {
    const [user, setUser] = useState({});
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
        }).catch((error) => {})
    }, [])

    if (user.club == null) {
        return (
            <>
                <Navbar userData={user}/>
                <div className='container d-flex justify-content-center align-items-center min-vh-100'>
                    <div className='border rounded-5 p-3 bg-white shadow box-area'>
                        <div className='rounded-4 d-flex justify-content-center align-items-center flex-column' style={{background: '#ffffff'}}>
                            <div className='club-logo mb-1 mt-3'>
                                <img src={logo} alt='logo' className='img-fluid' style={{width: 200 + 'px'}}/>
                            </div>
                            <div className='header-text mb-4 text-wrap text-center'>
                                <h2>Select your Club</h2>
                                <p>กรุณาเลือกชมรมที่คุณสังกัด หรือ สร้างชมรมใหม่</p>
                            </div>
                        </div>
                        <ChooseClubForm userData={user}/>
                        <div className='text fs-6'>
                            <p className='text-center'>
                                ต้องการสร้างชมรมใหม่?{' '}
                                <a href='/create_club' className='anchor-label'>
                                    สร้างชมรมใหม่ที่นี่
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    else {
        return (
            <>
                <Navbar/>
                <div className='container d-flex justify-content-center align-items-center min-vh-100'>
                    <div className='row'>
                        <div className='col-sm-6 mb-3 mb-sm-0'>
                            <div className='card card-width'>
                                <img src={CardTracking} alt='new' className='card-image'/>
                                <div className="card-body">
                                    <h5 className="card-title">ติดตามสถานะคำขอยืมพัสดุอุปกรณ์</h5>
                                    <p className="card-text">ระบบติดตามสถานะคำขอยืมพัสดุอุปกรณ์</p>
                                    <a href="/request/tracking" className="btn btn-primary">tracking</a>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className='card card-width'>
                                <img src={CardNew} alt='new' className='card-image'/>
                                <div className="card-body">
                                    <h5 className="card-title">สร้างคำร้องขอยืมพัสดุอุปกรณ์ใหม่</h5>
                                    <p className="card-text">ระบบสร้างคำร้องขอยืมพัสดุอุปกรณ์ใหม่</p>
                                    <a href="/request/new" className="btn btn-primary">new</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            )
    }

}

export default User