import React,{ useEffect } from 'react'
import axios from 'axios';

import Navbar from '../../Component/Navbar'
import AddNewEquipmentComponent from '../../Component/AddNewEquipmentComponent'
import logo from "../../Image/logo-add-equipment.svg"

function AddNewEquipment() {
    useEffect(() => {
        axios.get('http://localhost:5500/user/info',{withCredentials: true}).then((response) => {})
        .catch((error) => {
            window.location.href = '/login'
        })
    },[])
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
                        <h2>Add New Equipment</h2>
                        <p>เพิ่มรายการพัสดุอุปกรณ์ใหม่</p>
                    </div>
                </div>
                <AddNewEquipmentComponent/>
                <div className='text fs-6'>
                    <p className='text-center'>
                        <a href='/equipment' className='anchor-label'>
                            กลับสู่หน้ารายการพัสดุอุปกรณ์
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddNewEquipment