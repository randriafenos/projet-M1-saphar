
import React, { useState, useEffect } from "react";


const columns = [
  { key: "user_id.first_name", label: "Nom d'utilisateur" },
  { key: "item_name", label: "Article demande" },
  { key: "quantity", label: "Nombre" },
  { key: "prix", label: "Prix estimé" },
  { key: "reason", label: "Description" },
  { key: "createdAt", label: "Date du demande" }
];

const handleRowClick = (rowData) => {
  console.log("Row clicked:", rowData);
};

const handleActionClick = () => {
  console.log("Action button clicked");
};

const RequestList = () => {
  const { getAllPurchaseRequest ,purchaseRequests} = useSocket();

  useEffect(() => {
    getAllPurchaseRequest();
  }, [getAllPurchaseRequest]);

  return (
    <div className="Request">
      
    </div>
  );
};

export default RequestList;
