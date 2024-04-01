import React, { useState } from "react";
import axios from "axios";
import "./Style/RegisterComponent.css";
import Swal from 'sweetalert2'

function RegisterComponent() {
    //Store data state
    const [state, setState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        first_name: "",
        last_name: "",
        student_id: "",
        phone_number: "",
        role: "User"
    });

    //Store Error State
    const [errors, setErrors] = useState({});
    const { email,password,confirmPassword,first_name,last_name,student_id,phone_number } = state;

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

        if (password.length <= 7) {
            console.log(password.length)
            formErrors.password = "รหัสผ่านต้องมีความยาวมากกว่า 8 ตัวอักษร";
        }

        if (password !== confirmPassword) {
            formErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
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
            title: "ลงทะเบียนสำเร็จ",
            text: "ระบบได้รับข้อมูลการลงทะเบียนเรียบร้อยแล้ว",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
        }).then(function() {
            window.location.href = '/login'
        })
    }

    const showUserErrorAlert = () =>{
        Swal.fire({
            title: "ไม่สามารถลงทะเบียนได้",
            text: "เนื่องจากมีอีเมลผู้ใช้นี้อยู่ในระบบแล้ว",
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
            axios.post('http://localhost:5500/auth/register',state, {withCredentials: true}).then((response) => {
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
                <label className="input-group fs-6">รหัสผ่าน</label>
                <div className="input-group mb-1">
                    <input
                        type="password"
                        className="form-control form-control-lg bg-light fs-6"
                        placeholder="รหัสผ่านจะต้องมีความยาวอย่างน้อย 8 ตัวอักษร"
                        value={password}
                        onChange={inputValue("password")}
                    />
                </div>
                {errors.password && <p className="error-alert mb-1">{errors.password}</p>}
                <label className="input-group fs-6">ยืนยันรหัสผ่าน</label>
                <div className="input-group mb-1">
                    <input
                        type="password"
                        className="form-control form-control-lg bg-light fs-6"
                        placeholder="กรอกรหัสผ่านอีกครั้งเพื่อยืนยัน"
                        value={confirmPassword}
                        onChange={inputValue("confirmPassword")}
                    />
                </div>
                {errors.confirmPassword && (<p className="error-alert mb-1">{errors.confirmPassword}</p>)}
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
                        value="ยืนยันการลงทะเบียน"
                        className="btn btn-lg btn-success w-100 fs-5"
                    />
                </div>
            </form>
        </div>
    );
}

export default RegisterComponent;