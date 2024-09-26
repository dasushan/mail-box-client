import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import TextEditor from './components/Editor/TextEditor';
import PageContainer from './components/RichTextEditor/PageContainer';
import RichTextEditor from './components/RichTextEditor/RichTextEditor';

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path='/' element={<Navigate to='/signup'/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path='/signin' element={<Login />}/>
        <Route path='/welcome' element={<Welcome />}>
          <Route path='editor' element={<TextEditor/>}/>
          <Route path='email' element={<RichTextEditor />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
