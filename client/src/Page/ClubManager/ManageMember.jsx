import React,{ useState,useEffect} from 'react'
import axios from 'axios';
import Navbar from '../../Component/Navbar'
import Swal from 'sweetalert2';

import './Style.css'

function ManageMember() {
    const [user, setUser] = useState([]);
    const [manager, setManager] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');
    const [selectUser, setSelectUser] = useState('');
    const [selectDelete, setSelectDelete] = useState('')
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        axios.get('http://localhost:5500/user/info', { withCredentials: true })
            .then((response) => {
                setManager(response.data);
            })
            .catch((error) => {
                window.location.href = '/login';
            });
    }, []);

    useEffect(() => {
        if (manager) {
        axios.post('http://localhost:5500/club/member',{ club:manager.club._id },{ withCredentials: true })
            .then((respose) => {
            setUser(respose.data)
            })
            .catch(() => {})
        }
    },[manager])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleEditClick = (item) => {
        setSelectUser(item);
    };
    useEffect(() => {
        if (selectUser) {
            Swal.fire({
                icon: 'question',
                title: `กรุณาเลือกตำแหน่งใหม่`,
                text: `${selectUser.first_name} ${selectUser.last_name}`,
                input: "select",
                inputOptions: {
                    User : "User",
                    EquipmentManager : "EquipmentManager"
                },
                inputPlaceholder: `ตำแหน่ง`,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: "ยืนยัน",
                confirmButtonColor: "#198754",
                cancelButtonText: "ยกเลิก",
                cancelButtonColor: "#DC3545",
            }).then((result) => {
                if (result.isConfirmed){
                    console.log({
                        user : selectUser._id,
                        role : result.value
                    })
                    axios.patch("http://localhost:5500/user/change/role",{ user:selectUser._id,role:result.value },{withCredentials:true}).then(() => {
                        Swal.fire({
                            icon: "success",
                            title: `เปลี่ยนแปลงตำแหน่งเรียบร้อย`,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            window.location.reload()
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
            setSelectUser('')
        }
    }, [selectUser]);

    const handleDeleteClick = (item) => {
        setSelectDelete(item)
    }
    useEffect(() => {
        if (selectDelete){
            Swal.fire({
                icon: 'warning',
                text: `ยืนยันที่จะลบ ${selectDelete.first_name} ${selectDelete.last_name} ออกจากชมรม`,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: "ยืนยัน",
                confirmButtonColor: "#198754",
                cancelButtonText: "ยกเลิก",
                cancelButtonColor: "#DC3545",
            }).then((result) => {
                if (result.isConfirmed){
                    axios.patch('http://localhost:5500/club/remove_member',{ user:selectDelete._id },{withCredentials:true}).then((response) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'ลบสมาชิกสำเร็จ',
                            text: `${response.data.first_name} ${response.data.last_name} ออกจากชมรมเรียบร้อยแล้ว`,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            window.location.reload()
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
            setSelectDelete('')
        }
    }, [selectDelete])
    const handleReloadClick = () => {
        window.location.reload()
    }


    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedUser = [...user].sort((a, b) => {
        if (sortConfig.key) {
            const key = sortConfig.key;
            const valueA = key === 'type' ? (a[key]?.type || '').toLowerCase() : (a[key] || '').toLowerCase();
            const valueB = key === 'type' ? (b[key]?.type || '').toLowerCase() : (b[key] || '').toLowerCase();
            const direction = sortConfig.direction === 'asc' ? 1 : -1;
            if (valueA < valueB) return -direction;
            if (valueA > valueB) return direction;
            return 0;
        }
        return 0;
    });

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '▲' : '▼';
        }
        return '';
    };

    const formatUpdatedAt = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleString('th-TH', options);
    };

    const filteredUser = sortedUser.filter((item) => {
        return (
            item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.phone_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formatUpdatedAt(item.updateAt).toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <>
            <Navbar/>
            <div className='equipment-table ms-3 mt-3 me-3 mb-3'>
                <h1 className='d-flex justify-content-center' style={{color: "#264653"}}>
                    Club's Members
                </h1>
                <p className='d-flex justify-content-center fs-6'>สมาชิก{manager ? manager.club.name : "-"}</p>
                <div className='d-flex justify-content-end'>
                    <input
                    className='form-control mb-3'
                    style={{ width: 25 + 'rem' }}
                    type="text"
                    placeholder="ค้นหาด้วย ชื่อ นามสกุล อีเมล์ ตำแหน่ง เป็นต้น"
                    value={searchTerm}
                    onChange={handleSearch}
                    />
                    <button className='btn btn-secondary mb-3 ms-3' onClick={() => handleReloadClick()}>Reload</button>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className='fs-6' onClick={() => handleSort('email')}>อีเมลล์ {getSortIcon('email')}</th>
                            <th className='fs-6' onClick={() => handleSort('first_name')}>ชื่อจริง {getSortIcon('first_name')}</th>
                            <th className='fs-6' onClick={() => handleSort('last_name')}>นามสกุล {getSortIcon('last_name')}</th>
                            <th className='fs-6' onClick={() => handleSort('student_id')}>รหัสนิสิต {getSortIcon('student_id')}</th>
                            <th className='fs-6' onClick={() => handleSort('phone_number')}>เบอร์โทรศัพธ์ {getSortIcon('phone_number')}</th>
                            <th className='fs-6' onClick={() => handleSort('role')}>ตำแหน่ง  {getSortIcon('role')}</th>
                            <th className='fs-6' onClick={() => handleSort('updatedAt')}>อัปเดตล่าสุด {getSortIcon('updatedAt')}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUser.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>{item.student_id}</td>
                                    <td>{item.phone_number}</td>
                                    <td>{item.role}</td>
                                    <td>{formatUpdatedAt(item.updatedAt)}</td>
                                    <td>
                                        {item.role !== 'ClubManager' ?
                                        <>
                                        <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(item)}>
                                            เปลี่ยนตำแหน่ง
                                        </button>
                                        <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDeleteClick(item)}>
                                            ออกจากชมรม
                                        </button>
                                        </>
                                        : <></>}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ManageMember