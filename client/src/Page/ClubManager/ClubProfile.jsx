import React,{ useState,useEffect} from 'react'
import axios from 'axios';
import Navbar from '../../Component/Navbar'
import Swal from 'sweetalert2';

function Club() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5500/user/info', { withCredentials: true })
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            window.location.href = '/login';
        });
  }, []);

  return (
      <>
        <Navbar/>
      </>
  );
}

export default Club