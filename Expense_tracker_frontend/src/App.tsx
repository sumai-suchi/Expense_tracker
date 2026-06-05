import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeLayouts from './layouts/HomeLayouts';
import AuthLayout from './layouts/AuthLayout';
import Register from './components/auth/Register';
import Login from './components/auth/Login';




function App() {
  return (
    <Router>
     <Routes>
        <Route path="/" element={<HomeLayouts />} />
         <Route path="/auth" element={<AuthLayout />}>
      <Route path="register" element={<Register></Register>} />
        <Route path="login" element={<Login></Login>} />
    </Route>

      </Routes>
    
         
         
  
    </Router>
  );
}

export default App;