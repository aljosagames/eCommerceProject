import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MasterLayout from "./layouts/admin/MasterLayout";
import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/admin/Profile";
import Home from "./components/frontend/Home";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import axios from "axios";
import ProtectedRoutes from "./ProtectedRoutes";
import Category from "./components/admin/category/Category";
import ViewCategory from "./components/admin/category/ViewCategory";
import EditCategory from "./components/admin/category/EditCategory";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  const isAuth = () =>{
    return localStorage.getItem("auth_token")
  }

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={!isAuth() ? <Login /> : <Navigate to="/" replace/>} />
      <Route path="/register" element={!isAuth() ? <Register /> : <Navigate to="/" replace/>} />

      <Route
        path="/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />
      <Route element={<ProtectedRoutes />}>
        <Route path="/admin" element={<MasterLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add-category" element={<Category />}/>
          <Route path="view-category" element={<ViewCategory />}/>
          <Route path="edit-category/:id" element={<EditCategory/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
