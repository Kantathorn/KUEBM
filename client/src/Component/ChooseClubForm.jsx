import React,{ useEffect,useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

function ChooseClubForm(props) {
  const [clubList, setClubList] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  //Check Login status and get user data
  useEffect(() => {
    axios.get('http://localhost:5500/club/list', { withCredentials: true })
        .then((response) => {
            setClubList(response.data);  // Update this line to set the organizations correctly
        })
        .catch((error) => {
            console.log('Error to Query Organization:', error);
        });
  }, []);
  
  const [state,setState] = useState({
    user: props.userData._id,
    club: '',
    register_pass: ''
  })

  const { club,register_pass } = state
  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const formErrors = {};
    if (!club.trim()) {
      formErrors.organization = "โปรดเลือกชมรมของคุณ";
    }
    if (!register_pass.trim()) {
      formErrors.register_pass = "โปรดใส่รหัสที่ได้รับจากผู้ดูแลองค์กร"
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }

  const handleClubChange = (selectedOption) => {
    setSelectedClub(selectedOption);
    setState({
      ...state,
      club: selectedOption ? selectedOption.value : '',
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
        console.log("User: "+state.user)
        console.log("Club id: "+state.club)
        console.log("Passcode: "+state.register_pass)
    }
  }

  return (
    <div className='row-md-6 mb-2 mt-3'>
      <form onSubmit={handleSubmit}>
        <label className='input-group fs-6'>ชมรมกิจกรรมนิสิต</label>
        <div className='input-group mb-1'>
          <select
            className='form-select form-select-lg bg-light fs-6'
            aria-label='Default select example'
            value={club}
            onChange={inputValue('club')}
          >
            <option value='' disabled>
              เลือกชมรม
            </option>
            {clubList.map((clubList) => (
              <option key={clubList._id} value={clubList._id}>
                {clubList.name}
              </option>
            ))}
          </select>
        </div>
        {errors.register_pass && (<p className="error-alert mb-1">{errors.register_pass}</p>)}
        <label className='input-group fs-6'>รหัสเข้าชมรม</label>
        <div className='input-group mb-1'>
          <input
            type='text'
            className='form-control form-control-lg bg-light fs-6'
            placeholder='กรุณาระบุชื่อองค์กรแบบเต็ม เช่น ชมรมxxxx'
            value={register_pass}
            onChange={inputValue('register_pass')}
          />
        </div>
        {errors.register_pass && (<p className="error-alert mb-1">{errors.register_pass}</p>)}
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

export default ChooseClubForm