import React,{ useState,useEffect} from 'react'
import axios from 'axios';
import Navbar from '../../Component/Navbar'
import Swal from 'sweetalert2';
import logo from '../../Image/logo-choose-club.svg'

function Club() {
  const [user, setUser] = useState([]);
  const [club,setClub] = useState({
    name: "",
    type: "",
    email: "",
    address: "",
    promptPay: ""
  })

  useEffect(() => {
    axios.get('http://localhost:5500/user/info', { withCredentials: true })
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            window.location.href = '/login';
        });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5500/club/profile', { withCredentials: true}).then((response) => {
      setClub(response.data)
    }).catch((error) => {})
  },[user])
  
  const inputValue = (name) => (event) => {
    setClub({ ...club, [name]: event.target.value });
  };

  //Validate Data
  //Store Error State
  const [errors, setErrors] = useState({});
  const { email,address,promptPay } = club;

  const validateForm = () => {
    const formError = {};
    if (!email.trim()) {
      formError.email = "กรุณาใส่อีเมลล์ของชมรม";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formError.email = "อีเมลล์ไม่ถูกต้อง";
    }
    if (!address.trim()){
      formError.address = "กรุณาใส่ที่อยู่ชมรม"
    }
    if (!promptPay.trim()){
      formError.promptPay = "กรุณาใส่หมายเลขพร้อมเพย์"
    }
    setErrors(formError);
    return Object.keys(formError).length === 0;
  }

  const submitHandler = async function (e) {
    e.preventDefault();
    const isFormValid = validateForm();
      if (isFormValid) {
        Swal.fire({
          icon: 'question',
          text: "ยืนยันที่จะเปลี่ยนแปลงข้อมูลหรือไม่",
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: "ยืนยัน",
          confirmButtonColor: "#198754",
          cancelButtonText: "ยกเลิก",
          cancelButtonColor: "#DC3545"
        }).then((result) => {
          if (result.isConfirmed){
            axios.patch("http://localhost:5500/club/profile/change", {
              club_id: club._id,
              email: club.email,
              address: club.address,
              promptPay: club.promptPay
            },{withCredentials:true}).then(() => {
              Swal.fire({
                icon: "success",
                title: `บันทึกข้อมูลสำเร็จ`,
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                  window.location.href = "/club_manager"
              })
            }).catch(() => {
              Swal.fire({
                icon: "error",
                title: `เกิดข้อผิดพลาด`,
                text: `กรุณาลองใหม่อีกครั้งภายหลัง`,
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                  window.location.reload()
              })
            })
          }
        })
      }
    }

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
                        <h2>Edit Club's Profile</h2>
                        <p>แก้ไขข้อมูลชมรม</p>
                    </div>
                </div>
                <div>
                  <form onSubmit={submitHandler}>
                    <label className='input-group fs-6'>ชื่อชมรม (หากต้องการเปลี่ยนแปลง กรุณาติดต่อผู้ดูแลระบบ)</label>
                    <div className="input-group mb-1">
                      <input
                        type="text"
                        readOnly
                        className="form-control form-control-lg bg-light fs-6"
                        value={club.name}
                      />
                    </div>
                    <label className='input-froup fs-6'>ประเภทชมรม (หากต้องการเปลี่ยนแปลง กรุณาติดต่อผู้ดูแลระบบ)</label>
                    <div className='input-group mb-1'>
                      <input
                          type="text"
                          readOnly
                          className="form-control form-control-lg bg-light fs-6"
                          value={club.type.name}
                        />
                    </div>
                    <label className="input-group fs-6">อีเมลล์ชมรม</label>
                    <div className="input-group mb-1">
                      <input
                        type="email"
                        className="form-control form-control-lg bg-light fs-6"
                        placeholder="โปรดระบุอีเมลล์ชมรม"
                        value={email}
                        onChange={inputValue("email")}
                      />
                    </div>
                    {errors.email && (<p className="error-alert mb-1">{errors.email}</p>)}
                    <label className="input-group fs-6">ที่อยู่ชมรม</label>
                    <div className="input-group mb-1">
                      <input
                        type="text"
                        className="form-control form-control-lg bg-light fs-6"
                        placeholder="เช่น ห้อง 301 ชั้น 3 อาคารกิจกรร 3"
                        value={address}
                        onChange={inputValue("address")}
                      />
                    </div>
                    {errors.address && (<p className="error-alert mb-1">{errors.address}</p>)}
                    <label className="input-group fs-6">หมายเลขพร้อมเพย์</label>
                    <div className="input-group mb-1">
                      <input
                        type="text"
                        className="form-control form-control-lg bg-light fs-6"
                        placeholder="หมายเลขพร้อมเพย์ของบัญชีชมรม"
                        value={promptPay}
                        onChange={inputValue("promptPay")}
                      />
                    </div>
                    {errors.promptPay && (<p className="error-alert mb-1">{errors.promptPay}</p>)}
                    <div className='input-group mb-3 mt-3'>
                      <input
                        type='submit'
                        value='ยืนยัน'
                        className='btn btn-lg btn-success w-100 fs-5'
                      />
                    </div>
                  </form>
                </div>
            </div>
        </div>
      </>
  );
}

export default Club