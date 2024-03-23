import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Page/Login';
import Register from './Page/Register';
import User from './Page/User/User';
import IsLogin from './Component/IsLogin';
import CreateClub from './Page/User/CreateClub';
import ClubManager from './Page/ClubManager/ClubManager';
import CreateNew from './Page/User/CreateNew';
import AddNewEquipment from './Page/Equipment/AddNewEquipment';
import Equipment from './Page/Equipment/Equipment';
import Club from './Page/ClubManager/Club';
import ManageMember from './Page/ClubManager/ManageMember';
import Tracking from './Page/User/Tracking';
import RequestDetail from './Page/Request/RequestDetail';
import Request from './Page/Request/Request';
import RequestManage from './Page/Request/RequestManage';
import EquipmentDetail from './Page/Equipment/EquipmentDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<IsLogin/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route exact path='/user' element={<User/>} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
