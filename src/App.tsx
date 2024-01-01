import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./components/dashboard/Dashboard";
import Students from "./components/class/Students";
import Requirements from "./components/class/Requirements";
import Marksheet from "./components/class/Marksheet";
import Login from "./components/Login";
import Aggregation from "./components/academia/Aggregation";
import Comments from "./components/academia/Comments";

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/marksheet" element={<Sidebar />} />

      <Route path="/academia" element={<Sidebar />} />
      <Route path="/academia/aggregation/:classId" element={<Aggregation />} />
      <Route path="/academia/comments/:classId" element={<Comments />} />

      <Route path="/register" element={<Sidebar />} />

      <Route path="/class" element={<Dashboard />} />
      <Route path="/class/students/:classId" element={<Students />} />
      <Route path="/class/requirements/:classId" element={<Requirements />} />
      <Route path="/class/marksheet/:classId" element={<Marksheet />} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
