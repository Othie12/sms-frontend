import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./components/dashboard/Dashboard";
import Students from "./components/class/Students";
import Requirements from "./components/class/Requirements";
import Marksheet from "./components/class/Marksheet";

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/marksheet" element={<Sidebar />} />
      <Route path="/academia" element={<Sidebar />} />
      <Route path="/register" element={<Sidebar />} />

      <Route path="/class/students/:classId" element={<Students />} />
      <Route path="/class/requirements/:classId" element={<Requirements />} />
      <Route path="/class/marksheet/:classId" element={<Marksheet />} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
