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
    <div>
      <form onSubmit={handleSubmit}>
        <label className='input-group fs-6'>องค์กรกิจกรรมนิสิต</label>
        <div className='input-group mb-1'>
          
        </div>
      </form>
    </div>
  )
}

export default ChooseClubForm