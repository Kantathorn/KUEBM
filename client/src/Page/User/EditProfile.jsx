import React, { useState,useEffect } from "react";
import axios from "axios";
import "../../Component/Style/RegisterComponent.css";
import Swal from 'sweetalert2'
import logo from '../../Image/user-logo.svg'

import Navbar from '../../Component/Navbar'

function EditProfile() {
    useEffect(() => {
        axios.get('http://localhost:5500/user/info', { withCredentials: true })
            .then((response) => {
                setState(response.data);
            })
            .catch((error) => {
                window.location.href = '/login';
            });
      }, []);
//Store data state
const [state, setState] = useState({
    email: "",
    first_name: "",
    last_name: "",
    student_id: "",
    phone_number: ""
});

//Store Error State
const [errors, setErrors] = useState({});
const { email,first_name,last_name,student_id,phone_number } = state;

const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
};

const validateForm = () => {
    const formErrors = {};
    if (!email.trim()) {
        formErrors.email = "กรุณาใส่อีเมล KU";
    } else if (!/\S+@ku.th/.test(email)) {
        formErrors.email = "อีเมล KU ของคุณไม่ถูกต้อง";
    }

    if (!first_name.trim()) {
        formErrors.first_name = "โปรดระบุชื่อจริง";
    }

    if (!last_name.trim()) {
        formErrors.last_name = "โปรดระบุนามสกุล";
    }

    if (!student_id.trim()) {
        formErrors.student_id = "โปรดระบุรหัสนิสิต";
    } else if (student_id.length !== 10) {
        formErrors.student_id = "รหัสนิสิตไม่ถูกต้อง";
    }

    if (!phone_number.trim()) {
        formErrors.phone_number = "โปรดระบุเบอร์โทรศัพท์";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
};

const showSuccessAlert = () =>{
    Swal.fire({
        title: "แก้ไขข้อมูลสำเร็จ",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
    }).then(function() {
        window.location.href = '/home'
    })
}

const showUserErrorAlert = () =>{
    Swal.fire({
        title: "เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
    })
}

const showErrorAlert = () => {
    Swal.fire({
        title: "ไม่สามารถลงทะเบียนได้",
        text: "กรุณากรอกข้อมูลให้ถูกต้องครบถ้วน",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500
    })
}

const submitHandler = async function (e) {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
        // console.table({state});

        axios.patch('http://localhost:5500/user/edit',state, {withCredentials: true}).then((response) => {
            showSuccessAlert();
        })
        .catch((error) => {
            showUserErrorAlert();
        })
    } else {
        showErrorAlert();
    }
};

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
                            <h2>Edit Profile</h2>
                            <p>แก้ไขข้อมูล</p>
                        </div>
                    <div>
                    <form onSubmit={submitHandler}>
                        <label className="input-group fs-6">อีเมล KU</label>
                        <div className="input-group mb-1">
                            <input
                                type="email"
                                className="form-control form-control-lg bg-light fs-6"
                                placeholder="เช่น xxxx@ku.th"
                                value={email}
                                onChange={inputValue("email")}
                            />
                        </div>
                        {errors.email && <p className="error-alert mb-1">{errors.email}</p>}
                        <label className="input-group fs-6">ชื่อจริง</label>
                        <div className="input-group mb-1">
                            <input
                                type="text"
                                className="form-control form-control-lg bg-light fs-6"
                                placeholder="ระบุชื่อจริง และ ชื่อกลาง โดยไม่ต้องมีคำนำหน้า"
                                value={first_name}
                                onChange={inputValue("first_name")}
                            />
                        </div>
                        {errors.first_name && (<p className="error-alert mb-1">{errors.first_name}</p>)}
                        <label className="input-group fs-6">นามสกุล</label>
                        <div className="input-group mb-1">
                            <input
                                type="text"
                                className="form-control form-control-lg bg-light fs-6"
                                placeholder="ระบุนามสกุลของคุณ"
                                value={last_name}
                                onChange={inputValue("last_name")}
                            />
                        </div>
                        {errors.last_name && <p className="error-alert mb-1">{errors.last_name}</p>}
                        <label className="input-group fs-6">รหัสนิสิต</label>
                        <div className="input-group mb-1">
                            <input
                                type="text"
                                className="form-control form-control-lg bg-light fs-6"
                                placeholder="ระบุรหัสนิสิต 10 หลัก"
                                value={student_id}
                                onChange={inputValue("student_id")}
                                />
                        </div>
                        {errors.student_id && (<p className="error-alert mb-1">{errors.student_id}</p>)}
                        <label className="input-group fs-6">เบอร์โทรศัพธ์</label>
                        <div className="input-group mb-1">
                            <input
                                type="text"
                                className="form-control form-control-lg bg-light fs-6"
                                placeholder="ระบุเบอร์โทรศัพธ์ที่สามารถติดต่อได้"
                                value={phone_number}
                                onChange={inputValue("phone_number")}
                                />
                        </div>
                        {errors.phone_number && (<p className="error-alert mb-1">{errors.phone_number}</p>)}
                        <div className="input-group mb-3 mt-3">
                            <input
                                type="submit"
                                value="ยืนยันการเปลี่ยนข้อมูล"
                                className="btn btn-lg btn-success w-100 fs-5"
                                />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</>
);
}

export default EditProfile