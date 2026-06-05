import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { ProtectedRoute } from  './pages/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes: এগুলো লগইন ছাড়াও দেখা যাবে */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes: এগুলো দেখতে অবশ্যই লগইন করা টোকেন লাগবে */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* কেউ ভুলভাল লিংকে গেলে বা শুধু '/' এ আসলে অটোমেটিক ড্যাশবোর্ডে পাঠিয়ে দেবে */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;