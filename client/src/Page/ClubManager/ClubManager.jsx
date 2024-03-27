import React from 'react'

import Navbar from '../../Component/Navbar'

function ClubManager() {
  return (
    <>
        <Navbar/>
        <div className="container-fluid">
          <div className='fs-3 mt-2 mb-2'>ยินดีต้อนรับสู่ชมรม </div>
            <div className="row">
                <div className="col-md-3">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">คำร้องใหม่</h5>
                            <p className="card-text">This is card 1 content.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">คำร้องที่ถูกอนุมัติ</h5>
                            <p className="card-text">This is card 2 content.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">คำร้องที่สำเร็จ</h5>
                            <p className="card-text">This is card 3 content.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">คำร้องที่ถูกยกเลิก</h5>
                            <p className="card-text">This is card 4 content.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
              <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Card 1</h5>
                            <p className="card-text">This is card 1 content.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ClubManager