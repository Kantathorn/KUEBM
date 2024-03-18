import React,{ useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../Component/Navbar'
import CreateClubComponent from '../../Component/CreateClubComponent'
import logo from '../../Image/logo-choose-club.svg'

function CreateClub() {
  return (
    <>
      <Navbar/>
      <div className='container d-flex justify-content-center align-items-center min-vh-100'>
        <div className='row border rounded-5 p-3 bg-white shadow box-area'>
          <div className='col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box' style={{background: '#ffffff'}}>
            <div className='kuebm-logo mb-5 mt-3'>
              <img src={logo} alt='logo' className='img-fluid' style={{width: 250 + 'px'}}/>
            </div>
          </div>
          <div className='col-md-6 right-box'>
            <div className='row align-items-center'>
              <div className='header-text mb-4 mt-3 text-wrap text-center'>
                <h2>สร้างชมรมใหม่</h2>
                <p>กรุณากรอกข้อมูลชมรมของคุณให้ครบถ้วน</p>
              </div>
              <CreateClubComponent/>
              <p className='text-center'>ต้องการยกเลิกการสร้างชมรม? <a href='/user'> กลับสู่หน้าเข้าร่วมชมรม</a></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateClub