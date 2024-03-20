import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Page/Login';
import Register from './Page/Register';
import User from './Page/User/User';
import IsLogin from './Component/IsLogin';
import CreateClub from './Page/User/CreateClub';
import ClubManager from './Page/ClubManager/ClubManager';
import CreateNew from './Page/Request/CreateNew';
import AddNewEquipment from './Page/Equipment/AddNewEquipment';
import Equipment from './Page/Equipment/Equipment';
import Club from './Page/ClubManager/Club';

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
        <Route path='/equipment/' element={<Equipment/>} />
        <Route path='/equipment/new' element={<AddNewEquipment/>} />
        <Route path='/club/management' element={<Club/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
