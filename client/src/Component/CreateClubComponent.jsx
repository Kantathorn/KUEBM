import React,{ useState,useEffect } from 'react'
import axios from "axios";
import "./Style/RegisterComponent.css";
import Swal from 'sweetalert2'

function CreateClubComponent() {
  //Get User Data
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
  // Get Club type
  const [typeList, setTypeList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5500/club/type/list", { withCredentials: true })
    .then((response) => {
      setTypeList(response.data)
    })
    .catch((error) => {
      console.log('Error to Query Club Type List:', error);
    })
  }, [])
  //Store data state
  const [state, setState] = useState({
      name: "",
      type: "",
      email: "",
      address: "",
      promptPay: "",
      register_pass: "",
      accept_policy: false
  });
  //Handle Input
  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  //Validate Data
  //Store Error State
  const [errors, setErrors] = useState({});
  const { name,type,email,address,promptPay,register_pass,accept_policy } = state;

  const validateForm = () => {
    const formError = {};
    if (!name.trim()){
      formError.name = "กรุณาใส่ชื่อชมรม"
    }
    if (!type.trim()){
      formError.type = "กรุณาเลือกประเภทชมรม"
    }
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
    if (!register_pass.trim()){
      formError.register_pass = "กรุณากำหนดรหัสในการใช้เข้าร่วมชมรม"
    }
    if (!accept_policy){
      formError.accept_policy = "โปรดอ่านเงื่อนไข และ ยอมรับข้อตกลงในการสร้างชมรมใหม่"
    }
    setErrors(formError);
    return Object.keys(formError).length === 0;
  }

  // Handle Submit
  const submitHandler = async function (e) {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      //Submit
      Swal.fire({
        title: "ยืนยันที่จะสร้างชมรมหรือไม่",
        text: "เมื่อสร้างชมรมแล้ว คุณจะได้เป็นผู้จัดการชมรมอัตโนมัติ",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        confirmButtonColor: "#198754",
        cancelButtonText: "ยกเลิก",
        cancelButtonColor: "#DC3545"
      }).then((result) => {
        if (result.isConfirmed){
          //create club
          axios.post("http://localhost:5500/club/create", state, { withCredentials: true }).then((response => {
            axios.patch("http://localhost:5500/user/change/role", { user:user._id,role:"ClubManager"}, { withCredentials: true }).then((response => {
              Swal.fire({
                title: "สร้างชมรมสำเร็จ",
                text: "ระบบกำลังนำคุณเข้าสู่หน้าจัดการชมรม",
                icon: "success"
              }).then(function() {
                  window.location.href = '/club_manager'
              })
            }))
            .catch((error) => {
              Swal.fire({
                title: "เกิดข้อผิดพลาด ไม่สามารถสร้างชมรมได้",
                text: error,
                icon: "error"
              })
            })
          }))
          .catch((error) => { console.log(error) })
        }
      })
    }
    else {
      console.log("Error: Please fill the form.")
    }
  }
  
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label className="input-group fs-6">ชื่อชมรม</label>
        <div className="input-group mb-1">
          <input
            type="text"
            className="form-control form-control-lg bg-light fs-6"
            placeholder="เช่น ชมรมไอที"
            value={name}
            onChange={inputValue("name")}
          />
        </div>
        {errors.name && (<p className="error-alert mb-1">{errors.name}</p>)}
        <label className='input-froup fs-6'>ประเภทชมรม</label>
        <div className='input-group mb-1'>
          <select
            className='form-select form-select-lg bg-light fs-6'
            aria-label='Default select example'
            value={type}
            onChange={inputValue('type')}
          >
            <option value='' disabled>
              เลือกประเภทชมรม
            </option>
            {typeList.map((typeList) => (
              <option key={typeList._id} value={typeList._id}>
                {typeList.name}
              </option>
            ))}
          </select>
        </div>
        {errors.type && (<p className="error-alert mb-1">{errors.type}</p>)}
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
        <label className="input-group fs-6">รหัสในการเข้าร่วมชมรม</label>
        <div className="input-group mb-1">
          <input
            type="text"
            className="form-control form-control-lg bg-light fs-6"
            placeholder="รหัสนี้จะถูกใช้ในการเข้าร่วมชมรมของสมาชิก"
            value={register_pass}
            onChange={inputValue("register_pass")}
          />
        </div>
        {errors.register_pass && (<p className="error-alert mb-1">{errors.register_pass}</p>)}
        <div class="form-check">
          <input 
            type="checkbox" 
            className="form-check-input" 
            value={accept_policy}
            onChange={() => setState({ ...state, accept_policy: !accept_policy })}
          />
          <label class="form-check-label" for="flexCheckDefault">
            {/* Add Policy file */}
            ยอมรับเงื่อนไข 
          </label>
        </div>
        {errors.accept_policy && (<p className="error-alert mb-1">{errors.accept_policy}</p>)}
        <div className='input-group mb-3 mt-3'>
          <input
            type='submit'
            value='ยืนยัน'
            className='btn btn-lg btn-success w-100 fs-5'
          />
        </div>
      </form>
    </div>
  )
}

export default CreateClubComponent