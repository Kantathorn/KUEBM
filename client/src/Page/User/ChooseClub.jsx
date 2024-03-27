import React,{ useEffect,useState } from 'react'
import axios from 'axios'
import logo from '../../Image/logo-choose-club.svg'
import ChooseClubForm from '../../Component/ChooseClubForm';
import Navbar from '../../Component/Navbar';

import './Style/User.css'

function ChooseClub() {
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
                if (user.club !== null){
                    window.location.href = '/user'
                }
            }
        }
    }, [user])

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

export default ChooseClub