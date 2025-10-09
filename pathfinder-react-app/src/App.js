import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppleLanding from './pages/AppleLanding';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import StudentDashboard from './pages/student/StudentDashboard';
import Academics from './pages/student/Academics';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import ParentDashboard from './pages/parent/ParentDashboard';
import AskMe from './pages/AskMe';
import Rewards from './pages/Rewards';
import PaymentForm from './pages/PaymentForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppleLanding />} />
        <Route path="/landing" element={<AppleLanding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/student/academics" element={<Academics />} />
        <Route path="/student/soft-skills" element={<StudentDashboard />} />
        <Route path="/student/extracurricular" element={<StudentDashboard />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
        <Route path="/askme" element={<AskMe />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/inbox" element={<StudentDashboard />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/finances" element={<PaymentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
