import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Page/Login';
import Register from './Page/Register';
import User from './Page/User/User';
import IsLogin from './Component/IsLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<IsLogin/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route exact path='/user' element={<User/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
