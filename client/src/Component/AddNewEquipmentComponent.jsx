import React,{ useEffect,useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

function AddNewEquipmentComponent() {
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
  
  const [categories,setCategories] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5500/equipment/category', { withCredentials: true })
    .then((response) => {
      setCategories(response.data);
    })
    .catch((error) => {
      console.log('Error to Query Category:', error);
    });
  }, []);

  //Store data state
  const [state, setState] = useState({
    fsn: "",
    name: "",
    detail: "",
    category: "",
    owner: "",
    cost: "",
  });

  //Handle Input
  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  //Validate Data
  //Store Error State
  const [errors, setErrors] = useState({});
  const { name,fsn,detail,category,cost } = state;

  const validateForm = () => {
    const formError = {};
    if (!name.trim()){
      formError.name = "กรุณาใส่ชื่อพัสดุ"
    }
    if (!fsn.trim()){
      formError.fsn = "กรุณาใส่หมายเลขครุภัณฑ์"
    }
    if (!detail.trim()){
      formError.detail = "กรุณาระบุรายละเอียดพัสดุ"
    }
    if (!category.trim()){
      formError.category = "กรุณาเลือกหมวดหมู่"
    }
    if (!cost.trim()){
      formError.cost = "กรุณาใส่ราคา"
    }
    setErrors(formError);
    return Object.keys(formError).length === 0;
  }

  const submitHandler = async function (e) {
    e.preventDefault();
    setState({
      ...state,
      owner: user.club._id
    });
    const isFormValid = validateForm();
    if (isFormValid){
      Swal.fire({
        icon: "question",
        title: "ยืนยันที่จะเพิ่มพัสดุหรือไม่",
        text: state.fsn + ",\n" + state.name + ",\n" + state.detail + ",\n" + state.cost + " บาท" ,
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        confirmButtonColor: "#198754",
        cancelButtonText: "ยกเลิก",
        cancelButtonColor: "#DC3545",
      }).then((result) => {
        if (result.isConfirmed){
          axios.post("http://localhost:5500/equipment/new",state,{ withCredentials: true }).then((response) => {
            Swal.fire({
              title: "เพิ่มพัสดุสำเร็จ",
              text: "ระบบได้ทำการเพิ่มพัสดุใหม่ให้คุณเรียบร้อยแล้ว",
              icon: "success"
            }).then(function() {
                window.location.href = '/equipment'
            })
          }).catch((error) => {
            Swal.fire({
              title: "ไม่สามารถเพิ่มพัสดุใหม่ได้",
              text: "เนื่องจากมีพัสดุชิ้นนี้อยู่ในระบบแล้ว",
              icon: "error"
            })
          })
        }
      })
    }
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label className='input-group fs-6'>ชื่อพัสดุ</label>
        <div className="input-group mb-1">
          <input
            type="text"
            className="form-control form-control-lg bg-light fs-6"
            placeholder="เช่น โต๊ะหน้าขาว, เก้าอี้พลาสติก"
            value={name}
            onChange={inputValue("name")}
          />
        </div>
        {errors.name && (<p className="error-alert mb-1">{errors.name}</p>)}
        <label className='input-group fs-6'>เลขครุภัณฑ์</label>
        <div className="input-group mb-1">
          <input
            type="text"
            className="form-control form-control-lg bg-light fs-6"
            placeholder="หมายเลขครุภัณฑ์ของพัสดุ"
            value={fsn}
            onChange={inputValue("fsn")}
          />
        </div>
        {errors.fsn && (<p className="error-alert mb-1">{errors.fsn}</p>)}
        <label className='input-group fs-6'>รายละเอียด</label>
        <div className="input-group mb-1">
          <input
            type="text"
            className="form-control form-control-lg bg-light fs-6"
            placeholder="เช่น สี ขนาด รายละเอียดเฉพาะเจาะจง"
            value={detail}
            onChange={inputValue("detail")}
          />
        </div>
        {errors.detail && (<p className="error-alert mb-1">{errors.detail}</p>)}
        <label className='input-froup fs-6'>หมวดหมู่</label>
        <div className='input-group mb-1'>
          <select
            className='form-select form-select-lg bg-light fs-6'
            aria-label='Default select example'
            value={category}
            onChange={inputValue('category')}
          >
            <option value='' disabled>
              เลือกหมวดหมู่
            </option>
            {categories.map((categories) => (
              <option key={categories._id} value={categories._id}>
                {categories.name}
              </option>
            ))}
          </select>
        </div>
        {errors.category && (<p className="error-alert mb-1">{errors.category}</p>)}
        <label className='input-group fs-6'>ราคา (บาท)</label>
        <div className="input-group mb-1">
          <input
            type="text"
            className="form-control form-control-lg bg-light fs-6"
            placeholder="ราคาพัสดุโดยประมาณ"
            value={cost}
            onChange={inputValue("cost")}
          />
        </div>
        {errors.cost && (<p className="error-alert mb-1">{errors.cost}</p>)}
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

export default AddNewEquipmentComponent