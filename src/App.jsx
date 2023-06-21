import Index from './pages/Index';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import Parentesco from './pages/apoderados/Parentesco';
import Prueba from './pages/Prueba';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/parentesco" element={<Parentesco/>}/>
        <Route path="/prueba" element={<Prueba/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;