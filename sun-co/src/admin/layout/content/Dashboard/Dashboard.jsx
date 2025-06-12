import React from "react";
import Card from "../../../../components/admin/Card/Card";
import Chart from "../../../../components/admin/Chart/Chart";
import "./Dashboard.scss";

const dashboardData = [
    { title: "Nombre d'utilisateur", value: 200 },
    { title: "Nombre d'achat", value: 150 },
    { title: "Nombre de demande", value: 80 }
];

const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun" ,"Jul" , "Aout" , "Sept" , "Oct" , "Nov" , "Dec"],
    datasets: [
      {
        label: "Achats",
        data: [45, 56, 67, 83, 90, 100 , 23, 40, 60, 12, 70, 54],
        fill: false,
        borderColor: "#5DC0DC",
        tension: 0.2, 
        borderWidth: 2
      }
    ]
};

const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Value: ${tooltipItem.raw}`,
        },
      },
    },
    animations: {
      tension: {
        duration: 800, 
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      }
    },
    scales: {
      y: {
        min: 0,
        max: Math.max(...lineData.datasets[0].data) * 1.1,
      },
    },
};

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="card-container">
                {dashboardData.map((item, index) => (
                    <Card key={index} title={item.title} value={item.value} />
                ))}
            </div>
            <div className="chart-container">
                <Chart data={lineData} options={lineOptions} />
            </div>
        </div>
    );
};

export default Dashboard;
