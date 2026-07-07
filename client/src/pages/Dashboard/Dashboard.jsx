import { useEffect, useState } from "react";
import API from "../../api/axios";
import "./Dashboard.css";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

import {
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiActivity,
  FiRefreshCw,
  FiCalendar,
  FiBarChart2,
  FiTrendingUp,
  FiPlus,
  FiEye,
} from "react-icons/fi";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function Dashboard() {

  const [stats, setStats] = useState({});
  const [recentCustomers, setRecentCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {

    loadDashboard();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    },1000);

    return ()=>clearInterval(timer);

  },[]);

  const loadDashboard = async()=>{

    try{

      setLoading(true);
      setError("");

      const res = await API.get("/api/dashboard");

      const data = res.data?.data || {};

      setStats(data.stats || {});
      setRecentCustomers(data.recentCustomers || []);

    }
    catch(err){

      console.log(err);
      setError("Unable to load dashboard");

    }
    finally{

      setLoading(false);

    }

  };

  const pieData = {

    labels:[
      "Active",
      "Pending",
      "Resolved",
      "Closed"
    ],

    datasets:[

      {

        data:[

          stats.activeCustomers || 0,
          stats.pendingCustomers || 0,
          stats.resolvedCustomers || 0,
          stats.closedCustomers || 0

        ],

        backgroundColor:[
          "#22c55e",
          "#f59e0b",
          "#3b82f6",
          "#ef4444"
        ],

        borderWidth:0

      }

    ]

  };

  const barData={

    labels:[
      "Low",
      "Medium",
      "High"
    ],

    datasets:[

      {

        data:[

          stats.lowPriority || 0,
          stats.mediumPriority || 0,
          stats.highPriority || 0

        ],

        backgroundColor:[
          "#22c55e",
          "#f59e0b",
          "#ef4444"
        ],

        borderRadius:8

      }

    ]

  };

  const cards=[

    {
      title:"Customers",
      value:stats.totalCustomers || 0,
      icon:<FiUsers/>,
      color:"#2563eb"
    },

    {
      title:"Active",
      value:stats.activeCustomers || 0,
      icon:<FiCheckCircle/>,
      color:"#22c55e"
    },

    {
      title:"Pending",
      value:stats.pendingCustomers || 0,
      icon:<FiClock/>,
      color:"#f59e0b"
    },

    {
      title:"Resolved",
      value:stats.resolvedCustomers || 0,
      icon:<FiActivity/>,
      color:"#06b6d4"
    }

  ];

  if(loading){

    return(

      <div className="loading-dashboard">

        <div className="loader"></div>

        <h2>Loading Dashboard...</h2>

      </div>

    );

  }

  if(error){

    return(

      <div className="loading-dashboard">

        <h2>{error}</h2>

        <button
          className="refresh-btn"
          onClick={loadDashboard}
        >
          Retry
        </button>

      </div>

    );

  }

  return(

    <div className="dashboard">

      <div className="dashboard-header">

        <div>

          <h1>Customer Care Dashboard</h1>

          <p>
            Customer service overview and analytics
          </p>

        </div>

        <div className="header-actions">

          <div className="date-box">

            <FiCalendar/>

            {currentTime.toLocaleDateString()}

          </div>

          <button
            className="refresh-btn"
            onClick={loadDashboard}
          >

            <FiRefreshCw/>

            Refresh

          </button>

        </div>

      </div>

      <div className="stats-grid">

        {cards.map((card,index)=>(

          <div
            className="stat-card"
            key={index}
          >

            <div
              className="icon-box"
              style={{background:card.color}}
            >

              {card.icon}

            </div>

            <div>

              <h2>{card.value}</h2>

              <p>{card.title}</p>

            </div>

          </div>

        ))}

      </div>
            {/* ================= ANALYTICS ================= */}

      <div className="charts-grid">

        {/* Customer Status */}

        <div className="chart-card">

          <div className="card-header">

            <h3>

              <FiBarChart2 />

              Customer Status

            </h3>

          </div>

          <div className="chart-wrapper">

            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: "#cbd5e1",
                      padding: 15,
                    },
                  },
                },
              }}
            />

          </div>

        </div>



        {/* Priority Distribution */}

        <div className="chart-card">

          <div className="card-header">

            <h3>

              <FiTrendingUp />

              Priority Distribution

            </h3>

          </div>

          <div className="chart-wrapper">

            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      color: "#cbd5e1",
                    },
                    grid: {
                      display: false,
                    },
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: "#cbd5e1",
                    },
                    grid: {
                      color: "#334155",
                    },
                  },
                },
              }}
            />

          </div>

        </div>

      </div>



      {/* ================= BOTTOM ================= */}

      <div className="bottom-grid">

        {/* Recent Customers */}

        <div className="recent-card">

          <div className="card-header">

            <h3>

              <FiUsers />

              Recent Customers

            </h3>

            <span>

              {recentCustomers.length} Records

            </span>

          </div>

          {

            recentCustomers.length===0 ?

            (

              <div className="empty-state">

                <h3>No Customers Found</h3>

                <p>
                  Add customers to see recent activity.
                </p>

              </div>

            )

            :

            (

              <table className="customer-table">

                <thead>

                  <tr>

                    <th>Name</th>

                    <th>Company</th>

                    <th>Email</th>

                  </tr>

                </thead>

                <tbody>

                  {

                    recentCustomers.map((customer)=>(

                      <tr key={customer._id}>

                        <td>

                          <div className="customer-name">

                            <div className="avatar">

                              {
                                customer.fullName
                                ?
                                customer.fullName.charAt(0).toUpperCase()
                                :
                                "U"
                              }

                            </div>

                            <span>

                              {customer.fullName}

                            </span>

                          </div>

                        </td>

                        <td>

                          {customer.company || "-"}

                        </td>

                        <td>

                          {customer.email || "-"}

                        </td>

                      </tr>

                    ))

                  }

                </tbody>

              </table>

            )

          }

        </div>



        {/* Quick Actions */}

        <div className="quick-card">

          <h3>Quick Actions</h3>

          <button>

            <FiPlus />

            Add Customer

          </button>

          <button>

            <FiEye />

            View Customers

          </button>

          <button onClick={loadDashboard}>

            <FiRefreshCw />

            Refresh Dashboard

          </button>

          <div className="quick-summary">

            <h4>Dashboard Summary</h4>

            <div className="summary-row">

              <span>Total Customers</span>

              <strong>{stats.totalCustomers || 0}</strong>

            </div>

            <div className="summary-row">

              <span>Pending</span>

              <strong>{stats.pendingCustomers || 0}</strong>

            </div>

            <div className="summary-row">

              <span>Resolved</span>

              <strong>{stats.resolvedCustomers || 0}</strong>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;