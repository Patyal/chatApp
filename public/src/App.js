import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Chats from './pages/Chats';
import SetAvatar from './pages/SetAvatar';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='setavatar' element={<SetAvatar/>}/>
      <Route path='/' element={<Chats/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
