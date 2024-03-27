import React,{ useEffect,useState } from 'react'
import axios from 'axios';
import Navbar from '../../Component/Navbar'

function Request() {
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
        axios.post('http://localhost:5500/request/list', { club: user.club._id }, { withCredentials: true })
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

  const handleReloadClick = () => {
    window.location.reload()
  }

  useEffect(() => {
    if (selectedRequest) {
      if (selectedRequest.status === 'New' || selectedRequest.status === 'Approve' || selectedRequest.status === 'In-use'){
        window.location.href = `/request/manage/${selectedRequest._id}`
      }
      else {
        window.location.href = `/request/${selectedRequest._id}`
      }
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
  if (sortConfig.key === 'requester') {
    const valueA = (a.requester ? a.requester.username : '').toLowerCase();
    const valueB = (b.category ? b.requester.username : '').toLowerCase();
    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    if (valueA < valueB) return -direction;
    if (valueA > valueB) return direction;
    return 0;
  }
  else if (sortConfig.key === 'requester_club') {
    const valueA = (a.requester ? a.requester_club.name : '').toLowerCase();
    const valueB = (b.category ? b.requester_club.name : '').toLowerCase();
    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    if (valueA < valueB) return -direction;
    if (valueA > valueB) return direction;
    return 0;    
  }
  else if (sortConfig.key === 'item_name') {
    const valueA = (a.requester ? a.item.name : '').toLowerCase();
    const valueB = (b.category ? b.item.name : '').toLowerCase();
    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    if (valueA < valueB) return -direction;
    if (valueA > valueB) return direction;
    return 0;  
  }
  else if (sortConfig.key === 'item_fsn') {
    const valueA = (a.requester ? a.item.fsn : '').toLowerCase();
    const valueB = (b.category ? b.item.fsn : '').toLowerCase();
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
        (request.requester && request.requester.username.toLowerCase().includes(searchTerm.toLocaleLowerCase())) ||
        (request.requester_club && request.requester_club.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) ||
        (request.item && request.item.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) ||
        (request.item && request.item.fsn.toLowerCase().includes(searchTerm.toLocaleLowerCase())) ||
        request.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
});

  return (
    <>
        <Navbar/>
        <div className='equipment-table ms-3 mt-3 me-3 mb-3'>
          <h1 className='d-flex justify-content-center' style={{color: "#264653"}}>
            Manage Request
          </h1>
          <p className='d-flex justify-content-center fs-6'>จัดการคำขอยืมพัสดุอุปกรณ์</p>
          <div className='d-flex justify-content-end'>
            <input
              className='form-control mb-3'
              style={{ width: 25 + 'rem' }}
              type="text"
              placeholder="ค้นหาด้วย หมายเลขคำร้อง สถานะคำร้อง ชื่อผู้ร้อง เป็นต้น"
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
                  <th className='fs-6' onClick={() => handleSort('requester')}>ผู้ขอยืม {getSortIcon('requester')}</th>
                  <th className='fs-6' onClick={() => handleSort('requester_club')}>สังกัด {getSortIcon('requester_club')}</th>
                  <th className='fs-6' onClick={() => handleSort('item_name')}>พัสดุที่ยืม {getSortIcon('item_name')}</th>
                  <th className='fs-6' onClick={() => handleSort('item_fsn')}>หมายเลขครุภัณฑ์ {getSortIcon('item_fsn')}</th>
                  <th className='fs-6' onClick={() => handleSort('description')}>เหตุผล {getSortIcon('description')}</th>
                  <th className='fs-6' onClick={() => handleSort('use_date')}>วันที่ต้องการยืม {getSortIcon('use_date')}</th>
                  <th className='fs-6' onClick={() => handleSort('returned_date')}>วันที่คืน {getSortIcon('returned_date')}</th>
                  <th className='fs-6' onClick={() => handleSort('status')}>สถานะคำร้อง {getSortIcon('status')}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item.request_number}</td>
                      <td>{item.requester ? item.requester.username : '-'}</td>
                      <td>{item.requester_club ? item.requester_club.name : '-' }</td>
                      <td>{item.item ? item.item.name : '-'}</td>
                      <td>{item.item ? item.item.fsn : '-'}</td>
                      <td>{item.description}</td>
                      <td>{formatDate(item.use_date)}</td>
                      <td>{formatDate(item.returned_date)}</td>
                      <td>{item.status}</td>
                      <td>
                          {item.status === "Cancel" || item.status === "Returned" ? 
                          <button className='btn btn-secondary btn-sm' style={{width: "7rem"}} onClick={() => handleDetailClick(item)}>
                            รายละเอียด
                          </button>
                          :
                          <button className='btn btn-warning btn-sm' style={{width: "7rem"}} onClick={() => handleDetailClick(item)}>
                            จัดการคำร้อง
                          </button>
                        }
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

export default Request