import React,{ useEffect,useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';

import Navbar from '../../Component/Navbar'

function CreateNew() {
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
          axios.get('http://localhost:5500/equipment/list', { withCredentials: true })
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

  const handleNewClick = (item) => {
      setSelectedItem(item);
  };

  useEffect(() => {
      if (selectedItem) {
        // Display SweetAlert prompt for request detail
        Swal.fire({
          title: 'โปรดระบุรายละเอียดในการขอยืม' + '\n' + selectedItem.name + '\n' + "จาก" + selectedItem.owner.name,
          html: `
            <label for="description" class="input-group fs-6">เหตุผลในการยืม</label>
            <div className="input-group mb-1">
              <input id="description" class="swal2-input" placeholder="เช่น ใช้ในโครงการเปิดโลกกิจกรรม">
            </div>
            <label for="collected_date" class="input-group fs-6 mt-3">วันที่ต้องการยืม</label>
            <div className="input-group mb-1">
              <input id="collected_date" class="swal2-input" placeholder="Collected Date" type="datetime-local">
            </div>
            <label for="returned_date" class="input-group fs-6 mt-3">วันที่ต้องการคืน</label>
            <div className="input-group mb-1">
              <input id="returned_date" class="swal2-input" placeholder="Returned Date" type="datetime-local">
            </div>
          `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: "ยืนยัน",
          confirmButtonColor: "#198754",
          cancelButtonText: "ยกเลิก",
          cancelButtonColor: "#DC3545",
          preConfirm: () => {
            return {
              description: document.getElementById('description').value,
              collected_date: document.getElementById('collected_date').value,
              returned_date: document.getElementById('returned_date').value
            };
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const { description, collected_date, returned_date } = result.value;
            // Post request detail to the backend
            axios.post("http://localhost:5500/request/create",{
              request_to: selectedItem.owner._id,
              description : description,
              collected_date : collected_date,
              returned_date : returned_date,
              item: selectedItem._id
            }, { withCredentials: true }).then((response => {
              // Action After Complete Create Requesr
              axios.patch("http://localhost:5500/equipment/change/status",{
                equipment: selectedItem._id,
                status: "Pending"
              }, { withCredentials: true }).then(response2 => {
                //Success
                Swal.fire({
                  title: "สร้างคำขอยืมสำเร็จ",
                  text: "โปรดรอการอนุมัติจากชมรมที่ท่านยืม",
                  icon: "success"
                }).then(function() {
                    window.location.href = '/user'
                })
              }).catch(error2 => {
                console.log(error2)
              })
            })).catch(error => {
              Swal.fire({
                title: "ไม่สามารถยืมพัสดุชิ้นนี้ได้",
                text: "เนื่องจากมียืมพัสดุไปก่อนหน้านี้แล้ว กรุณาลองใหม่อีกครั้ง",
                icon: "error"
              }).then(function() {
                window.location.reload()
              })
            })
          }
        });
        // Clear the selected item
        setSelectedItem(null);
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
      if (sortConfig.key === 'category') {
          const valueA = (a.category ? a.category.name : '').toLowerCase();
          const valueB = (b.category ? b.category.name : '').toLowerCase();
          const direction = sortConfig.direction === 'asc' ? 1 : -1;
          if (valueA < valueB) return -direction;
          if (valueA > valueB) return direction;
          return 0;
      }
      if (sortConfig.key === 'owner') {
        const valueA = (a.owner ? a.owner.name : '').toLowerCase();
        const valueB = (b.owner ? b.owner.name : '').toLowerCase();
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
          (item.owner && item.owner.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  });
  return (
    <>
        <Navbar/>
        <div className='equipment-table ms-3 mt-3 me-3 mb-3'>
          <h1 className='d-flex justify-content-center' style={{color: "#264653"}}>
            Create New Request
          </h1>
          <p className='d-flex justify-content-center fs-6'>สร้างคำขอยืมพัสดุอุปกรณ์ใหม่</p>
          <div className='d-flex mt-3'>
            <input
              className='form-control mb-3'
              type="text"
              placeholder="ค้นหาพัสดุที่ต้องการด้วย ชื่อ รายละเอียด ชมรมที่ต้องการยืม หมวดหมู่ เป็นต้น"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="table-responsive-md">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className='fs-6' onClick={() => handleSort('fsn')}>หมายเลขครุภัณฑ์ {getSortIcon('fsn')}</th>
                                <th className='fs-6' onClick={() => handleSort('name')}>รายการ {getSortIcon('name')}</th>
                                <th className='fs-6' onClick={() => handleSort('detail')}>รายละเอียดเพิ่มเติม {getSortIcon('detail')}</th>
                                <th className='fs-6' onClick={() => handleSort('category')}>หมวดหมู่ {getSortIcon('category')}</th>
                                <th className='fs-6' onClick={() => handleSort('owner')}>เจ้าของ {getSortIcon('owner')}</th>
                                <th className='fs-6' onClick={() => handleSort('status')}>สถานะ {getSortIcon('status')}</th>
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
                                        <td>{item.category ? item.category.name : '-'}</td>
                                        <td>{item.owner ? item.owner.name : '-'}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <button className="btn btn-success btn-sm" onClick={() => handleNewClick(item)}>
                                                ยืมพัสดุนี้
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
        </div>
    </>
  )
}

export default CreateNew