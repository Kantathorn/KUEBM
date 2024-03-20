import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from '../../Component/Navbar';

function Equipment() {
    const [user, setUser] = useState(null);
    const [equipments, setEquipments] = useState([]);
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

    useEffect(() => {
        if (selectedItem) {
            console.log(selectedItem._id);
            setSelectedItem('') // Clear Select Item
            // Action to edit equipment page
        }
    }, [selectedItem]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedEquipments = [...equipments].sort((a, b) => {
        if (sortConfig.key) {
            const key = sortConfig.key;
            const valueA = (a[key] || '').toLowerCase();
            const valueB = (b[key] || '').toLowerCase();
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

    const filteredEquipments = sortedEquipments.filter((item) => {
        return (
            item.fsn.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <>
            <Navbar />
            <div className='equipment-table ms-3 mt-3 me-3 mb-3'>
                <div className='row'>
                    <div className='col'></div>
                    <div className='col'></div>
                    <div className='col'></div>
                    <div className='col'>
                        <input
                            className='form-control mb-3'
                            type="text"
                            placeholder="Search by FSN, Name, Detail, or Status"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className="table-responsive-md">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className='fs-6' onClick={() => handleSort('fsn')}>หมายเลขครุภัณฑ์ {getSortIcon('fsn')}</th>
                                <th className='fs-6' onClick={() => handleSort('name')}>รายการ {getSortIcon('name')}</th>
                                <th className='fs-6' onClick={() => handleSort('detail')}>รายละเอียดเพิ่มเติม {getSortIcon('detail')}</th>
                                <th className='fs-6' onClick={() => handleSort('status')}>สถานะ {getSortIcon('status')}</th>
                                <th className='fs-6' onClick={() => handleSort('updatedAt')}>อัพเดธล่าสุด {getSortIcon('updatedAt')}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEquipments.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td>{item.fsn}</td>
                                        <td>{item.name}</td>
                                        <td>{item.detail}</td>
                                        <td>{item.status}</td>
                                        <td>{formatUpdatedAt(item.updatedAt)}</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(item)}>
                                                แก้ไขสถานะ
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='row'>
                    <div className='col'></div>
                    <div className='col'></div>
                    <div className='col'></div>
                    <div className='col'>
                        <a className='btn btn-success' href='/equipment/new'>เพิ่มพัสดุอุปกรณ์</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Equipment;
