import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardContent from "./layout/content/DashboardContent";
import SideNav from "./layout/SideNav/SideNav";
import Header from "./layout/header/adminHeader";
import Dashboard from "./layout/content/Dashboard/Dashboard";
import EmployeeList from "./layout/content/Employee/Employee";
import ManagerList from "./layout/content/Manager/Manager";
import RequestList from "./layout/content/Resquest/Request";
import "./mainAdmin.scss";

const AdminPage = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={`layout ${collapsed ? "collapsed" : ""}`}>
            <SideNav />
            <Header />
            <div className="main-content">
                <DashboardContent>
                    <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="employee-account" element={<EmployeeList />} />
                        <Route path="manager-account" element={<ManagerList />} />
                        <Route path="request-list" element={<RequestList />} />
                    </Routes>
                </DashboardContent>
            </div>
        </div>
    );
};

export default AdminPage;
