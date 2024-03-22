import React,{ useEffect,useState } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios'
import Navbar from '../../Component/Navbar'

function Tracking() {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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
    if (user) {
        axios.post('http://localhost:5500/request/user/list', { user: user._id }, { withCredentials: true })
            .then((response) => {
                setRequests(response.data);
            })
            .catch((error) => {
                console.error('Error fetching equipment data:', error);
            });
    }
  }, [user]);


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDetailClick = (request) => {
      setSelectedRequest(request);
  };
  
  const handleDeleteClick = (id) => {
    Swal.fire({
      title: 'โปรดระบุเหตุผลในการยกเลิก' + '\n' + "คำร้องหมายเลข " + id.request_number,
      html: `
        <label for="note" class="input-group fs-6">เหตุผลในการยกเลิก</label>
        <div className="input-group mb-1">
          <input id="note" class="swal2-input" placeholder="เช่น ขอเปลี่ยนพัสดุ">
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
          note: document.getElementById('note').value,
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { note } = result.value;
        axios.post("http://localhost:5500/request/cancel",{
          request_id : id._id,
          note : note
        }, { withCredentials: true }).then(response => {
          Swal.fire({
            title: "ยกเลิกคำร้องสำเร็จ",
            icon: "success"
          }).then(function() {
              window.location.href = '/request/tracking'
          })
        })
      }
    })
  };

  const handleReloadClick = () => {
    window.location.reload()
  }

  useEffect(() => {
    if (selectedRequest) {
        window.location.href = `/request/${selectedRequest._id}`
    }
    setSelectedRequest('')
  },[selectedRequest])

  // Handle sorting of request records
  const handleSort = (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
          direction = 'desc';
      }
      setSortConfig({ key, direction });
  };

// Sort the request records based on the selected sorting key and direction
const sortedRequests = [...requests].sort((a, b) => {
  if (sortConfig.key === 'item_name') {
    const valueA = (a.requester ? a.item.name : '').toLowerCase();
    const valueB = (b.category ? b.item.name : '').toLowerCase();
    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    if (valueA < valueB) return -direction;
    if (valueA > valueB) return direction;
    return 0;  
  }
  else {
    const valueA = (a[sortConfig.key] || '').toLowerCase();
    const valueB = (b[sortConfig.key] || '').toLowerCase();
    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    if (valueA < valueB) return -direction;
    if (valueA > valueB) return direction;
    return 0;
  }
});

// Render sorting icon based on the current sorting configuration
const getSortIcon = (key) => {
    if (sortConfig.key === key) {
        return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return '';
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return new Date(dateString).toLocaleString('th-TH', options);
}

// Filter request records based on the search term
const filteredRequests = sortedRequests.filter((request) => {
    return (
        request.request_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (request.item && request.item.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatDate(request.use_date).toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatDate(request.collected_date).toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatDate(request.returned_date).toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.note.toLowerCase().includes(searchTerm.toLowerCase())
    );
});

  return (
    <>
        <Navbar/>
        <div className='equipment-table ms-3 mt-3 me-3 mb-3'>
          <h1 className='d-flex justify-content-center' style={{color: "#264653"}}>
            Your Request
          </h1>
          <p className='d-flex justify-content-center fs-6'>รายการคำขอยืมพัสดุอุปกรณ์</p>
          <div className='d-flex justify-content-end'>
            <input
              className='form-control mb-3'
              style={{ width: 25 + 'rem' }}
              type="text"
              placeholder="ค้นหาด้วย หมายเลขคำร้อง พัสดุที่ยืม สถานะคำร้อง เป็นต้น"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className='btn btn-secondary mb-3 ms-3' onClick={() => handleReloadClick()}>Reload</button>
          </div>
          <div className="table-responsive tb-overflow">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className='fs-6' onClick={() => handleSort('request_number')}>หมายเลข {getSortIcon('request_number')}</th>
                  <th className='fs-6' onClick={() => handleSort('item_name')}>พัสดุที่ยืม {getSortIcon('item_name')}</th>
                  <th className='fs-6' onClick={() => handleSort('description')}>เหตุผล {getSortIcon('description')}</th>
                  <th className='fs-6' onClick={() => handleSort('use_date')}>วันที่ต้องการยืม {getSortIcon('use_date')}</th>
                  <th className='fs-6' onClick={() => handleSort('returned_date')}>วันที่ต้องการคืน {getSortIcon('returned_date')}</th>
                  <th className='fs-6' onClick={() => handleSort('collected_date')}>วันที่รับพัสดุ {getSortIcon('collected_date')}</th>
                  <th className='fs-6' onClick={() => handleSort('status')}>สถานะคำร้อง {getSortIcon('status')}</th>
                  <th className='fs-6' onClick={() => handleSort('note')}>หมายเหตุ {getSortIcon('note')}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item.request_number}</td>
                      <td>{item.item ? item.item.name : '-'}</td>
                      <td>{item.description}</td>
                      <td>{formatDate(item.use_date)}</td>
                      <td>{formatDate(item.returned_date)}</td>
                      <td>{item.collected_date ? formatDate(item.collected_date) : "-"}</td>
                      <td>{item.status}</td>
                      <td>{item.note}</td>
                      <td>
                          <button className='btn btn-secondary btn-sm' onClick={() => handleDetailClick(item)}>
                            รายละเอียด
                          </button>
                          {item.status === 'New' ? 
                            <button className='btn btn-danger btn-sm ms-2' onClick={() => handleDeleteClick(item)}>
                              ยกเลิกคำร้อง
                            </button>
                          : <></>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
    </>
  )
}

export default Tracking