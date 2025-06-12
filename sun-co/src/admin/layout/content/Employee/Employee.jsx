import React, { useEffect, useState } from "react"; 
import "./Employee.scss";

// Colonnes adaptées au schéma User
const columns = [
  { key: "first_name", label: "First Name" },
  { key: "last_name", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "is_active", label: "Active" },
  { key: "created_at", label: "Created At" }
];

const handleRowClick = (rowData) => {
  console.log("Row clicked:", rowData);
};

const handleActionClick = () => {
  console.log("Action button clicked");
};

const EmployeeList = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const datas = await handleGetUsers("user")
      
      setData(datas);
    };
    fetchData()
      
  }, []);

  return (
    <div className="Employee">
      
    </div>
  );
};

export default EmployeeList;
