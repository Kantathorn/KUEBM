import React,{ useEffect,useState } from 'react'
import Navbar from '../../Component/Navbar'
import axios from 'axios'

import newIcon from '../../Image/icon-new.svg'
import approveIcon from '../../Image/icon-approve.svg'
import inuIcon from '../../Image/icon-in-use.svg'
import comIcon from '../../Image/icon-return.svg'

import EquipmentChart from '../../Component/EquipmentChart'

function EquipmentManager() {
  const [user, setUser] = useState([]);
  const [date,setDate] = useState('')
  const [newRequest, setNewRequest] = useState('')
  const [approveRequest, setApproveRequest] = useState('')
  const [inuRequest, setInuRequest] = useState('')
  const [returnRequest, setReturnRequest] = useState('')
  const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric'};
      return new Date(dateString).toLocaleString('th-TH', options);
  }

  useEffect(() => {
      const date = new Date();
      setDate(formatDate(date.toISOString()))
      axios.get('http://localhost:5500/user/info', { withCredentials: true })
      .then((response) => {
          setUser(response.data);
      })
      .catch((error) => {
          window.location.href = '/login';
      });
  },[])

  useEffect(() => {
      axios.get('http://localhost:5500/statistic/request/new', { withCredentials:true }).then((response) => {
          setNewRequest(response.data)
      }).catch(() => {})
      axios.get('http://localhost:5500/statistic/request/approve', { withCredentials:true }).then((response) => {
          setApproveRequest(response.data)
      }).catch(() => {})
      axios.get('http://localhost:5500/statistic/request/in_use', { withCredentials:true }).then((response) => {
          setInuRequest(response.data)
      }).catch(() => {})
      axios.get('http://localhost:5500/statistic/request/returned', { withCredentials:true }).then((response) => {
          setReturnRequest(response.data)
      }).catch(() => {})
  },[user])

  return (
      <>
          <Navbar/>
          <div className="container-fluid">
              <div className='fs-3 mt-3 mb-4 ms-5'>ข้อมูลชมรมประจำวันที่ {date}</div>
              <div className="row">
                  <div className="col-md-3">
                      <div className="card mb-4">
                          <div className="card-body row">
                              <div className='col-md-8'>
                                  <h5 className="card-title text-uppercase text-muted mb-4">คำร้องใหม่</h5>
                                  <h1 className="">{newRequest}</h1>
                              </div>
                              <div class="col-auto">
                                  <img src={newIcon} width="80rem" alt='new-icon'/>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-3">
                      <div className="card mb-4">
                          <div className="card-body row">
                              <div className='col-md-8'>
                                  <h5 className="card-title text-uppercase text-muted mb-4">คำร้องที่อนุมัติแล้ว</h5>
                                  <h1 className="">{approveRequest}</h1>
                              </div>
                              <div className="col-auto">
                                  <img src={approveIcon} width="80rem" alt='new-icon'/>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-3">
                      <div className="card mb-4">
                          <div className="card-body row">
                              <div className='col-md-8'>
                                  <h5 className="card-title text-uppercase text-muted mb-4">คำร้องที่กำลังใช้อยู่</h5>
                                  <h1 className="">{inuRequest}</h1>
                              </div>
                              <div className="col-auto">
                                  <img src={inuIcon} width="80rem" alt='new-icon'/>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-3">
                      <div className="card mb-4">
                          <div className="card-body row">
                              <div className='col-md-8'>
                                  <h5 className="card-title text-uppercase text-muted mb-4">คำร้องที่คืนพัสดุแล้ว</h5>
                                  <h1 className="">{returnRequest}</h1>
                              </div>
                              <div className="col-auto">
                                  <img src={comIcon} width="80rem" alt='new-icon'/>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className='row'>
                  <div className="col-md-6">
                      <div className="card mb-4">
                          <div className="card-body">
                              <h5 className="card-title text-uppercase text-muted mb-4">สถิติพัสดุของชมรม</h5>
                              <div className='d-flex justify-content-center'>
                                  <EquipmentChart/>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default EquipmentManager