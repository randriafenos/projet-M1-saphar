import React from 'react';
import Dashboard from './Dashboard/Dashboard';

const DashboardContent = ({ children }) => {
  return (
    <div className="dashboard-content">
      {children}
    </div>
  );
};

export default DashboardContent;
