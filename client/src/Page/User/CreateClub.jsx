import React,{ useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../Component/Navbar'
import CreateClubComponent from '../../Component/CreateClubComponent'
import logo from '../../Image/logo-choose-club.svg'

function CreateClub() {
  // Check Role and Is Login
  useEffect(() => {
    axios.get('http://localhost:5500/user/info',{withCredentials: true}).then((response) => {
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
          if (response.data.club !== null){
            window.location.href = '/user'
          }
      }
    }).catch((error) => {
      window.location.href = '/login'
    })
  },[])
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