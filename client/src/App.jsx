import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Page/Authenticate/Login';
import Register from './Page/Authenticate/Register';
import ForgotPassword from './Page/Authenticate/ForgotPassword';
import User from './Page/User/User';
import IsLogin from './Component/IsLogin';
import CreateClub from './Page/User/CreateClub';
import ClubManager from './Page/ClubManager/ClubManager';
import CreateNew from './Page/User/CreateNewRequest';
import AddNewEquipment from './Page/Equipment/AddNewEquipment';
import Equipment from './Page/Equipment/EquipmentList';
import Club from './Page/ClubManager/ClubProfile';
import ManageMember from './Page/ClubManager/ManageMember';
import Tracking from './Page/User/TrackingRequest';
import RequestDetail from './Page/Request/RequestDetail';
import Request from './Page/Request/RequestList';
import RequestManage from './Page/Request/RequestManage';
import EquipmentDetail from './Page/Equipment/EquipmentDetail';
import EquipmentManager from './Page/EquipmentManager/EquipmentManager';
import ChooseClub from './Page/User/ChooseClub';
import JoinRequest from './Page/ClubManager/JoinRequest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<IsLogin/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/forgot_password' element={<ForgotPassword/>} />
        <Route exact path='/user' element={<User/>} />
        <Route path='/user/choose_club' element={<ChooseClub/> } />
        <Route path='/create_club' element={<CreateClub/>} />
        <Route path='/club_manager' element={<ClubManager/>} />
        <Route path='/request/new' element={<CreateNew/>} />
        <Route path='/request/tracking' element={<Tracking/>} />
        <Route path='/equipment/' element={<Equipment/>} />
        <Route path='/equipment/new' element={<AddNewEquipment/>} />
        <Route path='/equipment/:id' element={<EquipmentDetail/>} />
        <Route path='/club/management' element={<Club/>}/>
        <Route path='/club/management/member' element={<ManageMember/>}/>
        <Route path="/request/:id" element={<RequestDetail/>} />
        <Route path="/request/manage/:id" element={<RequestManage/>} />
        <Route path="/request" element={<Request/>} />
        <Route path='/club/management/member/join_request/:id' element={<JoinRequest/> } />
        <Route path='/equipment_manager' element={<EquipmentManager/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
