import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./components/dashboard/Dashboard";
import Students from "./components/class/Students";
import Requirements from "./components/class/Requirements";
import ClassMarksheet from "./components/class/Marksheet";
import Login from "./components/Login";
import Aggregation from "./components/academia/Aggregation";
import Comments from "./components/academia/Comments";
import Attendance from "./components/academia/Attendance";
import Calendar from "./components/academia/Calendar";
import RegisterStudent from "./components/register/Student";
import RegisterParent from "./components/register/Parent";
import RegisterRequirement from "./components/register/Requirement";
import RegisterStaff from "./components/register/Staff";
import RegisterSubject from "./components/register/Subject";
import Marksheet from "./components/marksheet/marksheet";
import StudentProfile from "./components/student/Profile";
import UserProfile from "./components/user/Profile";
import ClassSettings from "./components/class/Settings";
import Reciept from "./components/Reciept";
import ScanQr from "./components/Scan-Qr";

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      
      <Route path="/marksheet/:classId/:type/:classId?" element={<Marksheet />} />

      <Route path="/student/:id" element={<StudentProfile />} />
      <Route path="/reciept/:id" element={<Reciept />} />
      <Route path="/scan-qr" element={<ScanQr />} />
      <Route path="/user/:id" element={<UserProfile />} />

      <Route path="/academia" element={<Sidebar />} />
      <Route path="/academia/calendar" element={<Calendar />} />
      <Route path="/academia/aggregation/:classId" element={<Aggregation />} />
      <Route path="/academia/comments/:classId" element={<Comments />} />
      <Route path="/academia/attendance/:classId" element={<Attendance />} />

      <Route path="/register" element={<Sidebar />} />
      <Route path="/register/student" element={<RegisterStudent />} />
      <Route path="/register/staff" element={<RegisterStaff />} />
      <Route path="/register/staff" element={<RegisterStaff />} />
      <Route path="/register/subject" element={<RegisterSubject />} />

      <Route path="/class" element={<Dashboard />} />
      <Route path="/class/settings/:classId" element={<ClassSettings />} />
      <Route path="/class/students/:classId" element={<Students />} />
      <Route path="/class/requirements/:classId" element={<Requirements />} />
      <Route path="/class/marksheet/:classId" element={<ClassMarksheet />} />

    </Routes>
   </BrowserRouter>
  );
}

export default App;
