import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./components/dashboard/Dashboard";
import Students from "./components/class/Students";
import Requirements from "./components/class/Requirements";
import Marksheet from "./components/class/Marksheet";
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

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/marksheet" element={<Sidebar />} />

      <Route path="/academia/calendar" element={<Calendar />} />

      <Route path="/academia" element={<Sidebar />} />
      <Route path="/academia/aggregation/:classId" element={<Aggregation />} />
      <Route path="/academia/comments/:classId" element={<Comments />} />
      <Route path="/academia/attendance/:classId" element={<Attendance />} />

      <Route path="/register" element={<Sidebar />} />
      <Route path="/register/student" element={<RegisterStudent />} />
      <Route path="/register/parent" element={<RegisterParent />} />
      <Route path="/register/requirement" element={<RegisterRequirement />} />
      <Route path="/register/staff" element={<RegisterStaff />} />
      <Route path="/register/staff" element={<RegisterStaff />} />
      <Route path="/register/subject" element={<RegisterSubject />} />

      <Route path="/class" element={<Dashboard />} />
      <Route path="/class/students/:classId" element={<Students />} />
      <Route path="/class/requirements/:classId" element={<Requirements />} />
      <Route path="/class/marksheet/:classId" element={<Marksheet />} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
