import React from 'react'
import logo from '../Image/navbar-logo.svg'

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home"><img src={logo} alt="Navbar-logo" width="75"/></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar