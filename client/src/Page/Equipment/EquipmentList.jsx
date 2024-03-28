import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

import './Style/Equipment.css'
import Navbar from '../../Component/Navbar';

function Equipment() {
    const [user, setUser] = useState(null);
    const [equipments, setEquipments] = useState([]);
    const [request,setRequest] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        axios.get('http://localhost:5500/user/info', { withCredentials: true })
            .then((response) => {
                setUser(response.data.club._id);
            })
            .catch((error) => {
                window.location.href = '/login';
            });
    }, []);

    useEffect(() => {
        if (user) {
            axios.post('http://localhost:5500/equipment/list/byclub', { club: user }, { withCredentials: true })
                .then((response) => {
                    setEquipments(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching equipment data:', error);
                });
        }
    }, [user]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleEditClick = (item) => {
        setSelectedItem(item);
    };

    const handleDetailClick = (item) => {
        setRequest(item)
    }

    useEffect(() => {
        if (selectedItem) {
            // console.log(selectedItem._id);
            Swal.fire({
                title: "เปลี่ยนสถานะของพัสดุ",
                text: selectedItem.name,
                icon: "question",
                input: "select",
                inputOptions: {
                    "Available" : "Available",
                    "Inactive" : "Inactive"
                },
                inputPlaceholder: "เลือกสถานะ",
                showCancelButton: true,
                confirmButtonText: "ยืนยัน",
                confirmButtonColor: "#198754",
                cancelButtonText: "ยกเลิก",
                cancelButtonColor: "#DC3545",
                inputValidator: (value) => {
                    if (value !== selectedItem.status){
                        axios.patch("http://localhost:5500/equipment/change/status", { equipment:selectedItem._id, status:value }, { withCredentials: true }).then((response) => {
                            Swal.fire({
                                title: "เปลี่ยนสถานะสำเร็จ",
                                text: selectedItem.name + " ถูกเปลี่ยนเป็น " + value,
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1500
                              }).then(function() {
                                  window.location.reload()
                              })
                        }).catch({})
                    }
                }
            })
            setSelectedItem('')
        }
    }, [selectedItem]);

    useEffect(() => {
        if (request){
            axios.post('http://localhost:5500/request/item',{ item:request._id },{withCredentials: true}).then((result) => {
                window.location.href = `/request/${result.data._id}`
            })
            setRequest('')
        }
    },[request])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleString('th-TH', options);
    }

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleReloadClick = () => {
        window.location.reload()
    }

    const sortedEquipments = [...equipments].sort((a, b) => {
        if (sortConfig.key === 'category') {
            const valueA = (a.category ? a.category.name : '').toLowerCase();
            const valueB = (b.category ? b.category.name : '').toLowerCase();
            const direction = sortConfig.direction === 'asc' ? 1 : -1;
            if (valueA < valueB) return -direction;
            if (valueA > valueB) return direction;
            return 0;
        } else {
            const valueA = (a[sortConfig.key] || '').toLowerCase();
            const valueB = (b[sortConfig.key] || '').toLowerCase();
            const direction = sortConfig.direction === 'asc' ? 1 : -1;
            if (valueA < valueB) return -direction;
            if (valueA > valueB) return direction;
            return 0;
        }
    });

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '▲' : '▼';
        }
        return '';
    };

    const filteredEquipments = sortedEquipments.filter((item) => {
        return (
            item._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.fsn.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.category && item.category.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            item.cost.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <>
            <Navbar />
            <div className='equipment-table ms-3 mt-3 me-3 mb-3'>
                <h1 className='d-flex justify-content-center' style={{color: "#264653"}}>
                    Manage Equipment
                </h1>
                <p className='d-flex justify-content-center fs-6'>จัดการข้อมูลพัสดุอุปกรณ์</p>
                <div className='d-flex justify-content-end'>
                    <input
                        className='form-control mb-3'
                        style={{ width: 25 + 'rem' }}
                        type="text"
                        placeholder="ค้นหาด้วย หมายเลขครุภัณฑ์ ชื่อพัสดุ รายละเอียด"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button className='btn btn-secondary mb-3 ms-3' onClick={() => handleReloadClick()}>Reload</button>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className='fs-6' onClick={() => handleSort('_id')}>ID {getSortIcon('_id')}</th>
                                <th className='fs-6' onClick={() => handleSort('fsn')}>หมายเลขครุภัณฑ์ {getSortIcon('fsn')}</th>
                                <th className='fs-6' onClick={() => handleSort('name')}>รายการ {getSortIcon('name')}</th>
                                <th className='fs-6' onClick={() => handleSort('detail')}>รายละเอียดเพิ่มเติม {getSortIcon('detail')}</th>
                                <th className='fs-6' onClick={() => handleSort('category')}>หมวดหมู่ {getSortIcon('category')}</th>
                                <th className='fs-6' onClick={() => handleSort('cost')}>ราคา {getSortIcon('cost')}</th>
                                <th className='fs-6' onClick={() => handleSort('status')}>สถานะ {getSortIcon('status')}</th>
                                <th className='fs-6'>ถูกเพิ่มโดย</th>
                                <th className='fs-6'>แก้ไขโดย</th>
                                <th className='fs-6'>แก้ไขล่าสุดเมื่อ</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEquipments.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td>{item._id}</td>
                                        <td>{item.fsn}</td>
                                        <td>{item.name}</td>
                                        <td>{item.detail}</td>
                                        <td>{item.category ? item.category.name : '-'}</td>
                                        <td>{item.cost}</td>
                                        {item.status === "Available" ? <td style={{color: "#2a9d8f"}}>{item.status}</td> : <></>}
                                        {item.status === "Pending" ? <td style={{color: "#e76f51"}}>{item.status}</td> : <></>}
                                        {item.status === "In-use" ? <td style={{color: "#f4a261"}}>{item.status}</td> : <></>}
                                        {item.status === "Inactive" ? <td style={{color: "#ff5550"}}>{item.status}</td> : <></>}
                                        <td>{item.created_by ? item.created_by.first_name + ' ' + item.created_by.last_name : '-'}</td>
                                        <td>{item.updated_by ? item.updated_by.first_name + ' ' + item.updated_by.last_name : '-'}</td>
                                        <td>{formatDate(item.updatedAt)}</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(item)}>
                                                แก้ไขสถานะ
                                            </button>
                                            {item.status !== "Available" && item.status !== "Inactive" ? 
                                                <button className='btn btn-secondary btn-sm ms-3' onClick={() => handleDetailClick(item)}>
                                                    ข้อมูลผู้ยืม
                                                </button> : <></>
                                            }
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='d-flex justify-content-end'>
                    <a className='btn btn-success' href='/equipment/new'>เพิ่มรายการอุปกรณ์</a>
                </div>
            </div>
        </>
    );
}

export default Equipment;
