import React,{ useEffect,useState } from 'react'
import axios from 'axios'
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
            }
        }
    }, [user])

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

export default User