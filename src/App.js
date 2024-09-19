import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Welcome from './pages/Welcome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/signup'/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path='/signin' element={<Login />}/>
        <Route path='/welcome' element={<Welcome />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
