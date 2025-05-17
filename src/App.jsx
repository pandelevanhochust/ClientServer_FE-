import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Regiser from "./components/auth/Regiser";
import PrivateRoutes from "./routes/PrivateRoutes";
import RoleBaseRoutes from "./routes/RoleBaseRoutes";
import AdminDashboard from "./pages/AdminDashboard";
import UserList from "./components/admin/users/UserList";
import AddUser from "./components/admin/users/AddUser";
import UserDetail from "./components/admin/users/UserDetail";
import StudentList from "./components/admin/students/StudentList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Regiser />} />

        {/* Admin */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes allowedRoles={["Admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* Users */}
          <Route
            path="/admin-dashboard/users"
            element={<UserList onClose={() => window.history.back()} />}
          />
          <Route
            path="/admin-dashboard/users/add-user"
            element={<AddUser onClose={() => window.history.back()} />}
          />
          <Route
            path="/admin-dashboard/users/:userId"
            element={<UserDetail onClose={() => window.history.back()} />}
          />

          {/* Students */}
          <Route
            path="/admin-dashboard/students"
            element={<StudentList onClose={() => window.history.back()} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
