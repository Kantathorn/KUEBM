import React from 'react'
import logo from '../Image/navbar-logo.svg'
import axios from 'axios';

function Navbar(props) {
  const submitHandler = async function (e) {
    e.preventDefault();
    axios.get("http://localhost:5500/auth/logout",{withCredentials: true}).then((success => {
      window.location.href = '/login'
    }))
    .catch((error) => {})
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body fix-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home"><img src={logo} alt="Navbar-logo" width="75"/></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/user" style={{color: "#ffffff"}}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/equipment" style={{color: "#ffffff"}}>จัดการพัสดุ</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link active' aria-current="page" href="/club/management" style={{color: "#ffffff"}}>จัดการชมรม</a>
              </li>
            </ul>
            <div className="d-flex">
              <button className="btn btn-outline-danger" onClickCapture={submitHandler}>Logout</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar